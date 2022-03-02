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
var StateChecker_1 = require("../../Interfaces/StateChecker");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var CategoricalIndicator = function (_a) {
    var dataHunchArrayString = _a.dataHunchArrayString;
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var store = (0, react_1.useContext)(Store_1.default);
    var verticalValueScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    var categoricalColorScale = (0, ScaleGenerator_1.makeCategoricalScale)(dataSet);
    var _b = (0, react_1.useState)([]), polygonPoints = _b[0], setPolygonPoints = _b[1];
    var _c = (0, react_1.useState)([]), dataHunchArray = _c[0], setDataHunchArray = _c[1];
    (0, react_1.useEffect)(function () {
        var tempDataHunchArray = JSON.parse(dataHunchArrayString);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(dataHunchArray, tempDataHunchArray, setDataHunchArray);
        if (dataHunchArray.length > 0) {
            var barChartPoint = dataSet.filter(function (dp) { return dp.label === dataHunchArray[0].label; })[0];
            var height = store.svgHeight - Constants_1.margin.bottom - verticalValueScale(barChartPoint.value);
            //generate random points:
            var randomPoints = [[honrizontalBandScale(barChartPoint.label) || 0, verticalValueScale(barChartPoint.value)],
                [honrizontalBandScale(barChartPoint.label) || 0, verticalValueScale(barChartPoint.value) + height],
                [(honrizontalBandScale(barChartPoint.label) || 0) + honrizontalBandScale.bandwidth(), verticalValueScale(barChartPoint.value)],
                [(honrizontalBandScale(barChartPoint.label) || 0) + honrizontalBandScale.bandwidth(), verticalValueScale(barChartPoint.value) + height]];
            var xDirBoxes = Math.floor(honrizontalBandScale.bandwidth() / 10);
            var yDirBoxes = Math.floor(height / 10);
            for (var xDir = 1; xDir <= xDirBoxes; xDir++) {
                for (var yDir = 1; yDir <= yDirBoxes; yDir++) {
                    var randomX = getRandomArbitrary((honrizontalBandScale(barChartPoint.label) || 0) + 10 * (xDir - 1), (honrizontalBandScale(barChartPoint.label) || 0) + 10 * xDir);
                    var randomY = getRandomArbitrary(verticalValueScale(barChartPoint.value) + 10 * (yDir - 1), verticalValueScale(barChartPoint.value) + 10 * yDir);
                    randomPoints.push([randomX, randomY]);
                }
            }
            var delaunay = d3_delaunay_1.Delaunay.from(randomPoints);
            var iterator = delaunay.trianglePolygons();
            setPolygonPoints(Array.from(iterator));
        }
    }, [dataHunchArrayString]);
    var chooseFill = function () {
        var randomNumber = Math.round(Math.random() * 100);
        // TODO should we dynamically adjust this umber
        if (randomNumber >= 60) {
            return ['none', 0];
        }
        else {
            var representing = randomNumber % dataHunchArray.length;
            return [categoricalColorScale(dataHunchArray[representing].content), 0.5 + 0.1 * dataHunchArray[representing].confidenceLevel];
        }
    };
    var makePointArray = function (input) {
        var output = '';
        input.forEach(function (d) {
            output += d.toString();
            output += ' ';
        });
        return output;
    };
    return (dataHunchArray.length > 0 ?
        (0, jsx_runtime_1.jsx)("g", { children: polygonPoints.map(function (d, i) {
                return (0, jsx_runtime_1.jsx)("polygon", { points: makePointArray(d), fill: chooseFill()[0].toString(), strokeOpacity: 0.2, opacity: chooseFill()[1], stroke: Constants_1.DarkGray }, "polygon-".concat(i));
            }) }, void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(CategoricalIndicator);
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
