import { CategoricalColor, DefaultBar, LargeNumber, margin } from "../Interfaces/Constants";
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { max } from "d3-array";
export var makeValueScale = function (newInputData, width) {
    return scaleLinear()
        .domain([0, max(newInputData.map(function (d) { return d.value; })) || LargeNumber])
        .range([margin.left, width - margin.right - margin.left])
        .clamp(true);
};
export var makeBandScale = function (newInputData, height) {
    return scaleBand().domain(newInputData.map(function (d) { return d.label; })).range([margin.top, height - margin.bottom]).paddingInner(0.1).paddingOuter(0.1);
};
export var makeCategoricalScale = function (newInputData) {
    return scaleOrdinal()
        .domain(newInputData.map(function (d) { return d.categorical || 'a'; }))
        .range(CategoricalColor);
};
export var getRectFill = function (d, doesContainCategory, selectedDP, categoricalScale) {
    return doesContainCategory ? (categoricalScale(d.categorical) || DefaultBar) : DefaultBar;
};
