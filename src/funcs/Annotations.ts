import { BarChartWithDH } from "../BarChartWithDH";

export function addInput(this: BarChartWithDH) {
    const that = this;

    const form = this.findForeignObject(true);

    const textfield = form.append('input').attr('type', 'text').attr('id', 'input').style('width', '-webkit-fill-available');;


    textfield.attr('placeholder', `Annotation on ${this.currentSelectedLabel ? this.currentSelectedLabel : 'the chart'}`);


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
