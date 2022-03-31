var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { useContext, useState, useRef } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeValueScale } from "./HelperFunctions/ScaleGenerator";
import { DefaultBar, margin, MaximumHeight, MaximumWidth, SelectionColor } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisLeft, axisTop } from "d3-axis";
import { pointer, select } from "d3-selection";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import RangeLayer from "./ChartComponents/RangeLayer";
import { useEffect } from "react";
import DataHunchIndicator from "./ChartComponents/DataHunch/DataHunchIndicators";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import { ContainerDiv, DHIndicatorText, useStyles } from "./Interfaces/StyledComponents";
import ChartLegends from "./ChartComponents/ChartLegends";
import SketchLayer from "./ChartComponents/SketchLayer";
import { format } from "d3-format";
import { textwrap } from 'd3-textwrap';
import ManipulationLayer from "./ChartComponents/ManipulationLayer";
import { useLayoutEffect } from "react";
import ChartTitle from "./ChartComponents/ChartTitle";
import SketchyDrawings from "./ChartComponents/DataHunch/SketchyDrawings";
import StyledTooltip from "./ChartComponents/DataHunch/StyledTooltip";
import styled from "styled-components";
import UpvotesDownvotes, { toVoteDH } from "./ChartComponents/DataHunch/UpvotesDownvotes";
import { DataPreset } from "./Interfaces/Datasets";
var BarChart = function (_a) {
    var dataHunchArray = _a.dataHunchArray, retrieveData = _a.retrieveData, showTable = _a.showTable;
    var store = useContext(Store);
    var styles = useStyles();
    var dataSet = useContext(DataContext);
    var _b = useState(''), manipulationResult = _b[0], setManipulationResult = _b[1];
    var sendManipulationToParent = function (manipulationResult) {
        setManipulationResult(manipulationResult);
    };
    useEffect(function () {
        if (!(store.inputMode === 'sketch' ||
            store.inputMode === 'direction' ||
            store.inputMode === 'manipulations' ||
            store.inputMode === 'range')) {
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
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var categoricalColorScale = makeCategoricalScale(DataPreset[store.dbTag].categories);
    var yAxis = axisTop(valueScale).tickFormat(format('.2s'));
    var xAxis = axisLeft(bandScale);
    select('#vertical-axis')
        .attr('transform', "translate(0,".concat(margin.top, ")"))
        .call(yAxis);
    var wrap = textwrap().bounds({ width: margin.left - 10, height: bandScale.bandwidth() }).method('tspans');
    select('#band-axis')
        .attr("transform", "translate(".concat(margin.left, ",0)"))
        .call(xAxis)
        .selectAll(".tick text")
        .attr('font-size', 'small')
        .on('contextmenu', function (e, d) {
        e.preventDefault();
        if (store.userName && store.inputMode === 'none') {
            store.selectADataPointMode(true);
            store.setCurrentSelectedDP(d);
            // const xLoc = (pointer(e)[0] + ControlFOWidth) > store.svgWidth ? (pointer(e)[0] - ControlFOWidth) : pointer(e)[0];
            // const yLoc = (pointer(e)[1] + ControlFOHeight) > store.svgHeight ? (pointer(e)[1] - ControlFOHeight) : pointer(e)[1];
            // const formXLoc = (pointer(e)[0] + DefaultForeignObjectWidth) > store.svgWidth ? (pointer(e)[0] - DefaultForeignObjectWidth) : pointer(e)[0];
            // const formYLoc = (pointer(e)[1] + DefaultForeignObjectHeight) > store.svgHeight ? (pointer(e)[1] - DefaultForeignObjectHeight) : pointer(e)[1];
            var xLoc = pointer(e, select('#app-div').node())[0];
            var yLoc = pointer(e, select('#app-div').node())[1];
            select('#specific-control')
                .style('display', null)
                .style('left', "".concat(xLoc, "px"))
                .style('top', "".concat(yLoc, "px"));
            select('#form-component')
                .style('left', "".concat(xLoc, "px"))
                .style('top', "".concat(yLoc + bandScale.bandwidth(), "px"));
            // .attr('x', formXLoc)
            // .attr('y', formYLoc);
        }
    })
        .call(wrap);
    useLayoutEffect(function () {
        if (store.selectedDP) {
            select('#band-axis').selectAll(".tick text").attr('fill', function (d) { return d === store.selectedDP ? SelectionColor : 'black'; });
        }
        else {
            select('#band-axis').selectAll(".tick text").attr('fill', 'black');
        }
    }, [store.selectedDP]);
    var svgRef = useRef(null);
    useLayoutEffect(function () {
        if (svgRef.current) {
            resizing();
        }
    }, [svgRef, showTable]);
    window.addEventListener("resize", function () {
        if (svgRef.current) {
            resizing();
        }
    });
    var resizing = function () {
        store.setWidth(svgRef.current.clientWidth);
        store.setHeight(svgRef.current.clientHeight);
    };
    return (_jsxs("div", __assign({ style: { height: '100%' }, onClick: function () {
            if (store.votingDH) {
                store.setVotingDH(undefined);
            }
            if (store.selectingADataPoint) {
                store.selectADataPointMode(false);
                store.setCurrentSelectedDP(undefined);
            }
        } }, { children: [_jsxs(ChartSVG, __assign({ ref: svgRef }, { children: [store.showCategory ? _jsx(ChartLegends, {}, void 0) : _jsx(_Fragment, {}, void 0), _jsx("g", __assign({ id: "rectangles-preview", display: store.needToShowPreview ? undefined : 'none' }, { children: _jsx("g", { className: 'axis', id: "axis-mask", transform: "translate(".concat(margin.left, ",0)") }, void 0) }), void 0), _jsx("g", { className: 'axis', id: "band-axis" }, void 0), _jsx("g", { className: 'axis', id: "vertical-axis" }, void 0), _jsx("g", __assign({ id: "rectangles", display: (!store.needToShowPreview) ? undefined : 'none' }, { children: dataSet.map(function (d, i) {
                            return _jsx(BarElement, { dataElement: d, width: valueScale(d.value) - margin.left, height: bandScale.bandwidth(), xPos: margin.left, yPos: bandScale(d.label) || 0, fill: store.showCategory ? categoricalColorScale(d.categorical || 'a') : DefaultBar }, "".concat(i, "-barelement"));
                        }) }), void 0), _jsxs("g", __assign({ id: 'data-hunches-container' }, { children: [sketchArray.map(function (sketchDP) {
                                return _jsx(SketchyDrawings, { dataHunch: sketchDP, highlighted: sketchDP.id === store.highlightedDH, selected: store.selectedDH.includes(sketchDP.id) }, "sketchy-".concat(sketchDP.id));
                            }), dataSet.map(function (barDP) {
                                if (barDP.dataHunchArray) {
                                    return _jsx(DataHunchIndicator, { dataPoint: barDP, dataHunchArray: barDP.dataHunchArray }, "".concat(barDP.label, "-dhindicator"));
                                }
                                else {
                                    return _jsx(_Fragment, {}, void 0);
                                }
                            })] }), void 0), store.inputMode === 'range' ? _jsx(RangeLayer, { sendManipulation: sendManipulationToParent }, void 0) : _jsx(_Fragment, {}, void 0), store.inputMode === 'manipulations' ? _jsx(ManipulationLayer, { sendManipulation: sendManipulationToParent }, void 0) : _jsx(_Fragment, {}, void 0), store.inputMode === 'sketch' ? _jsx(SketchLayer, { sendManipulation: sendManipulationToParent }, void 0) : _jsx(_Fragment, {}, void 0)] }), void 0), _jsx(ChartTitle, {}, void 0), _jsx(ContainerDiv, { children: _jsx("ul", __assign({ className: styles.noBulletsList }, { children: allChartDHArray.map(function (d) {
                        return (_jsx(StyledTooltip, { dataHunch: d, childrenComponent: _jsx("li", __assign({ style: { width: 'fit-content' } }, { children: _jsxs(DHIndicatorText, __assign({ isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), onClick: function () { store.setSelectedDH([d.id]); }, onContextMenu: function (e) {
                                        toVoteDH(e, store.svgWidth, store.svgHeight);
                                        store.setVotingDH(d);
                                    }, onMouseOver: function () { store.setHighlightedDH(d.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, fontSize: 'larger', needBold: true, style: { textOverflow: 'ellipsis' } }, { children: ["*", d.type === 'sketch' ? 'sketch' : d.content] }), void 0) }), "".concat(d.id, "-text")) }, void 0));
                    }) }), void 0) }, void 0), _jsx(UpvotesDownvotes, { retrieveData: retrieveData }, void 0), _jsx(FormComponent, { manipulationOutput: manipulationResult }, void 0), _jsx(SpecificControl, { sendManipulation: sendManipulationToParent }, void 0)] }), void 0));
};
export default observer(BarChart);
var ChartSVG = styled.svg(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 70%;\n  width: 100%;\n  max-width:", "px;\n  max-height:", "px\n"], ["\n  height: 70%;\n  width: 100%;\n  max-width:", "px;\n  max-height:", "px\n"])), MaximumWidth, MaximumHeight);
var templateObject_1;
