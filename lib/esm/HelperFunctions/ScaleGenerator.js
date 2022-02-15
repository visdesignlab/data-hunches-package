import { BrightOrange, CategoricalColor, DarkBlue, LargeNumber, margin } from "../Interfaces/Constants";
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { max } from "d3-array";
export var makeVerticalScale = function (newInputData, height) {
    return scaleLinear()
        .domain([max(newInputData.map(function (d) { return d.value; })) || LargeNumber, 0])
        .range([margin.top, height - margin.bottom])
        .clamp(true);
};
export var makeBandScale = function (newInputData, width) {
    return scaleBand().domain(newInputData.map(function (d) { return d.label; })).range([margin.left, width]).paddingInner(0.1).paddingOuter(0.1);
};
export var makeCategoricalScale = function (newInputData) {
    return scaleOrdinal()
        .domain(newInputData.map(function (d) { return d.categorical || 'a'; }))
        .range(CategoricalColor);
};
export var getRectFill = function (d, containCategory, selectedDP, categoricalScale) {
    if (d.label === selectedDP) {
        return BrightOrange;
    }
    return containCategory ? (categoricalScale(d.categorical) || DarkBlue) : DarkBlue;
};
