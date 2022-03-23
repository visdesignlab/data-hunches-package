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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Delaunay } from "d3-delaunay";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale, makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import SketchyPolygon from "./SketchyPolygon";
var CategoricalIndicator = function (_a) {
    var dataHunchArrayString = _a.dataHunchArrayString, barChartPoint = _a.barChartPoint;
    var dataSet = useContext(DataContext);
    var store = useContext(Store);
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    // const valueScale = useCallback(() => {
    //     return makeValueScale(dataSet, store.svgWidth);
    // }, [store.svgWidth]);
    // const bandScale useCallback(() => {
    //     return makeBandScale(dataSet, store.svgHeight);
    // }, [store.svgHeight]);
    var categoricalColorScale = makeCategoricalScale(dataSet);
    var _b = useState([]), polygonPoints = _b[0], setPolygonPoints = _b[1];
    var _c = useState([]), dataHunchArray = _c[0], setDataHunchArray = _c[1];
    useEffect(function () {
        var tempDataHunchArray = JSON.parse(dataHunchArrayString);
        stateUpdateWrapperUseJSON(dataHunchArray, tempDataHunchArray, setDataHunchArray);
    }, [dataHunchArrayString]);
    //seperate this part out so random points stay the same
    useLayoutEffect(function () {
        if (dataHunchArray.length > 0) {
            console.log('ran');
            var height = bandScale.bandwidth();
            var width = valueScale(barChartPoint.value) - margin.left;
            var borderWidth = 2;
            //generate random points:
            var randomPoints = [
                [margin.left + borderWidth, (bandScale(barChartPoint.label) || 0) + borderWidth],
                [margin.left + width - borderWidth, (bandScale(barChartPoint.label) || 0) + borderWidth],
                [margin.left + borderWidth, (bandScale(barChartPoint.label) || 0) + height - borderWidth],
                [margin.left + width - borderWidth, (bandScale(barChartPoint.label) || 0) + height - borderWidth]
            ];
            var xDirBoxes = width / 4;
            var yDirBoxes = height / 3;
            for (var xDir = 1; xDir <= 3; xDir++) {
                for (var yDir = 1; yDir <= 2; yDir++) {
                    var randomX = getRandomArbitrary(margin.left + xDirBoxes * xDir - borderWidth, margin.left + xDirBoxes * xDir + borderWidth);
                    var randomY = getRandomArbitrary((bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir - borderWidth, (bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir + borderWidth);
                    randomPoints.push([randomX, randomY]);
                }
            }
            // add points along the edge
            for (var xDir = 1; xDir <= 4; xDir++) {
                randomPoints.push([
                    getRandomArbitrary(margin.left + xDirBoxes * (xDir - 0.5) - borderWidth, margin.left + xDirBoxes * (xDir - 0.5) + borderWidth), (bandScale(barChartPoint.label) || 0) + borderWidth
                ], [getRandomArbitrary(margin.left + xDirBoxes * (xDir - 0.5) - borderWidth, margin.left + xDirBoxes * (xDir - 0.5) + borderWidth), (bandScale(barChartPoint.label) || 0) + height - borderWidth]);
            }
            for (var yDir = 1; yDir <= 2; yDir++) {
                randomPoints.push([
                    margin.left + borderWidth, getRandomArbitrary((bandScale(barChartPoint.label) || 0) + yDirBoxes * (yDir - 0.5) - borderWidth, (bandScale(barChartPoint.label) || 0) + yDirBoxes * (yDir - 0.5) + borderWidth)
                ], [margin.left + width - borderWidth,
                    getRandomArbitrary((bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir - borderWidth, (bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir + borderWidth)
                ]);
            }
            var delaunay = Delaunay.from(randomPoints);
            var iterator = delaunay.trianglePolygons();
            stateUpdateWrapperUseJSON(polygonPoints, Array.from(iterator), setPolygonPoints);
        }
    }, [dataHunchArray, store.svgWidth, store.svgHeight]);
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
            return [categoricalColorScale(dataHunchArray[index].content), .75 + 0.05 * dataHunchArray[index].confidenceLevel];
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
        _jsx("g", __assign({ display: store.needToShowPreview ? 'none' : undefined }, { children: polygonPoints.map(function (d, i) {
                if (i < dataHunchArray.length) {
                    return _jsx(SketchyPolygon, { dataHunch: dataHunchArray[i], highlighted: dataHunchArray[i].id === store.highlightedDH, selected: store.selectedDH.includes(dataHunchArray[i].id), points: d, opacity: chooseFill(i)[1], fill: chooseFill(i)[0].toString() }, "polygon-".concat(i));
                }
                else {
                    return _jsx("polygon", { points: makePointArray(d), fill: chooseFill(i)[0].toString(), strokeOpacity: 1, opacity: chooseFill(i)[1], strokeWidth: 0.5, stroke: 'white' }, "polygon-".concat(i));
                }
            }) }), void 0) : _jsx(_Fragment, {}, void 0));
};
export default observer(CategoricalIndicator);
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
