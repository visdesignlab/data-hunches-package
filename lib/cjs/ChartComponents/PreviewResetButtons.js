"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var d3_axis_1 = require("d3-axis");
var d3_scale_1 = require("d3-scale");
var d3_selection_1 = require("d3-selection");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var __1 = require("..");
var ScaleGenerator_1 = require("../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../Interfaces/Constants");
require("d3-transition");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var PreviewResetButtons = function (_a) {
    var labelToPreview = _a.labelToPreview, valueToPreview = _a.valueToPreview, disableButtons = _a.disableButtons;
    var store = (0, react_1.useContext)(Store_1.default);
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var handlePreviewOnClick = function () {
        // bind the data with all the rectangles first
        // select('#rectangles-preview').selectAll('rect')
        //     .data(dataSet);
        var verticalScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
        var bandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
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
        var newBandScale = (0, ScaleGenerator_1.makeBandScale)(newData, store.svgWidth);
        var newVertScale = (0, ScaleGenerator_1.makeVerticalScale)(newData, store.svgHeight);
        var oldVerScale = (0, d3_scale_1.scaleLinear)().domain(verticalScale.domain()).range([newVertScale(verticalScale.domain()[0]), newVertScale(verticalScale.domain()[1])]);
        if (valueToPreview === undefined) {
            (0, d3_selection_1.select)('#rectangles-preview')
                .selectAll('rect')
                .filter(function (d) { return d.label === labelToPreview; })
                .attr('class', 'toremove');
            (0, d3_selection_1.select)('#rectangles-preview')
                .selectAll('.toremove')
                .remove();
        }
        var rectangles = (0, d3_selection_1.select)('#rectangles-preview')
            .selectAll('rect')
            .data(newData)
            .join(function (enter) { return enter.append('rect')
            .attr('fill', Constants_1.BrightOrange)
            .attr('x', function (d) { return newBandScale(d.label) || 0; })
            .attr('width', newBandScale.bandwidth())
            .attr('height', store.svgHeight - Constants_1.margin.bottom - newVertScale(0))
            .attr('y', newVertScale(0)).selection(); });
        rectangles.transition()
            .attr('x', function (d) { return newBandScale(d.label) || 0; })
            .attr('width', newBandScale.bandwidth())
            .duration(Constants_1.TransitionDuration)
            .attr('y', function (d) { return newVertScale(d.value); })
            .attr('height', function (d) { return store.svgHeight - Constants_1.margin.bottom - newVertScale(d.value); });
        // moveDH.bind(this)(newBandScale, newVertScale, true);
        // Matching Ticks Begin
        // domain [0] because it was oposite?
        var filteredTickArray = newVertScale.ticks().filter(function (d) { return d <= oldVerScale.domain()[0]; });
        //if the domain end is not in the tick array, we add it so it shows up
        if (filteredTickArray.indexOf(oldVerScale.domain()[0]) < 0)
            filteredTickArray.push(oldVerScale.domain()[0]);
        //Matching Ticks End
        (0, d3_selection_1.select)('#vertical-axis')
            .transition()
            .duration(Constants_1.TransitionDuration)
            //Remove tickValues to remove matching ticks
            .call((0, d3_axis_1.axisLeft)(oldVerScale).tickValues(filteredTickArray));
        var newScale = (0, d3_selection_1.select)('#axis-mask')
            .call((0, d3_axis_1.axisLeft)(verticalScale))
            .transition()
            .duration(Constants_1.TransitionDuration)
            .call((0, d3_axis_1.axisLeft)(newVertScale));
        newScale.selectAll('path')
            .attr('stroke', Constants_1.BrightOrange);
        newScale.selectAll('g').selectAll('line').attr('stroke', Constants_1.BrightOrange);
        newScale.selectAll('g').selectAll('text').attr('fill', Constants_1.BrightOrange);
        (0, d3_selection_1.select)('#band-axis').transition().duration(Constants_1.TransitionDuration).call((0, d3_axis_1.axisBottom)(newBandScale));
    };
    var handleResetOnClick = function () {
        var verticalScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
        var bandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
        var categoricalScale = (0, ScaleGenerator_1.makeCategoricalScale)(dataSet);
        console.log('hit reset');
        // moveDH.bind(this)(bandScale, verticalScale);
        (0, d3_selection_1.select)('#axis-mask')
            .selectAll('*')
            .interrupt()
            .remove();
        (0, d3_selection_1.select)('#vertical-axis')
            .selectAll('*')
            .interrupt();
        (0, d3_selection_1.select)('#band-axis')
            .selectAll('*')
            .interrupt();
        (0, d3_selection_1.select)('#vertical-axis')
            .call((0, d3_axis_1.axisLeft)(verticalScale));
        (0, d3_selection_1.select)('#band-axis')
            .interrupt()
            .call((0, d3_axis_1.axisBottom)(bandScale));
        (0, d3_selection_1.select)('#rectangles-preview')
            .selectAll('rect')
            .interrupt()
            .data(dataSet)
            .join('rect')
            .attr('fill', function (d) { return (0, ScaleGenerator_1.getRectFill)(d, store.containCategory, store.selectedDP, categoricalScale); })
            .attr('x', function (d) { return bandScale(d.label) || 0; })
            .attr('width', bandScale.bandwidth())
            .attr('y', function (d) { return verticalScale(d.value); })
            .attr('height', function (d) { return store.svgHeight - Constants_1.margin.bottom - verticalScale(d.value); });
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, __assign({ size: 'small', disabled: disableButtons, onClick: handlePreviewOnClick }, { children: "Preview" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ size: 'small', disabled: disableButtons, onClick: handleResetOnClick }, { children: "Reset" }), void 0)] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(PreviewResetButtons);
