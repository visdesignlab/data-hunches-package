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
var d3_array_1 = require("d3-array");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var react_2 = require("react");
var react_3 = require("react");
var __1 = require("../..");
var ScaleGenerator_1 = require("../../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../../Interfaces/Constants");
var StateChecker_1 = require("../../Interfaces/StateChecker");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
require("roughjs");
var SketchyBar_1 = __importDefault(require("./SketchyBar"));
var StyledComponents_1 = require("../../Interfaces/StyledComponents");
var SingleOverAxisIndicator_1 = __importDefault(require("./SingleOverAxisIndicator"));
var ExclusionIndicator_1 = __importDefault(require("./ExclusionIndicator"));
var DataHunchIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray, dataPoint = _a.dataPoint;
    var store = (0, react_2.useContext)(Store_1.default);
    var dataSet = (0, react_2.useContext)(__1.DataContext);
    var valueScale = (0, ScaleGenerator_1.makeValueScale)(dataSet, store.svgWidth);
    var bandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgHeight);
    var _b = (0, react_1.useState)([]), inVisDH = _b[0], setInVisDH = _b[1];
    var _c = (0, react_1.useState)([]), offVisDH = _c[0], setOffVisDH = _c[1];
    var _d = (0, react_1.useState)([]), exDH = _d[0], setExDH = _d[1];
    var _e = (0, react_1.useState)([]), aboveAxisDH = _e[0], setAboveAxisDH = _e[1];
    (0, react_3.useEffect)(function () {
        var tempInVis = [];
        var tempOffVis = [];
        var tempExDH = [];
        var tempAboveAxisDH = [];
        dataHunchArray.forEach(function (d) {
            if (['annotation', 'categorical'].includes(d.type)) {
                tempOffVis.push(d);
            }
            else if (d.type === 'exclusion') {
                tempExDH.push(d);
            }
            else if (d.type === 'data space' && parseFloat(d.content) > valueScale.domain()[1]) {
                tempAboveAxisDH.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(inVisDH, tempInVis, setInVisDH);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(offVisDH, tempOffVis, setOffVisDH);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(exDH, tempExDH, setExDH);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(aboveAxisDH, tempAboveAxisDH, setAboveAxisDH);
    }, [dataHunchArray]);
    var calculateX = function (dataHunch, condensed) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (condensed) {
                var center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return valueScale(center) - 2;
            }
            else {
                return valueScale((0, d3_array_1.min)(parsedRange));
            }
        }
        if (condensed) {
            return valueScale(parseFloat(dataHunch.content));
        }
        return Constants_1.margin.left;
    };
    var calculateWidth = function (dataHunch) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            return Math.abs(valueScale(parsedRange[0]) - valueScale(parsedRange[1]));
        }
        else {
            return valueScale(parseFloat(dataHunch.content)) - Constants_1.margin.left;
        }
    };
    var findXPos = function (dataHunch, index, arrayLength) {
        var findDP = dataSet.filter(function (d) { return d.label === dataHunch.label; });
        if (findDP.length > 0) {
            var dp = findDP[0];
            if (valueScale(dp.value) >= (store.svgWidth - Constants_1.margin.right - Constants_1.margin.left)) {
                return valueScale(dp.value) + Math.floor(index / 2) * 20;
            }
            return valueScale(dp.value) + Math.floor(index / 2) * 90;
        }
        return 0;
    };
    var calculateText = function (dataHunchText, placement, arrayLength) {
        if (placement >= (store.svgWidth - Constants_1.margin.right - Constants_1.margin.left)) {
            if (arrayLength <= 2) {
                return "* ".concat(dataHunchText.slice(0, 15)).concat(dataHunchText.length > 15 ? '...' : '');
            }
            return '* ...';
        }
        if (arrayLength <= 2) {
            return "* ".concat(dataHunchText);
        }
        return "* ".concat(dataHunchText.slice(0, 10)).concat(dataHunchText.length > 10 ? '...' : '');
    };
    return ((0, jsx_runtime_1.jsxs)("g", { children: [inVisDH.map(function (d, i) {
                return ((0, jsx_runtime_1.jsx)(SketchyBar_1.default, { valueScaleDomain: JSON.stringify(valueScale.domain()), valueScaleRange: JSON.stringify(valueScale.range()), dataHunch: d, xPos: calculateX(d, d.type === 'range' || inVisDH.length > 3), yPos: (bandScale(d.label) || 0) + (inVisDH.length > 3 ? 0 : (bandScale.bandwidth() / inVisDH.length * i)), highlighted: d.id === store.highlightedDH, selected: store.selectedDH.includes(d.id), width: (d.type === 'range' || inVisDH.length > 3) ? 4 : calculateWidth(d), height: bandScale.bandwidth() / (inVisDH.length > 3 ? 1 : inVisDH.length) }, "".concat(d.id, "-dhindicatorSketchy")));
            }), aboveAxisDH.length > 0 ?
                (0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("text", __assign({ x: valueScale(dataPoint.value) + 15, y: (bandScale(dataPoint.label) || 0) + 0.6 * bandScale.bandwidth(), textAnchor: "middle", fontSize: "medium", alignmentBaseline: "middle" }, { children: dataPoint.value }), void 0), aboveAxisDH.map(function (dataHunch, i) {
                            var startingPoint = valueScale(dataPoint.value);
                            return ((0, jsx_runtime_1.jsx)(SingleOverAxisIndicator_1.default, { dataHunch: dataHunch, highlighted: store.highlightedDH === dataHunch.id, selected: store.selectedDH.includes(dataHunch.id), curvePoints: JSON.stringify([
                                    [startingPoint, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()],
                                    [startingPoint + (i + 1) * 16, (bandScale(dataPoint.label) || 0)],
                                    [startingPoint + (i + 1) * 32, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]
                                ]), arrowPoints: JSON.stringify([
                                    [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()],
                                    [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + 5],
                                    [startingPoint + (i + 1) * 32 + 8, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]
                                ]), rotateX: startingPoint + (i + 1) * 32 - 2, rotateY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth(), textX: valueScale(dataPoint.value) + 10 + (i + 1) * 32, textY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() }, "overaxis".concat(dataHunch.id)));
                        })] }, void 0)
                :
                    (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), offVisDH.map(function (d, i) {
                return ((0, jsx_runtime_1.jsx)(StyledComponents_1.LightTooltip, __assign({ title: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Content: ", d.content] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Reasoning: ", d.reasoning] }, void 0)] }, void 0) }, { children: (0, jsx_runtime_1.jsx)(StyledComponents_1.DHIndicatorText, __assign({ x: findXPos(d, i, offVisDH.length), y: (bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * Constants_1.IndicatorSize) * (i % 2 === 0 ? -1 : 1), fontSize: 'larger', needBold: false, isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), onClick: function () { store.setSelectedDH([d.id]); }, onMouseOver: function () { store.setHighlightedDH(d.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: calculateText(d.content, findXPos(d, i, offVisDH.length), offVisDH.length) }), void 0) }), "".concat(d.id, "-text")));
            }), exDH.map(function (d, i) {
                return ((0, jsx_runtime_1.jsx)(ExclusionIndicator_1.default, { dataPoint: dataPoint, highlighted: store.highlightedDH === d.id, selected: store.selectedDH.includes(d.id), dataHunch: d, centerX: valueScale(dataPoint.value) - 20 - i * 10, centerY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth(), bandWidth: bandScale.bandwidth() }, void 0));
            })] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(DataHunchIndicator);
