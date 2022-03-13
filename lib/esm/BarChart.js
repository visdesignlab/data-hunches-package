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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeValueScale } from "./HelperFunctions/ScaleGenerator";
import { DarkBlue, DefaultForeignObjectHeight, DefaultForeignObjectWidth, IndicatorSize, IndicatorSpace, margin } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisLeft, axisTop } from "d3-axis";
import { select } from "d3-selection";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import RangeLayer from "./ChartComponents/RangeLayer";
import { useEffect } from "react";
import DataHunchIndicator from "./ChartComponents/DataHunch/DataHunchIndicators";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import { Tooltip } from "@material-ui/core";
import { DHIndicatorText } from "./Interfaces/StyledComponents";
import CategoricalIndicator from "./ChartComponents/DataHunch/CategoricalIndicator";
import ChartLegends from "./ChartComponents/ChartLegends";
import SketchLayer from "./ChartComponents/SketchLayer";
import ManipulationForm from "./ChartComponents/Forms/ManipulationForm";
var BarChart = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var _b = useState(''), manipulationResult = _b[0], setManipulationResult = _b[1];
    var sendManipulationToParent = function (manipulationResult) {
        setManipulationResult(manipulationResult);
    };
    useEffect(function () {
        if (store.inputMode !== 'manipulations') {
            setManipulationResult('');
        }
    }, [store.inputMode]);
    var _c = useState([]), allChartDHArray = _c[0], setAllChartDHArray = _c[1];
    useEffect(function () {
        var tempArray = dataHunchArray.filter(function (d) { return d.label === 'all chart'; });
        stateUpdateWrapperUseJSON(allChartDHArray, tempArray, setAllChartDHArray);
    }, [dataHunchArray]);
    // if needed useCallback
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var categoricalColorScale = makeCategoricalScale(dataSet);
    var yAxis = axisTop(valueScale);
    var xAxis = axisLeft(bandScale);
    select('#vertical-axis')
        .attr('transform', "translate(0,".concat(margin.top, ")"))
        .call(yAxis);
    select('#band-axis')
        .attr("transform", "translate(".concat(margin.left, ",0)"))
        .call(xAxis);
    return _jsxs("div", { children: [_jsxs("svg", __assign({ width: store.svgWidth, height: store.svgHeight }, { children: [_jsx(ChartLegends, {}, void 0), _jsxs("g", __assign({ id: 'chart-title' }, { children: [_jsx("text", __assign({ x: store.svgWidth * 0.5, y: store.svgHeight - margin.bottom, alignmentBaseline: 'hanging', textAnchor: "middle", fontSize: 'large' }, { children: store.datasetName }), void 0), allChartDHArray.map(function (d, i) {
                                return (_jsx(Tooltip, __assign({ title: _jsxs("div", { children: [_jsxs("p", { children: ["Content: ", d.content] }, void 0), _jsxs("p", { children: ["Reasoning: ", d.reasoning] }, void 0)] }, void 0) }, { children: _jsx(DHIndicatorText, __assign({ isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), onClick: function () { store.setSelectedDH([d.id]); }, x: (store.svgWidth - margin.left - margin.right) / 2 * (i % 2), y: store.svgHeight - margin.bottom + 30 + Math.floor(i / 2) * (IndicatorSpace + IndicatorSize), fontSize: 'larger' }, { children: "* ".concat(d.content.length > 25 ? "".concat(d.content.slice(0, 25), "...") : d.content) }), "".concat(d.id, "-text")) }), void 0));
                            })] }), void 0), _jsx("g", { className: 'axis', id: "band-axis" }, void 0), _jsx("g", __assign({ id: "rectangles-preview", display: store.needToShowPreview ? undefined : 'none' }, { children: _jsx("g", { className: 'axis', id: "axis-mask", transform: "translate(".concat(margin.left, ",0)") }, void 0) }), void 0), _jsx("g", { className: 'axis', id: "vertical-axis" }, void 0), _jsx("g", __assign({ id: "rectangles", display: (!store.needToShowPreview) ? undefined : 'none' }, { children: dataSet.map(function (d, i) {
                            return _jsx(BarElement, { dataElement: d, width: valueScale(d.value) - margin.left, height: bandScale.bandwidth(), xPos: margin.left, yPos: bandScale(d.label) || 0, fill: store.containCategory.length > 0 ? categoricalColorScale(d.categorical || 'a') : DarkBlue }, "".concat(i, "-barelement"));
                        }) }), void 0), _jsx("g", __assign({ id: 'data-hunches-container' }, { children: dataSet.map(function (barDP) {
                            if (barDP.dataHunchArray) {
                                var catDH = barDP.dataHunchArray.filter(function (d) { return d.type === 'categorical'; });
                                return (_jsxs(_Fragment, { children: [_jsx(DataHunchIndicator, { dataHunchArray: barDP.dataHunchArray }, "".concat(barDP.label, "-dhindicator")), _jsx(CategoricalIndicator, { dataHunchArrayString: JSON.stringify(catDH) }, "".concat(barDP.label, "-catindicator"))] }, void 0));
                                // return (
                                //     <>
                                //         <DataHunchIndicator
                                //             key={`${barDP.label}-dhindicator`}
                                //             dataHunchArray={barDP.dataHunchArray.filter(d => ["annotation", 'exclusion', 'categorical'].includes(d.type) || store.selectedDH.includes(d.id))}
                                //         />
                                //         <CategoricalIndicator
                                //             dataHunchArrayString={JSON.stringify(catDH.filter(d => store.selectedDH.includes(d.id)))}
                                //             key={`${barDP.label}-catindicator`} />
                                //     </>);
                            }
                            else {
                                return _jsx(_Fragment, {}, void 0);
                            }
                        }) }), void 0), store.inputMode === 'manipulations' ? _jsx(RangeLayer, { sendManipulation: sendManipulationToParent }, void 0) : _jsx(_Fragment, {}, void 0), store.inputMode === 'sketch' ?
                        _jsx(SketchLayer, { sendManipulation: sendManipulationToParent }, void 0) : _jsx(_Fragment, {}, void 0), _jsx(FormComponent, { manipulationOutput: manipulationResult }, void 0), _jsx(SpecificControl, {}, void 0)] }), void 0), _jsx("div", __assign({ style: { width: DefaultForeignObjectWidth, height: DefaultForeignObjectHeight } }, { children: (store.inputMode === 'sketch' || store.inputMode === 'manipulations') ?
                    _jsx(ManipulationForm, { manipulationOutput: manipulationResult, type: store.inputMode }, void 0) : _jsx(_Fragment, {}, void 0) }), void 0)] }, void 0);
};
export default observer(BarChart);
