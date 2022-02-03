import { BarChartWithDH } from "../BarChartWithDH";

export function addRating(this: BarChartWithDH) {

    const that = this;

    const form = this.findForeignObject(true);

    const rateDivs = form.selectAll('.rateDiv')
        .data([1, 2, 3, 4, 5])
        .join('div')
        .attr('class', 'rateDiv')
        .style('flex', ' 1 0 100%');

    rateDivs.append('input')
        .attr('type', 'radio')
        .attr('id', d => `star${d}`)
        .attr('name', 'rating')
        .attr('value', d => `${d} star rating`);

    rateDivs.append('label')
        .attr('for', d => `star${d}`)
        .html(d => '★'.repeat(d));

    this.addReason(form);

    this.addSubmitButton(form)
        .on('click', () => {
            const reasonInput = (form.select('#reason-field') as any).node()!.value;
            const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
            if (reasonInput) {
                // save the form input to array
                that.addNewDataHunch(
                    (form.select('input[name="rating"]:checked').node() as any).value,
                    "annotation",
                    reasonInput,
                    confidenceLevel
                );
                //hide the form
                that.hideInChartForeignObject();
            } else {
                alert('Please enter a reason for the data hunch!');
            }
        });

    that.addCancelButton(form);

    form.selectChildren('input').style('margin', '5px');
    form.selectChildren('textarea').style('margin', '5px');
}