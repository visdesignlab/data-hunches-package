import { axisLeft, axisTop } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { parse } from "mathjs";
import { margin, SelectionColor, TransitionDuration } from "../Interfaces/Constants";
import { BarChartDataPoint } from "../Interfaces/Types";
import { makeValueScale, makeBandScale, makeCategoricalScale, getRectFill } from "./ScaleGenerator";

export const handlePreviewOnClick = (ogDataSet: BarChartDataPoint[], labelToPreview: string | undefined, valueToPreview: number | undefined, svgHeight: number, SVGWidth: number, doesContainCategory: boolean, modelInput: string | undefined) => {


    const valueScale = makeValueScale(ogDataSet, SVGWidth);
    const bandScale = makeBandScale(ogDataSet, svgHeight);
    const categoricalScale = makeCategoricalScale(ogDataSet);


    // bind the data with all the rectangles first
    select('#rectangles-preview')
        .selectAll("rect")
        .data(ogDataSet)
        .join("rect")
        .attr('stroke-width', 4)
        .attr('stroke', d => d.label === labelToPreview ? SelectionColor : 'none')
        .attr('x', margin.left)
        .attr('width', d => valueScale(d.value) - margin.left)
        .attr("y", d => bandScale(d.label) || 0)
        .attr("height", bandScale.bandwidth())
        .attr("fill", d => getRectFill(d, doesContainCategory, labelToPreview, categoricalScale));


    // make new data
    let newData = ogDataSet.map(d => {
        if (d.label === labelToPreview && valueToPreview === undefined) {
            return null;
        }
        else if (d.label === labelToPreview && valueToPreview !== undefined) {
            return { ...d, value: valueToPreview };
        } return d;
    }).filter(d => d) as BarChartDataPoint[];

    if (labelToPreview !== undefined) {
        if (!bandScale.domain().includes(labelToPreview) && valueToPreview !== undefined) {
            newData.push({ label: labelToPreview, value: valueToPreview });
        }
    } else if (modelInput !== undefined) {
        try {
            const compileModel = parse(modelInput).compile();

            newData = ogDataSet.map(d => {
                return { ...d, value: compileModel.evaluate({ x: d.value }) };
            });
        } catch (error) {

        }
    }

    const newBandScale = makeBandScale(newData, svgHeight);
    const newValueScale = makeValueScale(newData, SVGWidth);

    const oldValueScale = scaleLinear().domain(valueScale.domain()).range([newValueScale(valueScale.domain()[0]), newValueScale(valueScale.domain()[1])]);



    if (valueToPreview === undefined) {

        select('#rectangles-preview')
            .selectAll('rect')
            .filter((d: any) => d.label === labelToPreview)
            .attr('class', 'toremove');
        select('#rectangles-preview')
            .selectAll('.toremove')
            .remove();
    }

    const rectangles = select('#rectangles-preview')
        .selectAll('rect')
        .data(newData)
        .join(
            enter => enter.append('rect')
                .attr('fill', SelectionColor)
                .attr('x', margin.left)
                .attr('width', newValueScale(0))
                .attr('height', bandScale.bandwidth())
                .attr('y', d => bandScale(d.label) || 0).selection()
        );

    rectangles.transition()
        .attr('x', margin.left)
        .attr('width', d => newValueScale(d.value) - margin.left)
        .duration(TransitionDuration)
        .attr('y', d => newBandScale(d.label) || 0)
        .attr('height', newBandScale.bandwidth());

    // moveDH.bind(this)(newBandScale, newVertScale, true);

    // Matching Ticks Begin
    // domain [0] because it was oposite?
    const filteredTickArray = newValueScale.ticks().filter(d => d <= oldValueScale.domain()[0]);

    //if the domain end is not in the tick array, we add it so it shows up
    if (filteredTickArray.indexOf(oldValueScale.domain()[0]) < 0) filteredTickArray.push(oldValueScale.domain()[0]);

    //Matching Ticks End

    select('#vertical-axis')
        .transition()
        .duration(TransitionDuration)
        //Remove tickValues to remove matching ticks
        .call((axisTop(oldValueScale).tickValues(filteredTickArray) as any));

    const newScale = select('#axis-mask')
        .attr('transform', `translate(0,${margin.top})`)
        .call(axisTop(valueScale) as any)
        .transition()
        .duration(TransitionDuration)
        .call((axisTop(newValueScale) as any));

    newScale.selectAll('path')
        .attr('stroke', SelectionColor);
    newScale.selectAll('g').selectAll('line').attr('stroke', SelectionColor);
    newScale.selectAll('g').selectAll('text').attr('fill', SelectionColor);

    select('#band-axis').transition().duration(TransitionDuration).call(axisLeft(newBandScale) as any);
};

export const handleResetOnClick = (ogDataSet: BarChartDataPoint[], svgHeight: number, SVGWidth: number, doesContainCategory: boolean, selectedDP: string | undefined) => {
    const valueScale = makeValueScale(ogDataSet, SVGWidth);
    const bandScale = makeBandScale(ogDataSet, svgHeight);
    const categoricalScale = makeCategoricalScale(ogDataSet);


    select('#axis-mask')
        .selectAll('*')
        .interrupt()
        .remove();

    select('#vertical-axis')
        .selectAll('*')
        .interrupt();

    select('#band-axis')
        .selectAll('*')
        .interrupt();

    select('#vertical-axis')
        .call((axisTop(valueScale) as any));

    select('#band-axis')
        .interrupt()
        .call(axisLeft(bandScale) as any);

    select('#rectangles-preview')
        .selectAll('rect')
        .interrupt()
        .data(ogDataSet)
        .join('rect')
        .attr('fill', d => getRectFill(d, doesContainCategory, selectedDP, categoricalScale))
        .attr('stroke', d => d.label === selectedDP ? SelectionColor : 'none')
        .attr('x', margin.left)
        .attr('width', d => valueScale(d.value) - margin.left)
        .attr('y', d => bandScale(d.label) || 0)
        .attr('height', bandScale.bandwidth());

    select('#rectangles-preview').selectAll('path').remove();
};