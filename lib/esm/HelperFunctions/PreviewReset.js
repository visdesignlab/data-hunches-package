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
import { axisLeft, axisTop } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { parse } from "mathjs";
import { margin, BrightOrange, TransitionDuration } from "../Interfaces/Constants";
import { makeValueScale, makeBandScale, makeCategoricalScale, getRectFill } from "./ScaleGenerator";
export var handlePreviewOnClick = function (ogDataSet, labelToPreview, valueToPreview, svgHeight, svgWidth, doesContainCategory, modelInput) {
    var valueScale = makeValueScale(ogDataSet, svgWidth);
    var bandScale = makeBandScale(ogDataSet, svgHeight);
    var categoricalScale = makeCategoricalScale(ogDataSet);
    // bind the data with all the rectangles first
    select('#rectangles-preview')
        .selectAll("rect")
        .data(ogDataSet)
        .join("rect")
        .attr('stroke-width', 4)
        .attr('stroke', function (d) { return d.label === labelToPreview ? BrightOrange : 'none'; })
        .attr('x', margin.left)
        .attr('width', function (d) { return valueScale(d.value) - margin.left; })
        .attr("y", function (d) { return bandScale(d.label) || 0; })
        .attr("height", bandScale.bandwidth())
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
    if (labelToPreview !== undefined) {
        if (!bandScale.domain().includes(labelToPreview) && valueToPreview !== undefined) {
            newData.push({ label: labelToPreview, value: valueToPreview });
        }
    }
    else if (modelInput !== undefined) {
        try {
            var compileModel_1 = parse(modelInput).compile();
            newData = ogDataSet.map(function (d) {
                return __assign(__assign({}, d), { value: compileModel_1.evaluate({ x: d.value }) });
            });
        }
        catch (error) {
        }
    }
    var newBandScale = makeBandScale(newData, svgHeight);
    var newValueScale = makeValueScale(newData, svgWidth);
    var oldValueScale = scaleLinear().domain(valueScale.domain()).range([newValueScale(valueScale.domain()[0]), newValueScale(valueScale.domain()[1])]);
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
        .attr('x', margin.left)
        .attr('width', newValueScale(0))
        .attr('height', bandScale.bandwidth())
        .attr('y', function (d) { return bandScale(d.label) || 0; }).selection(); });
    rectangles.transition()
        .attr('x', margin.left)
        .attr('width', function (d) { return newValueScale(d.value) - margin.left; })
        .duration(TransitionDuration)
        .attr('y', function (d) { return newBandScale(d.label) || 0; })
        .attr('height', newBandScale.bandwidth());
    // moveDH.bind(this)(newBandScale, newVertScale, true);
    // Matching Ticks Begin
    // domain [0] because it was oposite?
    var filteredTickArray = newValueScale.ticks().filter(function (d) { return d <= oldValueScale.domain()[0]; });
    //if the domain end is not in the tick array, we add it so it shows up
    if (filteredTickArray.indexOf(oldValueScale.domain()[0]) < 0)
        filteredTickArray.push(oldValueScale.domain()[0]);
    //Matching Ticks End
    select('#vertical-axis')
        .transition()
        .duration(TransitionDuration)
        //Remove tickValues to remove matching ticks
        .call(axisTop(oldValueScale).tickValues(filteredTickArray));
    var newScale = select('#axis-mask')
        .attr('transform', "translate(0,".concat(margin.top, ")"))
        .call(axisTop(valueScale))
        .transition()
        .duration(TransitionDuration)
        .call(axisTop(newValueScale));
    newScale.selectAll('path')
        .attr('stroke', BrightOrange);
    newScale.selectAll('g').selectAll('line').attr('stroke', BrightOrange);
    newScale.selectAll('g').selectAll('text').attr('fill', BrightOrange);
    select('#band-axis').transition().duration(TransitionDuration).call(axisLeft(newBandScale));
};
export var handleResetOnClick = function (ogDataSet, svgHeight, svgWidth, doesContainCategory, selectedDP) {
    var valueScale = makeValueScale(ogDataSet, svgWidth);
    var bandScale = makeBandScale(ogDataSet, svgHeight);
    var categoricalScale = makeCategoricalScale(ogDataSet);
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
        .call(axisTop(valueScale));
    select('#band-axis')
        .interrupt()
        .call(axisLeft(bandScale));
    select('#rectangles-preview')
        .selectAll('rect')
        .interrupt()
        .data(ogDataSet)
        .join('rect')
        .attr('fill', function (d) { return getRectFill(d, doesContainCategory, selectedDP, categoricalScale); })
        .attr('stroke', function (d) { return d.label === selectedDP ? BrightOrange : 'none'; })
        .attr('x', margin.left)
        .attr('width', function (d) { return valueScale(d.value) - margin.left; })
        .attr('y', function (d) { return bandScale(d.label) || 0; })
        .attr('height', bandScale.bandwidth());
    select('#rectangles-preview').selectAll('path').remove();
};
