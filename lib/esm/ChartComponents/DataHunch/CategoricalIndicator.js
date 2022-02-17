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
            var barChartPoint_1 = dataSet.filter(function (dp) { return dp.label === dataHunchArray[0].label; })[0];
            var height_1 = store.svgHeight - margin.bottom - verticalValueScale(barChartPoint_1.value);
            var generateX = function () {
                return getRandomArbitrary((honrizontalBandScale(barChartPoint_1.label) || 0) + honrizontalBandScale.bandwidth() * 0.05, (honrizontalBandScale(barChartPoint_1.label) || 0) + honrizontalBandScale.bandwidth() * 0.95);
            };
            var generateY = function () {
                return getRandomArbitrary(verticalValueScale(barChartPoint_1.value) + height_1 * 0.05, verticalValueScale(barChartPoint_1.value) + height_1 * 0.95);
            };
            //generate random points:
            var randomPoints = [[honrizontalBandScale(barChartPoint_1.label) || 0, verticalValueScale(barChartPoint_1.value)],
                [honrizontalBandScale(barChartPoint_1.label) || 0, verticalValueScale(barChartPoint_1.value) + height_1],
                [(honrizontalBandScale(barChartPoint_1.label) || 0) + honrizontalBandScale.bandwidth(), verticalValueScale(barChartPoint_1.value)],
                [(honrizontalBandScale(barChartPoint_1.label) || 0) + honrizontalBandScale.bandwidth(), verticalValueScale(barChartPoint_1.value) + height_1]];
            for (var time = 0; time < 50; time++) {
                randomPoints.push([generateX(), generateY()]);
            }
            var delaunay = Delaunay.from(randomPoints);
            var iterator = delaunay.trianglePolygons();
            setPolygonPoints(Array.from(iterator));
        }
    }, [dataHunchArrayString]);
    var chooseFill = function () {
        var randomNumber = Math.round(Math.random() * 100);
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
        _jsx("g", { children: polygonPoints.map(function (d) {
                return _jsx("polygon", { points: makePointArray(d), fill: chooseFill()[0].toString(), strokeOpacity: 0.2, opacity: chooseFill()[1], stroke: DarkGray }, void 0);
            }) }, void 0) : _jsx(_Fragment, {}, void 0));
};
export default observer(CategoricalIndicator);
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
