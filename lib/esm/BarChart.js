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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeVerticalScale } from "./HelperFunctions/ScaleGenerator";
import { DarkBlue, margin } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import GeneralControl from "./Controls/GeneralControl";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import ManipulationLayer from "./ChartComponents/ManipulationLayer";
import { useEffect } from "react";
var BarChart = function () {
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var _a = useState(''), manipulationResult = _a[0], setManipulationResult = _a[1];
    var sendManipulationToParent = function (manipulationResult) {
        setManipulationResult(manipulationResult);
    };
    useEffect(function () {
        if (store.inputMode !== 'manipulation') {
            setManipulationResult('');
        }
    }, [store.inputMode]);
    // if needed useCallback
    var verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    var honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    var categoricalColorScale = makeCategoricalScale(dataSet);
    var yAxis = axisLeft(verticalValueScale);
    var xAxis = axisBottom(honrizontalBandScale);
    select('#vertical-axis')
        .attr('transform', "translate(".concat(margin.left, ",0)"))
        .call(yAxis);
    select('#band-axis')
        .attr("transform", "translate(0,".concat(store.svgHeight - margin.bottom, ")"))
        .call(xAxis);
    return _jsxs("div", { children: [_jsx(GeneralControl, {}, void 0), _jsxs("svg", __assign({ width: store.svgWidth, height: store.svgHeight }, { children: [_jsx("g", { className: 'axis', id: "band-axis" }, void 0), _jsx("g", { className: 'axis', id: "axis-mask", transform: "translate(".concat(margin.left, ",0)") }, void 0), _jsx("g", { className: 'axis', id: "vertical-axis" }, void 0), _jsx("g", __assign({ id: "rectangles" }, { children: dataSet.map(function (d, i) {
                            return _jsx(BarElement, { dataElement: d, height: store.svgHeight - margin.bottom - verticalValueScale(d.value), width: honrizontalBandScale.bandwidth(), xPos: honrizontalBandScale(d.label) || 0, yPos: verticalValueScale(d.value), fill: store.containCategory ? categoricalColorScale(d.categorical || 'a') : DarkBlue }, i);
                        }) }), void 0), store.inputMode === 'manipulation' ? _jsx(ManipulationLayer, { sendManipulation: sendManipulationToParent }, void 0) : _jsx(_Fragment, {}, void 0), _jsx(FormComponent, { manipulationOutput: manipulationResult }, void 0), _jsx(SpecificControl, {}, void 0)] }), void 0)] }, void 0);
};
export default observer(BarChart);
