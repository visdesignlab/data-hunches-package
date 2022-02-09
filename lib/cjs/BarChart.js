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
var BarElement_1 = __importDefault(require("./ChartComponents/BarElement"));
var ScaleGenerator_1 = require("./HelperFunctions/ScaleGenerator");
var Constants_1 = require("./Interfaces/Constants");
var Store_1 = __importDefault(require("./Interfaces/Store"));
var d3_axis_1 = require("d3-axis");
var d3_selection_1 = require("d3-selection");
var GeneralControl_1 = __importDefault(require("./Controls/GeneralControl"));
var FormComponent_1 = __importDefault(require("./ChartComponents/FormComponent"));
var SpecificControl_1 = __importDefault(require("./Controls/SpecificControl"));
var BarChart = function (_a) {
    var dataSet = _a.dataSet;
    var store = (0, react_1.useContext)(Store_1.default);
    // if needed useCallback
    var verticalValueScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    var categoricalColorScale = (0, ScaleGenerator_1.makeCategoricalScale)(dataSet);
    var yAxis = (0, d3_axis_1.axisLeft)(verticalValueScale);
    var xAxis = (0, d3_axis_1.axisBottom)(honrizontalBandScale);
    (0, d3_selection_1.select)('#vertical-axis')
        .attr('transform', "translate(".concat(Constants_1.margin.left, ",0)"))
        .call(yAxis);
    (0, d3_selection_1.select)('#band-axis')
        .attr("transform", "translate(0,".concat(store.svgHeight - Constants_1.margin.bottom, ")"))
        .call(xAxis);
    return (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(GeneralControl_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)("svg", __assign({ width: store.svgWidth, height: store.svgHeight }, { children: [(0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "band-axis" }, void 0), (0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "axis-mask", transform: "translate(".concat(Constants_1.margin.left, ",0)") }, void 0), (0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "vertical-axis" }, void 0), (0, jsx_runtime_1.jsx)("g", __assign({ id: "rectangles" }, { children: dataSet.map(function (d, i) {
                            return (0, jsx_runtime_1.jsx)(BarElement_1.default, { dataElement: d, height: store.svgHeight - Constants_1.margin.bottom - verticalValueScale(d.value), width: honrizontalBandScale.bandwidth(), xPos: honrizontalBandScale(d.label) || 0, yPos: verticalValueScale(d.value), fill: store.containCategory ? categoricalColorScale(d.categorical || 'a') : Constants_1.DarkBlue }, i);
                        }) }), void 0), (0, jsx_runtime_1.jsx)(FormComponent_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(SpecificControl_1.default, {}, void 0)] }), void 0)] }, void 0);
};
exports.default = (0, mobx_react_lite_1.observer)(BarChart);
