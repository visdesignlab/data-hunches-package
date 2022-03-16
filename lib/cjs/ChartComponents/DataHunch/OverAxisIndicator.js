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
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var react_2 = require("react");
var __1 = require("../..");
var ScaleGenerator_1 = require("../../HelperFunctions/ScaleGenerator");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var SingleOverAxisIndicator_1 = __importDefault(require("./SingleOverAxisIndicator"));
var OverAxisIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray, dataPoint = _a.dataPoint;
    var store = (0, react_2.useContext)(Store_1.default);
    var dataSet = (0, react_2.useContext)(__1.DataContext);
    var curveRef = (0, react_1.useRef)(null);
    var bandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgHeight);
    var valueScale = (0, ScaleGenerator_1.makeValueScale)(dataSet, store.svgWidth);
    return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("text", __assign({ x: valueScale(dataPoint.value) + 7, y: (bandScale(dataPoint.label) || 0) + 0.75 * bandScale.bandwidth() - 2, textAnchor: "middle", fontSize: "smaller", alignmentBaseline: "hanging" }, { children: dataPoint.value }), void 0), (0, jsx_runtime_1.jsx)("g", { ref: curveRef }, void 0), dataHunchArray.map(function (dataHunch, i) {
                var startingPoint = valueScale(dataPoint.value) + 10;
                return ((0, jsx_runtime_1.jsx)(SingleOverAxisIndicator_1.default, { dataHunch: dataHunch, highlighted: store.highlightedDH === dataHunch.id, selected: store.selectedDH.includes(dataHunch.id), curvePoints: JSON.stringify([
                        [startingPoint, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()],
                        [startingPoint + (i + 1) * 15, (bandScale(dataPoint.label) || 0)],
                        [startingPoint + (i + 1) * 30, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]
                    ]), arrowPoints: JSON.stringify([
                        [startingPoint + (i + 1) * 30 - 8, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()],
                        [startingPoint + (i + 1) * 30 - 3, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + 5],
                        [startingPoint + (i + 1) * 30 + 2, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()]
                    ]), textX: valueScale(dataPoint.value) + 7 + (i + 1) * 30, textY: (bandScale(dataPoint.label) || 0) + 0.75 * bandScale.bandwidth() }, "overaxis".concat(dataHunch.id)));
            })] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(OverAxisIndicator);
