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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonGroup, Button } from "@material-ui/core";
import { axisLeft, axisBottom } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DataContext } from "..";
import { getRectFill, makeBandScale, makeCategoricalScale, makeVerticalScale } from "../HelperFunctions/ScaleGenerator";
import { BrightOrange, margin, TransitionDuration } from "../Interfaces/Constants";
import 'd3-transition';
import Store from "../Interfaces/Store";
var PreviewResetButtons = function (_a) {
    var labelToPreview = _a.labelToPreview, valueToPreview = _a.valueToPreview, disableButtons = _a.disableButtons;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var handlePreviewOnClick = function () {
        // bind the data with all the rectangles first
        // select('#rectangles-preview').selectAll('rect')
        //     .data(dataSet);
        var verticalScale = makeVerticalScale(dataSet, store.svgHeight);
        var bandScale = makeBandScale(dataSet, store.svgWidth);
        // make new data
        var newData = dataSet.map(function (d) {
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
        var newBandScale = makeBandScale(newData, store.svgWidth);
        var newVertScale = makeVerticalScale(newData, store.svgHeight);
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
            .attr('height', store.svgHeight - margin.bottom - newVertScale(0))
            .attr('y', newVertScale(0)).selection(); });
        rectangles.transition()
            .attr('x', function (d) { return newBandScale(d.label) || 0; })
            .attr('width', newBandScale.bandwidth())
            .duration(TransitionDuration)
            .attr('y', function (d) { return newVertScale(d.value); })
            .attr('height', function (d) { return store.svgHeight - margin.bottom - newVertScale(d.value); });
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
    var handleResetOnClick = function () {
        var verticalScale = makeVerticalScale(dataSet, store.svgHeight);
        var bandScale = makeBandScale(dataSet, store.svgWidth);
        var categoricalScale = makeCategoricalScale(dataSet);
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
            .data(dataSet)
            .join('rect')
            .attr('fill', function (d) { return getRectFill(d, store.containCategory, store.selectedDP, categoricalScale); })
            .attr('x', function (d) { return bandScale(d.label) || 0; })
            .attr('width', bandScale.bandwidth())
            .attr('y', function (d) { return verticalScale(d.value); })
            .attr('height', function (d) { return store.svgHeight - margin.bottom - verticalScale(d.value); });
    };
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, __assign({ size: 'small', disabled: disableButtons, onClick: handlePreviewOnClick }, { children: "Preview" }), void 0), _jsx(Button, __assign({ size: 'small', disabled: disableButtons, onClick: handleResetOnClick }, { children: "Reset" }), void 0)] }, void 0));
};
export default observer(PreviewResetButtons);
