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
import { makeBandScale, makeCategoricalScale, makeValueScale } from "./HelperFunctions/ScaleGenerator";
import { DefaultBar, DefaultForeignObjectHeight, DefaultForeignObjectWidth, margin, SelectionColor } from "./Interfaces/Constants";
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
import { Grid } from "@material-ui/core";
import { DHIndicatorText, useStyles } from "./Interfaces/StyledComponents";
import CategoricalIndicator from "./ChartComponents/DataHunch/CategoricalIndicator";
import ChartLegends from "./ChartComponents/ChartLegends";
import SketchLayer from "./ChartComponents/SketchLayer";
import ManipulationForm from "./ChartComponents/Forms/ManipulationForm";
import { format } from "d3-format";
import { textwrap } from 'd3-textwrap';
import ManipulationLayer from "./ChartComponents/ManipulationLayer";
import { useLayoutEffect } from "react";
import ChartTitle from "./ChartComponents/ChartTitle";
import SketchyDrawings from "./ChartComponents/DataHunch/SketchyDrawings";
import StyledTooltip from "./ChartComponents/DataHunch/StyledTooltip";
var BarChart = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = useContext(Store);
    var styles = useStyles();
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
    var _d = useState([]), sketchArray = _d[0], setSketchArray = _d[1];
    useEffect(function () {
        var tempArray = dataHunchArray.filter(function (d) { return d.label === 'all chart'; });
        var tempSketchArray = tempArray.filter(function (d) { return d.type === 'sketch'; });
        stateUpdateWrapperUseJSON(allChartDHArray, tempArray, setAllChartDHArray);
        stateUpdateWrapperUseJSON(sketchArray, tempSketchArray, setSketchArray);
    }, [dataHunchArray]);
    // if needed useCallback
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var categoricalColorScale = makeCategoricalScale(dataSet);
    var yAxis = axisTop(valueScale).tickFormat(format('.2s'));
    var xAxis = axisLeft(bandScale);
    select('#vertical-axis')
        .attr('transform', "translate(0,".concat(margin.top, ")"))
        .call(yAxis);
    var wrap = textwrap().bounds({ width: 50, height: bandScale.bandwidth() }).method('tspans');
    select('#band-axis')
        .attr("transform", "translate(".concat(margin.left, ",0)"))
        .call(xAxis)
        .selectAll(".tick text")
        .call(wrap);
    useLayoutEffect(function () {
        if (store.selectedDP) {
            select('#band-axis').selectAll(".tick text").attr('fill', function (d) { return d === store.selectedDP ? SelectionColor : 'black'; });
        }
        else {
            select('#band-axis').selectAll(".tick text").attr('fill', 'black');
        }
    }, [store.selectedDP]);
    return _jsxs("div", { children: [_jsxs("svg", __assign({ width: store.svgWidth, height: store.svgHeight, onClick: function () {
                    if (store.selectingADataPoint) {
                        store.selectADataPointMode(false);
                        store.setCurrentSelectedDP(undefined);
                    }
                } }, { children: [store.showCategory ? _jsx(ChartLegends, {}, void 0) : _jsx(_Fragment, {}, void 0), _jsx("g", { className: 'axis', id: "band-axis" }, void 0), _jsx("g", __assign({ id: "rectangles-preview", display: store.needToShowPreview ? undefined : 'none' }, { children: _jsx("g", { className: 'axis', id: "axis-mask", transform: "translate(".concat(margin.left, ",0)") }, void 0) }), void 0), _jsx("g", { className: 'axis', id: "vertical-axis" }, void 0), _jsx("g", __assign({ id: "rectangles", display: (!store.needToShowPreview) ? undefined : 'none' }, { children: dataSet.map(function (d, i) {
                            return _jsx(BarElement, { dataElement: d, width: valueScale(d.value) - margin.left, height: bandScale.bandwidth(), xPos: margin.left, yPos: bandScale(d.label) || 0, fill: store.showCategory ? categoricalColorScale(d.categorical || 'a') : DefaultBar }, "".concat(i, "-barelement"));
                        }) }), void 0), _jsxs("g", __assign({ id: 'data-hunches-container' }, { children: [sketchArray.map(function (sketchDP) {
                                return _jsx(SketchyDrawings, { dataHunch: sketchDP, highlighted: sketchDP.id === store.highlightedDH, selected: store.selectedDH.includes(sketchDP.id) }, "sketchy-".concat(sketchDP.id));
                            }), dataSet.map(function (barDP) {
                                if (barDP.dataHunchArray) {
                                    var catDH = [];
                                    if (store.showCategory) {
                                        catDH = barDP.dataHunchArray.filter(function (d) { return d.type === 'categorical'; });
                                    }
                                    return (_jsxs(_Fragment, { children: [_jsx(DataHunchIndicator, { dataPoint: barDP, dataHunchArray: barDP.dataHunchArray }, "".concat(barDP.label, "-dhindicator")), _jsx(CategoricalIndicator, { dataHunchArrayString: JSON.stringify(catDH), barChartPoint: barDP }, "".concat(barDP.label, "-catindicator"))] }, void 0));
                                }
                                else {
                                    return _jsx(_Fragment, {}, void 0);
                                }
                            })] }), void 0), _jsx(RangeLayer, { sendManipulation: sendManipulationToParent }, void 0), _jsx(ManipulationLayer, { sendManipulation: sendManipulationToParent }, void 0), _jsx(SketchLayer, { sendManipulation: sendManipulationToParent }, void 0), _jsx(FormComponent, {}, void 0), _jsx(SpecificControl, {}, void 0)] }), void 0), _jsxs(Grid, __assign({ container: true }, { children: [_jsxs(Grid, __assign({ item: true, xs: 6 }, { children: [(store.inputMode === 'sketch' || store.inputMode === 'manipulations' || store.inputMode === 'range') ? _jsx("div", __assign({ style: { width: DefaultForeignObjectWidth, height: DefaultForeignObjectHeight } }, { children: _jsx(ManipulationForm, { manipulationOutput: manipulationResult, type: store.inputMode }, void 0) }), void 0) : _jsx(_Fragment, {}, void 0), _jsx(ChartTitle, {}, void 0)] }), void 0), _jsx(Grid, __assign({ item: true, xs: 6, style: { textAlign: 'start' } }, { children: _jsx("ul", __assign({ className: styles.noBulletsList }, { children: allChartDHArray.map(function (d, i) {
                                return (_jsx(StyledTooltip, { dataHunch: d, childrenComponent: _jsx("li", __assign({ style: { width: 'fit-content' } }, { children: _jsxs(DHIndicatorText, __assign({ isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), onClick: function () { store.setSelectedDH([d.id]); }, onMouseOver: function () { store.setHighlightedDH(d.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, fontSize: 'larger', needBold: true, style: { textOverflow: 'ellipsis' } }, { children: ["*", d.type === 'sketch' ? 'sketch' : d.content] }), void 0) }), void 0) }, "".concat(d.id, "-text")));
                            }) }), void 0) }), void 0)] }), void 0)] }, void 0);
};
export default observer(BarChart);
