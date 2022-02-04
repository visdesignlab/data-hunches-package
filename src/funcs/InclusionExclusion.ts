import { axisBottom } from "d3-axis";
import { scaleBand } from "d3-scale";
import { BarChartWithDH } from "../BarChartWithDH";
import { DarkBlue, margin, TransitionDuration } from "../Constants";

export function inclusionExclusion(this: BarChartWithDH) {
    const that = this;

    const form = this.findForeignObject(true);

    const textfield = form.append('input')
        .attr('type', 'text')
        .attr('id', 'input-field')
        .style('width', '-webkit-fill-available');

    const originalBandScale = this.makeBandScale();

    const originalVertScale = this.makeVerticalScale();

    textfield.attr('placeholder', `Label to exclude or new label`);

    const valueField = form.append('input')
        .attr('type', 'number')
        .attr('id', 'inclusion-value')
        .style('width', '-webkit-fill-available');

    valueField.attr('placeholder', `Inclusion Value (optional)`);

    form.append('input')
        .attr('type', 'button')
        .attr('value', 'Preview')
        .on('click', (e) => {
            //if the input is already existing, the preview should remove that with animation
            const labelInput = textfield.node()!.value;
            if (labelInput) {
                if (originalBandScale.domain().includes(labelInput)) {
                    const newData = that.data.filter(d => d.label !== labelInput);
                    const newBandScale = scaleBand().domain(newData.map(d => d.label)).range(originalBandScale.range());

                    that.canvas.select('#rectangles')
                        .selectAll('rect')
                        .data(newData)
                        .join('rect')
                        .transition()
                        .duration(TransitionDuration)
                        .attr('x', d => newBandScale(d.label) || 0)
                        .attr('width', newBandScale.bandwidth())
                        .attr('height', d => that.height - margin.bottom - originalVertScale(d.value))
                        .attr('y', d => originalVertScale(d.value));

                    that.canvas.select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(newBandScale) as any);
                }
            }
        });

    form.append('input')
        .attr('type', 'button')
        .attr('value', 'Reset')
        .on('click', () => {
            textfield.node()!.value = '';

            //Remember to put in the other text field reset

            that.canvas.select('#rectangles')
                .selectAll('rect')
                .data(that.data)
                .join('rect')
                .attr('fill', DarkBlue)
                .transition()
                .duration(TransitionDuration)
                .attr('x', d => originalBandScale(d.label) || 0)
                .attr('width', originalBandScale.bandwidth())
                .attr('height', d => that.height - margin.bottom - originalVertScale(d.value))
                .attr('y', d => originalVertScale(d.value));

            that.canvas.select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(originalBandScale) as any);

        });

    this.addReason(form);

    this.addSubmitButton(form)
        .on('click', () => {
            const reasonInput = (form.select('#reason-field') as any).node()!.value;
            const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
            if (reasonInput) {
                // save the form input to  array
                that.addNewDataHunch(textfield.node()!.value, "annotation", reasonInput, confidenceLevel);
                //remove the form
                that.hideInChartForeignObject();
            } else {
                alert('Please enter a reason for the data hunch!');
            }
        });
    that.addCancelButton(form);

    form.selectChildren('input').style('margin', '5px');
    form.selectChildren('textarea').style('margin', '5px');
}