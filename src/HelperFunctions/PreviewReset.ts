import { axisLeft, axisBottom } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { parse } from "mathjs";
import { margin, BrightOrange, TransitionDuration } from "../Interfaces/Constants";
import { BarChartDataPoint } from "../Interfaces/Types";
import { makeVerticalScale, makeBandScale, makeCategoricalScale, getRectFill } from "./ScaleGenerator";

export const handlePreviewOnClick = (ogDataSet: BarChartDataPoint[], labelToPreview: string | undefined, valueToPreview: number | undefined, svgHeight: number, svgWidth: number, doesContainCategory: boolean, modelInput: string | undefined) => {


    const verticalScale = makeVerticalScale(ogDataSet, svgHeight);
    const bandScale = makeBandScale(ogDataSet, svgWidth);
    const categoricalScale = makeCategoricalScale(ogDataSet);

    // bind the data with all the rectangles first
    select('#rectangles-preview')
        .selectAll("rect")
        .data(ogDataSet)
        .join("rect")
        .attr('x', d => bandScale(d.label) || 0)
        .attr('width', bandScale.bandwidth())
        .attr("y", d => verticalScale(d.value))
        .attr("height", d => svgHeight - margin.bottom - verticalScale(d.value))
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

    const newBandScale = makeBandScale(newData, svgWidth);
    const newVertScale = makeVerticalScale(newData, svgHeight);

    const oldVerScale = scaleLinear().domain(verticalScale.domain()).range([newVertScale(verticalScale.domain()[0]), newVertScale(verticalScale.domain()[1])]);



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
                .attr('fill', BrightOrange)
                .attr('x', d => newBandScale(d.label) || 0)
                .attr('width', newBandScale.bandwidth())
                .attr('height', svgHeight - margin.bottom - newVertScale(0))
                .attr('y', newVertScale(0)).selection()
        );

    rectangles.transition()
        .attr('x', d => newBandScale(d.label) || 0)
        .attr('width', newBandScale.bandwidth())
        .duration(TransitionDuration)
        .attr('y', d => newVertScale(d.value))
        .attr('height', d => svgHeight - margin.bottom - newVertScale(d.value));

    // moveDH.bind(this)(newBandScale, newVertScale, true);

    // Matching Ticks Begin
    // domain [0] because it was oposite?
    const filteredTickArray = newVertScale.ticks().filter(d => d <= oldVerScale.domain()[0]);

    //if the domain end is not in the tick array, we add it so it shows up
    if (filteredTickArray.indexOf(oldVerScale.domain()[0]) < 0) filteredTickArray.push(oldVerScale.domain()[0]);

    //Matching Ticks End

    select('#vertical-axis')
        .transition()
        .duration(TransitionDuration)
        //Remove tickValues to remove matching ticks
        .call((axisLeft(oldVerScale).tickValues(filteredTickArray) as any));

    const newScale = select('#axis-mask')
        .call(axisLeft(verticalScale) as any)
        .transition()
        .duration(TransitionDuration)
        .call((axisLeft(newVertScale) as any));

    newScale.selectAll('path')
        .attr('stroke', BrightOrange);
    newScale.selectAll('g').selectAll('line').attr('stroke', BrightOrange);
    newScale.selectAll('g').selectAll('text').attr('fill', BrightOrange);

    select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(newBandScale) as any);
};

export const handleResetOnClick = (ogDataSet: BarChartDataPoint[], svgHeight: number, svgWidth: number, doesContainCategory: boolean, selectedDP: string | undefined) => {
    const verticalScale = makeVerticalScale(ogDataSet, svgHeight);
    const bandScale = makeBandScale(ogDataSet, svgWidth);
    const categoricalScale = makeCategoricalScale(ogDataSet);

    // moveDH.bind(this)(bandScale, verticalScale);

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
        .call((axisLeft(verticalScale) as any));

    select('#band-axis')
        .interrupt()
        .call(axisBottom(bandScale) as any);

    select('#rectangles-preview')
        .selectAll('rect')
        .interrupt()
        .data(ogDataSet)
        .join('rect')
        .attr('fill', d => getRectFill(d, doesContainCategory, selectedDP, categoricalScale))
        .attr('x', (d: any) => bandScale(d.label) || 0)
        .attr('width', bandScale.bandwidth())
        .attr('y', (d: any) => verticalScale(d.value))
        .attr('height', (d: any) => svgHeight - margin.bottom - verticalScale(d.value));

    select('#rectangles-preview').selectAll('path').remove();
};