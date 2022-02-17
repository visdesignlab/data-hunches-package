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
var __1 = require("..");
var ScaleGenerator_1 = require("../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var ChartLegends = function () {
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var store = (0, react_1.useContext)(Store_1.default);
    var categoricalColorScale = (0, ScaleGenerator_1.makeCategoricalScale)(dataSet);
    return ((0, jsx_runtime_1.jsx)("g", { children: store.containCategory.map(function (cat, i) {
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("circle", { fill: categoricalColorScale(cat), cx: store.svgWidth - Constants_1.IndicatorSize * 2, cy: Constants_1.IndicatorSize + 2 + (Constants_1.IndicatorSize + 2) * i * 2, r: Constants_1.IndicatorSize }, void 0), (0, jsx_runtime_1.jsx)("text", __assign({ x: store.svgWidth - Constants_1.IndicatorSize * 4, y: Constants_1.IndicatorSize + 2 + (Constants_1.IndicatorSize + 2) * i * 2, alignmentBaseline: 'central', textAnchor: 'end' }, { children: cat }), void 0)] }, void 0));
        }) }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(ChartLegends);
