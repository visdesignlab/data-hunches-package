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
    var verticalValueScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    // const categoricalColorScale = makeCategoricalScale(dataSet);
    var _b = (0, react_1.useState)([]), inVisDH = _b[0], setInVisDH = _b[1];
    var _c = (0, react_1.useState)([]), offVisDH = _c[0], setOffVisDH = _c[1];
    (0, react_3.useEffect)(function () {
        var tempInVis = [];
        var tempOffVis = [];
        dataHunchArray.forEach(function (d) {
            if (['annotation', 'exclusion', 'categorical'].includes(d.type)) {
                tempOffVis.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(inVisDH, tempInVis, setInVisDH);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(offVisDH, tempOffVis, setOffVisDH);
    }, [dataHunchArray]);
    var calculateY = function (dataHunch, rangeCenter) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (rangeCenter) {
                var center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return verticalValueScale(center) - 2;
            }
            else {
                return verticalValueScale((0, d3_array_1.max)(parsedRange));
            }
        }
        return verticalValueScale(parseFloat(dataHunch.content));
    };
    var calculateHeight = function (dataHunch) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            return Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));
        }
        else {
            return store.svgHeight - Constants_1.margin.bottom - verticalValueScale(parseFloat(dataHunch.content));
        }
    };
    return ((0, jsx_runtime_1.jsxs)("g", { children: [inVisDH.map(function (d, i) {
                if (parseFloat(d.content) > verticalValueScale.domain()[0]) {
                    return (0, jsx_runtime_1.jsx)(OverAxisIndicator_1.default, { dataHunch: d }, "".concat(d.id, "-overaxis"));
                }
                if (inVisDH.length > 3) {
                    return ((0, jsx_runtime_1.jsx)(DHIndicatorRect_1.default, { dataHunch: d, xPos: honrizontalBandScale(d.label) || 0, width: honrizontalBandScale.bandwidth(), yPos: calculateY(d, true) }, "".concat(d.id, "-dhindicatorRect")));
                }
                else {
                    return ((0, jsx_runtime_1.jsx)(SketchyBar_1.default, { dataHunch: d, xPos: (honrizontalBandScale(d.label) || 0) + (honrizontalBandScale.bandwidth() / inVisDH.length * i), yPos: calculateY(d, false), width: honrizontalBandScale.bandwidth() / inVisDH.length, height: calculateHeight(d) }, "".concat(d.id, "-dhindicatorSketchy")));
                }
            }), offVisDH.map(function (d, i) {
                return ((0, jsx_runtime_1.jsx)(core_1.Tooltip, __assign({ title: d.reasoning }, { children: (0, jsx_runtime_1.jsx)(StyledComponents_1.DHIndicatorText, __assign({ x: (honrizontalBandScale(d.label) || 0) + 0.5 * honrizontalBandScale.bandwidth() + (2 * Constants_1.IndicatorSize + Constants_1.IndicatorSpace) * (i % 2 === 0 ? -1 : 1), y: store.svgHeight - Constants_1.margin.bottom + 25 + 2 * (Constants_1.IndicatorSize + Constants_1.IndicatorSpace) * Math.floor(i / 2), fontSize: d.type === 'exclusion' ? 'small' : 'large', isHighlighted: d.id === store.highlightedDH, onMouseOver: function () { store.setHighlightedDH(d.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: d.type === 'exclusion' ? 'x' : '*' }), "".concat(d.id, "-text")) }), void 0));
            })] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(DataHunchIndicator);
