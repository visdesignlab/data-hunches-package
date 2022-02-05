import { axisBottom } from "d3-axis";
import { ScaleBand, scaleBand } from "d3-scale";
import { BarChartWithDH } from "../BarChartWithDH";
import { BrightOrange, DarkBlue, margin, TransitionDuration } from "../Constants";

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
        .attr('step', '0.01')
        .attr('id', 'inclusion-value')
        .style('width', '-webkit-fill-available');

    valueField.attr('placeholder', `Inclusion Value (optional)`);

    form.append('input')
        .attr('type', 'button')
        .attr('value', 'Preview')
        .on('click', (e) => {
            //if the input is already existing, the preview should remove that with animation
            const labelInput = textfield.node()!.value;
            const secondLabelInput = valueField.node()!.value;
            if (labelInput) {
                let newBandScale: ScaleBand<string>;
                if (originalBandScale.domain().includes(labelInput)) {
                    const newData = that.data.filter(d => d.label !== labelInput);
                    const newLabels = newData.map(d => d.label);

                    newBandScale = that.makeBandScale(newData);

                    // Two transitions. Remove the exclusion bar, then do the transition?
                    //https://bost.ocks.org/mike/transition/#life-cycle
                    //tweens

                    const rectangles = that.canvas.select('#rectangles')
                        .selectAll('rect');

                    rectangles.filter((d: any) => !newLabels.includes(d.label)).attr('class', 'toremove');
                    that.canvas.select('#rectangles').selectAll('.toremove').remove();

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


                } else if (secondLabelInput && !originalBandScale.domain().includes(labelInput)) {
                    const newData = that.data.concat({ label: labelInput, value: parseFloat(secondLabelInput) });
                    const newLabels = newData.map(d => d.label);

                    newBandScale = that.makeBandScale(newData);

                    that.canvas.select('#rectangles')
                        .selectAll('rect')
                        .data(newData)
                        .join(
                            enter => enter.append('rect')
                                .attr('x', d => newBandScale(d.label) || 0)
                                .attr('width', newBandScale.bandwidth())
                                .attr('height', that.height - margin.bottom - originalVertScale(0))
                                .attr('y', originalVertScale(0)).selection()
                        );
                    that.canvas.select('#rectangles')
                        .selectAll('rect')
                        .attr('fill', DarkBlue)
                        .transition()
                        .duration(TransitionDuration)
                        .attr('x', (d: any) => newBandScale(d.label) || 0)
                        .attr('width', newBandScale.bandwidth())
                        .attr('height', (d: any) => that.height - margin.bottom - originalVertScale(d.value))
                        .attr('y', (d: any) => originalVertScale(d.value));

                } else {
                    newBandScale = that.makeBandScale();
                }
                that.canvas.select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(newBandScale) as any);
            }
        });

    form.append('input')
        .attr('type', 'button')
        .attr('value', 'Reset')
        .on('click', () => {
            textfield.node()!.value = '';
            valueField.node()!.value = '';
            //Remember to put in the other text field reset

            that.canvas.select('#rectangles')
                .selectAll('rect')
                .data(that.data)
                .join(
                    enter => enter.append('rect')
                        .attr('x', d => originalBandScale(d.label) || 0)
                        .attr('width', originalBandScale.bandwidth())
                        .attr('height', that.height - margin.bottom - originalVertScale(0))
                        .attr('y', originalVertScale(0)).selection()
                );

            that.canvas.select('#rectangles')
                .selectAll('rect')
                .attr('fill', DarkBlue)
                .transition()
                .duration(TransitionDuration)
                .attr('x', (d: any) => originalBandScale(d.label) || 0)
                .attr('width', originalBandScale.bandwidth())
                .attr('height', (d: any) => that.height - margin.bottom - originalVertScale(d.value))
                .attr('y', (d: any) => originalVertScale(d.value));

            that.canvas.select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(originalBandScale) as any);

        });

    this.addReason(form);

    this.addSubmitButton(form)
        .on('click', () => {
            const reasonInput = (form.select('#reason-field') as any).node()!.value;
            const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
            if (reasonInput) {
                // save the form input to  array
                const labelInput = textfield.node()!.value;
                const secondLabelInput = valueField.node()!.value;

                if (originalBandScale.domain().includes(labelInput)) {

                    that.addNewDataHunch("ignore", "exclusion", reasonInput, confidenceLevel, labelInput);

                    //remove the form
                    that.renderVisualizationWithDH();
                    that.hideInChartForeignObject();

                } else if (secondLabelInput && !originalBandScale.domain().includes(labelInput)) {

                    that.addNewDataHunch(secondLabelInput, "inclusion", reasonInput, confidenceLevel, labelInput);

                    //remove the form
                    that.renderVisualizationWithDH();
                    that.hideInChartForeignObject();

                }



            } else {
                alert('Please enter a reason for the data hunch!');
            }
        });
    that.addCancelButton(form);

    form.selectChildren('input').style('margin', '5px');
    form.selectChildren('textarea').style('margin', '5px');
}