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
var core_1 = require("@material-ui/core");
var OverAxisIndicator_1 = __importDefault(require("./OverAxisIndicator"));
var DHIndicatorRect_1 = __importDefault(require("./DHIndicatorRect"));
var DataHunchIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = (0, react_2.useContext)(Store_1.default);
    var dataSet = (0, react_2.useContext)(__1.DataContext);
    var valueScale = (0, ScaleGenerator_1.makeValueScale)(dataSet, store.svgWidth);
    var bandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgHeight);
    // const categoricalColorScale = makeCategoricalScale(dataSet);
    var _b = (0, react_1.useState)([]), inVisDH = _b[0], setInVisDH = _b[1];
    var _c = (0, react_1.useState)([]), offVisDH = _c[0], setOffVisDH = _c[1];
    var _d = (0, react_1.useState)([]), exDH = _d[0], setExDH = _d[1];
    (0, react_3.useEffect)(function () {
        var tempInVis = [];
        var tempOffVis = [];
        var tempExDH = [];
        dataHunchArray.forEach(function (d) {
            if (['annotation', 'categorical'].includes(d.type)) {
                tempOffVis.push(d);
            }
            else if (d.type === 'exclusion') {
                tempExDH.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(inVisDH, tempInVis, setInVisDH);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(offVisDH, tempOffVis, setOffVisDH);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(exDH, tempExDH, setExDH);
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
                if (parseFloat(d.content) > valueScale.domain()[1]) {
                    return (0, jsx_runtime_1.jsx)(OverAxisIndicator_1.default, { dataHunch: d }, "".concat(d.id, "-overaxis"));
                }
                if (inVisDH.length > 3) {
                    return ((0, jsx_runtime_1.jsx)(DHIndicatorRect_1.default, { dataHunch: d, highlighted: d.id === store.highlightedDH, selected: store.selectedDH.includes(d.id), xPos: calculateX(d, true), height: bandScale.bandwidth(), yPos: bandScale(d.label) || 0 }, "".concat(d.id, "-dhindicatorRect")));
                }
                else {
                    return ((0, jsx_runtime_1.jsx)(SketchyBar_1.default, { dataHunch: d, xPos: calculateX(d, false), yPos: (bandScale(d.label) || 0) + bandScale.bandwidth() / inVisDH.length * i, highlighted: d.id === store.highlightedDH, selected: store.selectedDH.includes(d.id), width: calculateWidth(d), height: bandScale.bandwidth() / inVisDH.length }, "".concat(d.id, "-dhindicatorSketchy")));
                }
            }), offVisDH.map(function (d, i) {
                return ((0, jsx_runtime_1.jsx)(core_1.Tooltip, __assign({ title: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Content: ", d.content] }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["Reasoning: ", d.reasoning] }, void 0)] }, void 0) }, { children: (0, jsx_runtime_1.jsx)(StyledComponents_1.DHIndicatorText, __assign({ x: findXPos(d, i, offVisDH.length), y: (bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * Constants_1.IndicatorSize) * (i % 2 === 0 ? -1 : 1), fontSize: 'larger', isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), onClick: function () { store.setSelectedDH([d.id]); }, onMouseOver: function () { store.setHighlightedDH(d.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: calculateText(d.content, findXPos(d, i, offVisDH.length), offVisDH.length) }), "".concat(d.id, "-text")) }), void 0));
            }), exDH.map(function (d, i) {
                return ((0, jsx_runtime_1.jsx)(core_1.Tooltip, __assign({ title: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Exclusion: ", d.content] }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["Reasoning: ", d.reasoning] }, void 0)] }, void 0) }, { children: (0, jsx_runtime_1.jsx)(StyledComponents_1.DHIndicatorText, __assign({ isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), x: Constants_1.IndicatorSize * (Math.floor(i / 2) + 1), y: (bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * Constants_1.IndicatorSize) * (i % 2 === 0 ? -1 : 1), fontSize: 'small', onClick: function () { store.setSelectedDH([d.id]); } }, { children: "x" }), "".concat(d.id, "-text")) }), void 0));
            })] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(DataHunchIndicator);
