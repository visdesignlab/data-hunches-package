import { BarChartWithDH } from "../BarChartWithDH";
import { DarkBlue } from "../Constants";
import { previewFunction, resetPreview } from "./PreviewFunction";

export function inclusionExclusion(this: BarChartWithDH) {
    const that = this;

    const form = this.findForeignObject(true);

    const textfield = form.append('input')
        .attr('type', 'text')
        .attr('id', 'input-field')
        .style('width', '-webkit-fill-available');

    const originalBandScale = this.makeBandScale();


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
        .on('click', () => {
            //if the input is already existing, the preview should remove that with animation
            const labelInput = textfield.node()!.value;
            const secondLabelInput = valueField.node()!.value;
            if (labelInput) {
                if (originalBandScale.domain().includes(labelInput)) {

                    previewFunction.bind(that)(undefined, labelInput);


                } else if (secondLabelInput && !originalBandScale.domain().includes(labelInput)) {

                    previewFunction.bind(that)(parseFloat(secondLabelInput), labelInput);
                }

            }
        });

    form.append('input')
        .attr('type', 'button')
        .attr('value', 'Reset')
        .on('click', () => {
            textfield.node()!.value = '';
            valueField.node()!.value = '';

            resetPreview.bind(that)();
            that.canvas.select('#rectangles')
                .selectAll('rect')
                .attr('fill', DarkBlue);

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
                    that.restoreRectangles();
                    that.hideInChartForeignObject();

                } else if (secondLabelInput && !originalBandScale.domain().includes(labelInput)) {

                    that.addNewDataHunch(secondLabelInput, "inclusion", reasonInput, confidenceLevel, labelInput);

                    //remove the form
                    that.renderVisualizationWithDH();
                    that.restoreRectangles();
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