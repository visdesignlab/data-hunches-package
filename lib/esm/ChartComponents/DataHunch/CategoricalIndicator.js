import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Delaunay } from "d3-delaunay";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../..";
import { makeVerticalScale, makeBandScale, makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { DarkGray, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
var CategoricalIndicator = function (_a) {
    var dataHunchArrayString = _a.dataHunchArrayString;
    var dataSet = useContext(DataContext);
    var store = useContext(Store);
    var verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    var honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    var categoricalColorScale = makeCategoricalScale(dataSet);
    var _b = useState([]), polygonPoints = _b[0], setPolygonPoints = _b[1];
    var _c = useState([]), dataHunchArray = _c[0], setDataHunchArray = _c[1];
    useEffect(function () {
        var tempDataHunchArray = JSON.parse(dataHunchArrayString);
        stateUpdateWrapperUseJSON(dataHunchArray, tempDataHunchArray, setDataHunchArray);
        if (dataHunchArray.length > 0) {
            var barChartPoint = dataSet.filter(function (dp) { return dp.label === dataHunchArray[0].label; })[0];
            var height = store.svgHeight - margin.bottom - verticalValueScale(barChartPoint.value);
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
            var delaunay = Delaunay.from(randomPoints);
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
        _jsx("g", { children: polygonPoints.map(function (d, i) {
                return _jsx("polygon", { points: makePointArray(d), fill: chooseFill()[0].toString(), strokeOpacity: 0.2, opacity: chooseFill()[1], stroke: DarkGray }, "polygon-".concat(i));
            }) }, void 0) : _jsx(_Fragment, {}, void 0));
};
export default observer(CategoricalIndicator);
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
