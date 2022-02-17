"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var d3_delaunay_1 = require("d3-delaunay");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var __1 = require("../..");
var ScaleGenerator_1 = require("../../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../../Interfaces/Constants");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var CategoricalIndicator = function (_a) {
    var dataHunch = _a.dataHunch;
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var store = (0, react_1.useContext)(Store_1.default);
    var verticalValueScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    var _b = (0, react_1.useState)([]), polygonPoints = _b[0], setPolygonPoints = _b[1];
    //  height={store.svgHeight - margin.bottom - verticalValueScale(d.value)}
    //     width = { honrizontalBandScale.bandwidth() };
    //     xPos = { honrizontalBandScale(d.label) || 0};
    // yPos = { verticalValueScale(d.value) }
    (0, react_1.useEffect)(function () {
        var barChartPoint = dataSet.filter(function (dp) { return dp.label === dataHunch.label; })[0];
        var height = store.svgHeight - Constants_1.margin.bottom - verticalValueScale(barChartPoint.value);
        var generateX = function () {
            return getRandomArbitrary(honrizontalBandScale(barChartPoint.label) || 0, honrizontalBandScale(barChartPoint.label) || 0 + honrizontalBandScale.bandwidth());
        };
        var generateY = function () {
            return getRandomArbitrary(verticalValueScale(barChartPoint.value), verticalValueScale(barChartPoint.value) + height);
        };
        //generate random points:
        var randomPoints = [[honrizontalBandScale(barChartPoint.label) || 0, verticalValueScale(barChartPoint.value)],
            [honrizontalBandScale(barChartPoint.label) || 0, verticalValueScale(barChartPoint.value) + height],
            [(honrizontalBandScale(barChartPoint.label) || 0) + honrizontalBandScale.bandwidth(), verticalValueScale(barChartPoint.value)],
            [(honrizontalBandScale(barChartPoint.label) || 0) + honrizontalBandScale.bandwidth(), verticalValueScale(barChartPoint.value) + height]];
        for (var time = 0; time < 20; time++) {
            randomPoints.push([generateX(), generateY()]);
        }
        var delaunay = d3_delaunay_1.Delaunay.from(randomPoints);
        var iterator = delaunay.trianglePolygons();
        setPolygonPoints(Array.from(iterator));
    }, [dataHunch]);
    var makePointArray = function (input) {
        var output = '';
        input.forEach(function (d) {
            output += d.toString();
            output += ' ';
        });
        console.log(output);
        return output;
    };
    return ((0, jsx_runtime_1.jsx)("g", { children: polygonPoints.map(function (d) {
            return (0, jsx_runtime_1.jsx)("polygon", { points: makePointArray(d), fill: 'none', stroke: "black" }, void 0);
        }) }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(CategoricalIndicator);
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
