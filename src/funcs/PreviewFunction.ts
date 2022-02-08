import { axisBottom, axisLeft } from "d3-axis";
import { ScaleBand, ScaleLinear, scaleLinear } from "d3-scale";
import { BarChartWithDH } from "../BarChartWithDH";
import { TransitionDuration, margin, BrightOrange } from "../Constants";
import { BarChartDataPoint } from "../types";


export function previewFunction(this: BarChartWithDH, input: number | undefined, label: string) {
    const verticalScale = this.makeVerticalScale();
    const bandScale = this.makeBandScale();
    const that = this;
    let tempnewData = this.data.map(d => {
        if (d.label === label && input === undefined) {
            return null;
        }
        else if (d.label === label && input) {
            return { ...d, value: input };
        } return d;
    });

    const newData = (tempnewData.filter(d => d) as BarChartDataPoint[]);

    if (!bandScale.domain().includes(label) && input) {
        newData.push({ label: label, value: input });
    }

    console.log(newData);

    const newBandScale = that.makeBandScale(newData);

    const newVertScale = this.makeVerticalScale(newData);
    const oldVerScale = scaleLinear().domain(verticalScale.domain()).range([newVertScale(verticalScale.domain()[0]), newVertScale(verticalScale.domain()[1])]);



    if (input === undefined) {
        this.canvas.select('#rectangles').selectAll('rect').filter((d: any) => d.label === label).attr('class', 'toremove');
        that.canvas.select('#rectangles').selectAll('.toremove').remove();
    }


    const rectangles = this.canvas.select('#rectangles')
        .selectAll('rect')
        .data(newData)
        .join(
            enter => enter.append('rect')
                .attr('fill', BrightOrange)
                .attr('x', d => newBandScale(d.label) || 0)
                .attr('width', newBandScale.bandwidth())
                .attr('height', that.height - margin.bottom - newVertScale(0))
                .attr('y', newVertScale(0)).selection(),

        );

    rectangles.transition()
        .attr('x', d => newBandScale(d.label) || 0)
        .attr('width', newBandScale.bandwidth())
        .duration(TransitionDuration)
        .attr('y', d => newVertScale(d.value))
        .attr('height', d => this.height - margin.bottom - newVertScale(d.value));

    moveDH.bind(this)(newBandScale, newVertScale);

    // rectangles.filter((d: any) => d.label === label).attr('fill', BrightOrange);

    // Matching Ticks Begin
    // domain [0] because it was oposite?
    const filteredTickArray = newVertScale.ticks().filter(d => d <= oldVerScale.domain()[0]);

    //if the domain end is not in the tick array, we add it so it shows up
    if (filteredTickArray.indexOf(oldVerScale.domain()[0]) < 0) filteredTickArray.push(oldVerScale.domain()[0]);

    //Matching Ticks End
    this.canvas
        .select('#vertical-axis')
        .transition()
        .duration(TransitionDuration)
        //Remove tickValues to remove matching ticks
        .call((axisLeft(oldVerScale).tickValues(filteredTickArray) as any));

    const newScale = this.canvas
        .select('#axis-mask')
        .call(axisLeft(verticalScale) as any)
        .transition()
        .duration(TransitionDuration)
        .call((axisLeft(newVertScale) as any));

    // that.canvas.select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(newBandScale) as any);

    newScale.selectAll('path')
        .attr('stroke', BrightOrange);
    newScale.selectAll('g').selectAll('line').attr('stroke', BrightOrange);
    newScale.selectAll('g').selectAll('text').attr('fill', BrightOrange);

    that.canvas.select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(newBandScale) as any);


}

export function resetPreview(this: BarChartWithDH) {

    const verticalScale = this.makeVerticalScale();
    const bandScale = this.makeBandScale();
    moveDH.bind(this)(bandScale, verticalScale);
    this.canvas
        .select('#axis-mask').selectAll('*').attr('opacity', 1).transition().duration(TransitionDuration).attr('opacity', 0.0001).remove();

    this.canvas
        .select('#vertical-axis')
        .transition()
        .duration(TransitionDuration)
        .call((axisLeft(verticalScale) as any));

    this.canvas
        .select('#rectangles')
        .selectAll('rect')
        .data(this.data)
        .join(enter => enter.append('rect')
            .attr('x', d => bandScale(d.label) || 0)
            .attr('width', bandScale.bandwidth())
            .attr('height', this.height - margin.bottom - verticalScale(0))
            .attr('y', verticalScale(0)).selection());

    this.canvas.select('#rectangles')
        .selectAll('rect')
        .transition()
        .duration(TransitionDuration)
        .attr('x', (d: any) => bandScale(d.label) || 0)
        .attr('width', bandScale.bandwidth())
        .attr('y', (d: any) => verticalScale(d.value))
        .attr('height', (d: any) => this.height - margin.bottom - verticalScale(d.value));

    this.canvas.select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(bandScale) as any);
}

// Moving DHs
export function moveDH(this: BarChartWithDH, newBandScale: ScaleBand<string>, newVerticalScale: ScaleLinear<number, number, never>) {
    const dhContainer = this.canvas.select('#dh-container');
    dhContainer.selectAll('.annotation-rects')
        .transition()
        .duration(TransitionDuration)
        .attr("x", (d: any) => newBandScale(d.label) || 0)
        .attr("width", newBandScale.bandwidth())
        .attr("y", (d: any) => {
            const parsedRange = JSON.parse('[' + d.content + ']');
            const center = 0.5 * (parsedRange[0] + parsedRange[1]);
            return (newVerticalScale(center) || 0) - 2;
        })
        .attr('opacity', (d: any) => (newBandScale.domain().includes(d.label) ? 1 : 0));

    dhContainer.selectAll('.annotation-line')
        .transition()
        .duration(TransitionDuration)
        .attr("width", newBandScale.bandwidth())
        .attr("x", (d: any) => newBandScale(d.label) || 0)
        .attr('opacity', (d: any) => (newBandScale.domain().includes(d.label) ? 1 : 0))
        .attr("y", (d: any) => newVerticalScale(parseFloat(d.content)) - 2);

    dhContainer.selectAll('.dp-annotation-marker')
        .transition()
        .duration(TransitionDuration)
        .attr('opacity', (d: any) => (newBandScale.domain().includes(d.label) ? 1 : 0))
        .attr('cx', (d: any) => (0.2 * newBandScale.bandwidth()) + (newBandScale(d.label) || 0));

    // TODO move the overaxis ones to accurate places if needed


}
