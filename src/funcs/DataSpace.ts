import { axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { BarChartWithDH } from '../BarChartWithDH';
import { TransitionDuration, margin, BrightOrange } from '../Constants';

export function addDataSpace(this: BarChartWithDH) {
    const that = this;

    const verticalScale = this.makeVerticalScale();

    const form = this.findForeignObject(true);

    const textfield = form.append('input')
        .attr('type', 'number')
        .attr('step', '0.01')
        .attr('id', 'input-field')
        .style('width', '-webkit-fill-available');
    textfield.attr('placeholder', `suggest alternative for ${this.currentSelectedLabel}`);

    form.append('input')
        .attr('type', 'button')
        .attr('value', 'Preview')
        .on('click', () => {
            const newData = that.data.map(d => {
                if (d.label === this.currentSelectedLabel && textfield.node()) {
                    return { ...d, value: parseFloat(textfield.node()!.value) };
                } return d;
            });

            const newVertScale = that.makeVerticalScale(newData);
            const oldVerScale = scaleLinear().domain(verticalScale.domain()).range([newVertScale(verticalScale.domain()[0]), newVertScale(verticalScale.domain()[1])]);

            that.canvas.select('#rectangles')
                .selectAll('rect')
                .data(newData)
                .join('rect')
                .transition()
                .duration(TransitionDuration)
                .attr('y', d => newVertScale(d.value))
                .attr('height', d => that.height - margin.bottom - newVertScale(d.value));

            // Matching Ticks Begin
            // domain [0] because it was oposite?
            const filteredTickArray = newVertScale.ticks().filter(d => d <= oldVerScale.domain()[0]);

            //if the domain end is not in the tick array, we add it so it shows up
            if (filteredTickArray.indexOf(oldVerScale.domain()[0]) < 0) filteredTickArray.push(oldVerScale.domain()[0]);

            //Matching Ticks End
            that.canvas
                .select('#vertical-axis')
                .transition()
                .duration(TransitionDuration)
                //Remove tickValues to remove matching ticks
                .call((axisLeft(oldVerScale).tickValues(filteredTickArray) as any));

            const newScale = that.canvas
                .select('#axis-mask')
                .call(axisLeft(verticalScale) as any)
                .transition()
                .duration(TransitionDuration)
                .call((axisLeft(newVertScale) as any));

            newScale.selectAll('path')
                .attr('stroke', BrightOrange);
            newScale.selectAll('g').selectAll('line').attr('stroke', BrightOrange);
            newScale.selectAll('g').selectAll('text').attr('fill', BrightOrange);
        });

    form.append('input')
        .attr('type', 'button')
        .attr('value', 'Reset')
        .on('click', () => {
            // somehow .attr('value','') doesn't work.
            if (document.getElementById('input-field') !== null) (document.getElementById('input-field')! as any).value = '';

            textfield.attr('placeholder', `suggest alternative for ${that.currentSelectedLabel}`);

            that.canvas
                .select('#axis-mask').selectAll('*').attr('opacity', 1).transition().duration(TransitionDuration).attr('opacity', 0.0001).remove();

            that.canvas
                .select('#vertical-axis')
                .transition()
                .duration(TransitionDuration)
                .call((axisLeft(verticalScale) as any));

            that.canvas
                .select('#rectangles')
                .selectAll('rect')
                .data(that.data)
                .join('rect')
                .transition()
                .duration(TransitionDuration)
                .attr('y', d => verticalScale(d.value))
                .attr('height', d => that.height - margin.bottom - verticalScale(d.value));
        });

    this.addReason(form);

    this.addSubmitButton(form)
        .on('click', () => {
            // save the form input to array
            const reasonInput = (form.select('#reason-field') as any).node()!.value;
            const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
            if (reasonInput) {

                that.canvas
                    .select('#axis-mask').selectAll('*').attr('opacity', 1).transition().duration(TransitionDuration).attr('opacity', 0.0001).remove();

                that.canvas
                    .select('#vertical-axis')
                    .transition()
                    .duration(TransitionDuration)
                    .call((axisLeft(verticalScale) as any));

                that.addNewDataHunch(textfield.node()!.value, 'data space', reasonInput, confidenceLevel);

                that.renderVisualizationWithDH();

                //remove the form
                that.canvas.select('#vertical-axis').call((axisLeft(verticalScale) as any));
                that.hideInChartForeignObject();
            } else {
                alert('Please enter a reason for the data hunch!');
            }
        });

    that.addCancelButton(form);

    form.selectChildren('input').style('margin', '5px');
    form.selectChildren('textarea').style('margin', '5px');
}