import { pointer } from "d3-selection";
import { BarChartWithDH } from "../BarChartWithDH";
import { LightGray, margin } from "../Constants";

export function manipulation(this: BarChartWithDH) {
    const that = this;

    const selectedRect = this.canvas.select('#rectangles').selectAll('rect').filter((d: any) => d.label === that.currentSelectedLabel);

    const manipulationLayer = this.canvas.select('#manipulation-layer');

    const heightScale = this.makeVerticalScale();

    const form = this.findForeignObject(true);

    // Instead of making it draggable entire SVG, make a greyed out second rectanlge to be clickable.

    let dragging = false;
    let mouseDown = false;
    let isRange = false;
    let startPoint = 0;
    const dhRect = manipulationLayer.append('rect')
        .attr('class', 'manipulation-new')
        .attr('x', selectedRect.attr('x'))
        .attr('width', selectedRect.attr('width'));
    const dhLine = manipulationLayer.append('line')
        .attr('class', 'manipulation-new')
        .attr('x1', selectedRect.attr('x'))
        .attr('x2', parseFloat(selectedRect.attr('x')) + parseFloat(selectedRect.attr('width')));

    const manipulationRect = manipulationLayer.append('rect');

    manipulationRect.attr('x', parseFloat(selectedRect.attr('x')) - 50)
        .attr('y', margin.top)
        .attr('height', that.height - margin.top - margin.bottom)
        .attr('width', parseFloat(selectedRect.attr('width')) + 100)
        .attr('fill', LightGray)
        .attr('opacity', 0.5)
        .on('mousedown', (e) => {
            dragging = false;
            mouseDown = true;
            dhRect
                .attr('fill', 'darkred')
                .attr('y', pointer(e)[1])
                .attr('height', 0);
            startPoint = pointer(e)[1];
            dhLine.attr('y1', -20)
                .attr('y2', -20);
        })
        .on('mousemove', (e, d) => {
            dragging = true;
            if (dragging && mouseDown) {
                if (startPoint > pointer(e)[1]) {
                    dhRect.attr('height', Math.abs(pointer(e)[1] - startPoint));
                    dhRect.attr('y', pointer(e)[1]);
                } else {
                    dhRect.attr('height', Math.abs(pointer(e)[1] - startPoint));
                }
            }
        })
        .on('mouseup', (e, d) => {
            mouseDown = false;
            if (dragging) {
                // not sure what to do here yet.
                isRange = true;
            } else {
                dhLine.attr('y1', pointer(e)[1])
                    .attr('y2', pointer(e)[1])
                    .attr('stroke', 'darkred')
                    .attr('stroke-width', '4px');
                isRange = false;
            }
        });

    this.addReason(form);

    this.addSubmitButton(form)
        .on('click', () => {
            // save the form input to array
            const reasonInput = (form.select('#reason-field') as any).node()!.value;
            const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
            if (reasonInput) {

                //range
                if (isRange) {
                    that.addNewDataHunch([heightScale.invert((parseFloat(dhRect.attr('y') as any) + parseFloat(dhRect.attr('height') as any))).toFixed(2), heightScale.invert(dhRect.attr('y') as any).toFixed(2)].toString(), "range", reasonInput, confidenceLevel);
                }
                // single value
                else {
                    that.addNewDataHunch(heightScale.invert((dhLine.attr('y1') as any)).toFixed(2), "manipulations", reasonInput, confidenceLevel);
                }

                //remove the form
                that.canvas.select('#svg-canvas').on('mousedown', null)
                    .on('mousemove', null)
                    .on('mouseup', null);
                this.renderVisualizationWithDH();
                this.hideInChartForeignObject();

                //clean up manipulation layer
                manipulationLayer.selectAll('*').remove();

            } else {
                alert('Please enter a reason for the data hunch!');
            }
        });

    this.addCancelButton(form);
    form.selectChildren('input').style('margin', '5px');
    form.selectChildren('textarea').style('margin', '5px');
}