import { axisLeft } from 'd3-axis';
import { BarChartWithDH } from '../BarChartWithDH';
import { TransitionDuration, } from '../Constants';
import { previewFunction, resetPreview } from './PreviewFunction';

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
            if (textfield.node()!.value) {
                previewFunction.bind(that)(parseFloat(textfield.node()!.value), that.currentSelectedLabel);
            }
        });

    form.append('input')
        .attr('type', 'button')
        .attr('value', 'Reset')
        .on('click', () => {

            if (document.getElementById('input-field') !== null) (document.getElementById('input-field')! as any).value = '';

            textfield.attr('placeholder', `suggest alternative for ${this.currentSelectedLabel}`);

            resetPreview.bind(that)();
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

                that.restoreRectangles();

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