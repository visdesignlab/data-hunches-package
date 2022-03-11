"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRectFill = exports.makeCategoricalScale = exports.makeBandScale = exports.makeValueScale = void 0;
var Constants_1 = require("../Interfaces/Constants");
var d3_scale_1 = require("d3-scale");
var d3_array_1 = require("d3-array");
var makeValueScale = function (newInputData, width) {
    return (0, d3_scale_1.scaleLinear)()
        .domain([0, (0, d3_array_1.max)(newInputData.map(function (d) { return d.value; })) || Constants_1.LargeNumber])
        .range([Constants_1.margin.left, width - Constants_1.margin.right - Constants_1.margin.left])
        .clamp(true);
};
exports.makeValueScale = makeValueScale;
var makeBandScale = function (newInputData, height) {
    return (0, d3_scale_1.scaleBand)().domain(newInputData.map(function (d) { return d.label; })).range([Constants_1.margin.top, height - Constants_1.margin.bottom]).paddingInner(0.1).paddingOuter(0.1);
};
exports.makeBandScale = makeBandScale;
var makeCategoricalScale = function (newInputData) {
    return (0, d3_scale_1.scaleOrdinal)()
        .domain(newInputData.map(function (d) { return d.categorical || 'a'; }))
        .range(Constants_1.CategoricalColor);
};
exports.makeCategoricalScale = makeCategoricalScale;
var getRectFill = function (d, doesContainCategory, selectedDP, categoricalScale) {
    return doesContainCategory ? (categoricalScale(d.categorical) || Constants_1.DarkBlue) : Constants_1.DarkBlue;
};
exports.getRectFill = getRectFill;
