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
var d3_delaunay_1 = require("d3-delaunay");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var __1 = require("../..");
var ScaleGenerator_1 = require("../../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../../Interfaces/Constants");
var StateChecker_1 = require("../../Interfaces/StateChecker");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var SketchyPolygon_1 = __importDefault(require("./SketchyPolygon"));
var CategoricalIndicator = function (_a) {
    var dataHunchArrayString = _a.dataHunchArrayString;
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var store = (0, react_1.useContext)(Store_1.default);
    var valueScale = (0, ScaleGenerator_1.makeValueScale)(dataSet, store.svgWidth);
    var bandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgHeight);
    var categoricalColorScale = (0, ScaleGenerator_1.makeCategoricalScale)(dataSet);
    var _b = (0, react_1.useState)([]), polygonPoints = _b[0], setPolygonPoints = _b[1];
    var _c = (0, react_1.useState)([]), dataHunchArray = _c[0], setDataHunchArray = _c[1];
    (0, react_1.useEffect)(function () {
        var tempDataHunchArray = JSON.parse(dataHunchArrayString);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(dataHunchArray, tempDataHunchArray, setDataHunchArray);
    }, [dataHunchArrayString]);
    //seperate this part out so random points stay the same
    (0, react_1.useEffect)(function () {
        if (dataHunchArray.length > 0 && polygonPoints.length === 0) {
            var barChartPoint = dataSet.filter(function (dp) { return dp.label === dataHunchArray[0].label; })[0];
            var height = bandScale.bandwidth();
            var width = valueScale(barChartPoint.value) - Constants_1.margin.left;
            var borderWidth = 2;
            //generate random points:
            var randomPoints = [
                [Constants_1.margin.left + borderWidth, (bandScale(barChartPoint.label) || 0) + borderWidth],
                [Constants_1.margin.left + width - borderWidth, (bandScale(barChartPoint.label) || 0) + borderWidth],
                [Constants_1.margin.left + borderWidth, (bandScale(barChartPoint.label) || 0) + height - borderWidth],
                [Constants_1.margin.left + width - borderWidth, (bandScale(barChartPoint.label) || 0) + height - borderWidth]
            ];
            var xDirBoxes = width / 4;
            var yDirBoxes = height / 3;
            for (var xDir = 1; xDir <= 3; xDir++) {
                for (var yDir = 1; yDir <= 2; yDir++) {
                    var randomX = getRandomArbitrary(Constants_1.margin.left + xDirBoxes * xDir - borderWidth, Constants_1.margin.left + xDirBoxes * xDir + borderWidth);
                    var randomY = getRandomArbitrary((bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir - borderWidth, (bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir + borderWidth);
                    randomPoints.push([randomX, randomY]);
                }
            }
            // add points along the edge
            for (var xDir = 1; xDir <= 4; xDir++) {
                randomPoints.push([
                    getRandomArbitrary(Constants_1.margin.left + xDirBoxes * (xDir - 0.5) - borderWidth, Constants_1.margin.left + xDirBoxes * (xDir - 0.5) + borderWidth), (bandScale(barChartPoint.label) || 0) + borderWidth
                ], [getRandomArbitrary(Constants_1.margin.left + xDirBoxes * (xDir - 0.5) - borderWidth, Constants_1.margin.left + xDirBoxes * (xDir - 0.5) + borderWidth), (bandScale(barChartPoint.label) || 0) + height - borderWidth]);
            }
            for (var yDir = 1; yDir <= 2; yDir++) {
                randomPoints.push([
                    Constants_1.margin.left + borderWidth, getRandomArbitrary((bandScale(barChartPoint.label) || 0) + yDirBoxes * (yDir - 0.5) - borderWidth, (bandScale(barChartPoint.label) || 0) + yDirBoxes * (yDir - 0.5) + borderWidth)
                ], [Constants_1.margin.left + width - borderWidth,
                    getRandomArbitrary((bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir - borderWidth, (bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir + borderWidth)
                ]);
            }
            var delaunay = d3_delaunay_1.Delaunay.from(randomPoints);
            var iterator = delaunay.trianglePolygons();
            setPolygonPoints(Array.from(iterator));
        }
    }, [dataHunchArray]);
    // Random
    // const chooseFill = () => {
    //     const randomNumber = Math.round(Math.random() * 100);
    //     if (randomNumber >= 60) {
    //         return ['none', 0];
    //     }
    //     else {
    //         const representing = randomNumber % dataHunchArray.length;
    //         return [categoricalColorScale(dataHunchArray[representing].content) as string, 0.5 + 0.1 * dataHunchArray[representing].confidenceLevel];
    //     }
    // };
    var chooseFill = function (index) {
        if (index < dataHunchArray.length) {
            return [categoricalColorScale(dataHunchArray[index].content), 0.5 + 0.1 * dataHunchArray[index].confidenceLevel];
        }
        return ['none', 1];
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
        (0, jsx_runtime_1.jsx)("g", __assign({ display: store.needToShowPreview ? 'none' : undefined }, { children: polygonPoints.map(function (d, i) {
                if (i < dataHunchArray.length) {
                    return (0, jsx_runtime_1.jsx)(SketchyPolygon_1.default, { dataHunch: dataHunchArray[i], highlighted: dataHunchArray[i].id === store.highlightedDH, selected: store.selectedDH.includes(dataHunchArray[i].id), points: d, opacity: chooseFill(i)[1], fill: chooseFill(i)[0].toString() }, "polygon-".concat(i));
                }
                else {
                    return (0, jsx_runtime_1.jsx)("polygon", { points: makePointArray(d), fill: chooseFill(i)[0].toString(), strokeOpacity: 1, opacity: chooseFill(i)[1], strokeWidth: 0.5, stroke: 'white' }, "polygon-".concat(i));
                }
            }) }), void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(CategoricalIndicator);
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
