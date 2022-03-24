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
var d3_textwrap_1 = require("d3-textwrap");
var d3_selection_1 = require("d3-selection");
var ChartLegends = function () {
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var store = (0, react_1.useContext)(Store_1.default);
    var legendRef = (0, react_1.useRef)(null);
    var categoricalColorScale = (0, ScaleGenerator_1.makeCategoricalScale)(dataSet);
    var wrap = (0, d3_textwrap_1.textwrap)().bounds({ width: 80, height: (Constants_1.IndicatorSize + 2) * 5 }).method('tspans');
    (0, react_1.useLayoutEffect)(function () {
        if (legendRef.current !== null) {
            (0, d3_selection_1.select)(legendRef.current).selectAll('text').call(wrap);
            (0, d3_selection_1.select)(legendRef.current).selectAll('tspan').attr('alignment-baseline', 'central');
        }
    }, [legendRef, store.dbTag]);
    return ((0, jsx_runtime_1.jsx)("g", __assign({ transform: "translate(0,10)", ref: legendRef }, { children: Constants_1.DataPreset[store.dbTag].categories.map(function (cat, i) {
            return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("circle", { fill: categoricalColorScale(cat), cx: store.svgWidth - Constants_1.IndicatorSize * 2 - 80, cy: Constants_1.IndicatorSize + 2 + (Constants_1.IndicatorSize + 2) * i * 4, r: Constants_1.IndicatorSize }, void 0), (0, jsx_runtime_1.jsx)("text", __assign({ x: store.svgWidth - 80, y: Constants_1.IndicatorSize + 2 + (Constants_1.IndicatorSize + 2) * i * 4, alignmentBaseline: 'central', textAnchor: 'start' }, { children: cat }), void 0)] }, "".concat(cat, "-legend")));
        }) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(ChartLegends);
