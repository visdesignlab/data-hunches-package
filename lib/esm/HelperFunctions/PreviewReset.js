var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { axisLeft, axisBottom } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { margin, BrightOrange, TransitionDuration } from "../Interfaces/Constants";
import { makeVerticalScale, makeBandScale, makeCategoricalScale, getRectFill } from "./ScaleGenerator";
export var handlePreviewOnClick = function (ogDataSet, labelToPreview, valueToPreview, svgHeight, svgWidth, doesContainCategory) {
    var verticalScale = makeVerticalScale(ogDataSet, svgHeight);
    var bandScale = makeBandScale(ogDataSet, svgWidth);
    var categoricalScale = makeCategoricalScale(ogDataSet);
    // bind the data with all the rectangles first
    select('#rectangles-preview')
        .selectAll("rect")
        .data(ogDataSet)
        .join("rect")
        .attr('x', function (d) { return bandScale(d.label) || 0; })
        .attr('width', bandScale.bandwidth())
        .attr("y", function (d) { return verticalScale(d.value); })
        .attr("height", function (d) { return svgHeight - margin.bottom - verticalScale(d.value); })
        .attr("fill", function (d) { return getRectFill(d, doesContainCategory, labelToPreview, categoricalScale); });
    // make new data
    var newData = ogDataSet.map(function (d) {
        if (d.label === labelToPreview && valueToPreview === undefined) {
            return null;
        }
        else if (d.label === labelToPreview && valueToPreview !== undefined) {
            return __assign(__assign({}, d), { value: valueToPreview });
        }
        return d;
    }).filter(function (d) { return d; });
    if (!bandScale.domain().includes(labelToPreview) && valueToPreview !== undefined) {
        newData.push({ label: labelToPreview, value: valueToPreview });
    }
    var newBandScale = makeBandScale(newData, svgWidth);
    var newVertScale = makeVerticalScale(newData, svgHeight);
    var oldVerScale = scaleLinear().domain(verticalScale.domain()).range([newVertScale(verticalScale.domain()[0]), newVertScale(verticalScale.domain()[1])]);
    if (valueToPreview === undefined) {
        select('#rectangles-preview')
            .selectAll('rect')
            .filter(function (d) { return d.label === labelToPreview; })
            .attr('class', 'toremove');
        select('#rectangles-preview')
            .selectAll('.toremove')
            .remove();
    }
    var rectangles = select('#rectangles-preview')
        .selectAll('rect')
        .data(newData)
        .join(function (enter) { return enter.append('rect')
        .attr('fill', BrightOrange)
        .attr('x', function (d) { return newBandScale(d.label) || 0; })
        .attr('width', newBandScale.bandwidth())
        .attr('height', svgHeight - margin.bottom - newVertScale(0))
        .attr('y', newVertScale(0)).selection(); });
    rectangles.transition()
        .attr('x', function (d) { return newBandScale(d.label) || 0; })
        .attr('width', newBandScale.bandwidth())
        .duration(TransitionDuration)
        .attr('y', function (d) { return newVertScale(d.value); })
        .attr('height', function (d) { return svgHeight - margin.bottom - newVertScale(d.value); });
    // moveDH.bind(this)(newBandScale, newVertScale, true);
    // Matching Ticks Begin
    // domain [0] because it was oposite?
    var filteredTickArray = newVertScale.ticks().filter(function (d) { return d <= oldVerScale.domain()[0]; });
    //if the domain end is not in the tick array, we add it so it shows up
    if (filteredTickArray.indexOf(oldVerScale.domain()[0]) < 0)
        filteredTickArray.push(oldVerScale.domain()[0]);
    //Matching Ticks End
    select('#vertical-axis')
        .transition()
        .duration(TransitionDuration)
        //Remove tickValues to remove matching ticks
        .call(axisLeft(oldVerScale).tickValues(filteredTickArray));
    var newScale = select('#axis-mask')
        .call(axisLeft(verticalScale))
        .transition()
        .duration(TransitionDuration)
        .call(axisLeft(newVertScale));
    newScale.selectAll('path')
        .attr('stroke', BrightOrange);
    newScale.selectAll('g').selectAll('line').attr('stroke', BrightOrange);
    newScale.selectAll('g').selectAll('text').attr('fill', BrightOrange);
    select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(newBandScale));
};
export var handleResetOnClick = function (ogDataSet, svgHeight, svgWidth, doesContainCategory, selectedDP) {
    var verticalScale = makeVerticalScale(ogDataSet, svgHeight);
    var bandScale = makeBandScale(ogDataSet, svgWidth);
    var categoricalScale = makeCategoricalScale(ogDataSet);
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
        .call(axisLeft(verticalScale));
    select('#band-axis')
        .interrupt()
        .call(axisBottom(bandScale));
    select('#rectangles-preview')
        .selectAll('rect')
        .interrupt()
        .data(ogDataSet)
        .join('rect')
        .attr('fill', function (d) { return getRectFill(d, doesContainCategory, selectedDP, categoricalScale); })
        .attr('x', function (d) { return bandScale(d.label) || 0; })
        .attr('width', bandScale.bandwidth())
        .attr('y', function (d) { return verticalScale(d.value); })
        .attr('height', function (d) { return svgHeight - margin.bottom - verticalScale(d.value); });
};
