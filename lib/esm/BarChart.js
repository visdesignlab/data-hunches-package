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
import DataHunchIndicator from "./ChartComponents/DataHunchIndicator";
var BarChart = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var _b = useState(''), manipulationResult = _b[0], setManipulationResult = _b[1];
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
    // useLayoutEffect(() => {
    //     const drawingG = document.getElementById('data-hunches-container') as any;
    //     const rc = rough.default.svg(drawingG);
    //     dataSet.forEach((dataPoint) => {
    //         if (dataPoint.dataHunchArray) {
    //             let inVisDH: DataHunch[] = [];
    //             dataPoint.dataHunchArray.forEach((d) => {
    //                 if (!['annotation', 'exclusion'].includes(d.type)) {
    //                     inVisDH.push(d);
    //                 }
    //             });
    //             if (inVisDH.length <= 3) {
    //                 if (document.getElementById('data-hunches-container') !== null) {
    //                     inVisDH.forEach((d, i) => {
    //                         const parsedRange: number[] = JSON.parse('[' + d.content + ']');
    //                         const yPos = verticalValueScale(max(parsedRange) as any);
    //                         const height = Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));
    //                         const sketchyDH = rc.rectangle(honrizontalBandScale(d.label) || 0 + honrizontalBandScale.bandwidth() / inVisDH.length * i, yPos, honrizontalBandScale.bandwidth() / inVisDH.length, height, {
    //                             fill: BrightOrange,
    //                             stroke: BrightOrange,
    //                             fillStyle: 'zigzag',
    //                             roughness: 2.8,
    //                             hachureAngle: 60,
    //                             hachureGap: 10,
    //                             fillWeight: 2,
    //                             strokeWidth: 2,
    //                         });
    //                         drawingG.appendChild(sketchyDH);
    //                     });
    //                 }
    //             }
    //         }
    //     });
    // }, [dataSet]);
    // useLayoutEffect(() => {
    // if (document.getElementById('data-hunches-container') !== null) {
    //     const drawingG = document.getElementById('data-hunches-container') as any;
    //     const rc = rough.default.svg(drawingG);
    //     [1, 2, 3, 4].forEach((d) => {
    //         const sketchyDH = rc.rectangle(100 * d, 100, 100, 100, {
    //             fill: BrightOrange,
    //             stroke: BrightOrange,
    //             fillStyle: 'zigzag',
    //             roughness: 2.8,
    //             hachureAngle: 60,
    //             hachureGap: 10,
    //             fillWeight: 2,
    //             strokeWidth: 2,
    //         });
    //         drawingG.appendChild(sketchyDH);
    //     });
    // }
    //     if (document.getElementById('data-hunches-container') !== null) {
    //         dataSet.forEach((dataPoint) => {
    //             const drawingG = document.getElementById('data-hunches-container') as any;
    //             const rc = rough.default.svg(drawingG);
    //             if (dataPoint.dataHunchArray) {
    //                 let inVisDH: DataHunch[] = [];
    //                 dataPoint.dataHunchArray.forEach((d) => {
    //                     if (!['annotation', 'exclusion'].includes(d.type)) {
    //                         inVisDH.push(d);
    //                     }
    //                 });
    //                 inVisDH = inVisDH
    //                 if (inVisDH.length <= 3) {
    //                     console.log(drawingG, rc);
    //                     inVisDH.forEach((d, i) => {
    //                         const parsedRange: number[] = JSON.parse('[' + d.content + ']');
    //                         const yPos = verticalValueScale(max(parsedRange) as any);
    //                         const height = Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));
    //                         const sketchyDH = rc.rectangle(honrizontalBandScale(d.label) || 0 + honrizontalBandScale.bandwidth() / inVisDH.length * i, yPos, honrizontalBandScale.bandwidth() / inVisDH.length, height, {
    //                             fill: BrightOrange,
    //                             stroke: BrightOrange,
    //                             fillStyle: 'zigzag',
    //                             roughness: 2.8,
    //                             hachureAngle: 60,
    //                             hachureGap: 10,
    //                             fillWeight: 2,
    //                             strokeWidth: 2,
    //                         });
    //                         drawingG.appendChild(sketchyDH);
    //                     });
    //                 }
    //             }
    //         });
    //     };
    // }, [dataSet]);
    var yAxis = axisLeft(verticalValueScale);
    var xAxis = axisBottom(honrizontalBandScale);
    select('#vertical-axis')
        .attr('transform', "translate(".concat(margin.left, ",0)"))
        .call(yAxis);
    select('#band-axis')
        .attr("transform", "translate(0,".concat(store.svgHeight - margin.bottom, ")"))
        .call(xAxis);
    return _jsxs("div", { children: [_jsx(GeneralControl, {}, void 0), _jsxs("svg", __assign({ width: store.svgWidth, height: store.svgHeight }, { children: [_jsx("g", { className: 'axis', id: "band-axis" }, void 0), _jsx("g", __assign({ id: "rectangles-preview", display: store.inputMode === 'dataSpace' ? undefined : 'none' }, { children: _jsx("g", { className: 'axis', id: "axis-mask", transform: "translate(".concat(margin.left, ",0)") }, void 0) }), void 0), _jsx("g", { className: 'axis', id: "vertical-axis" }, void 0), _jsx("g", __assign({ id: "rectangles", display: store.inputMode !== 'dataSpace' ? undefined : 'none' }, { children: dataSet.map(function (d, i) {
                            return _jsx(BarElement, { dataElement: d, height: store.svgHeight - margin.bottom - verticalValueScale(d.value), width: honrizontalBandScale.bandwidth(), xPos: honrizontalBandScale(d.label) || 0, yPos: verticalValueScale(d.value), fill: store.containCategory ? categoricalColorScale(d.categorical || 'a') : DarkBlue }, i);
                        }) }), void 0), _jsx("g", __assign({ id: 'data-hunches-container' }, { children: dataSet.map(function (d, i) {
                            if (d.dataHunchArray) {
                                return _jsx(DataHunchIndicator, { dataHunchArray: d.dataHunchArray }, d.label);
                            }
                            else {
                                return _jsx(_Fragment, {}, void 0);
                            }
                        }) }), void 0), store.inputMode === 'manipulation' ? _jsx(ManipulationLayer, { sendManipulation: sendManipulationToParent }, void 0) : _jsx(_Fragment, {}, void 0), _jsx(FormComponent, { manipulationOutput: manipulationResult }, void 0), _jsx(SpecificControl, {}, void 0)] }), void 0)] }, void 0);
};
export default observer(BarChart);
