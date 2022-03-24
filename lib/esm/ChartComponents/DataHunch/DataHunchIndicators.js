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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { min } from "d3-array";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale } from "../../HelperFunctions/ScaleGenerator";
import { IndicatorSize, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import 'roughjs';
import SketchyBar from "./SketchyBar";
import { DHIndicatorText } from "../../Interfaces/StyledComponents";
import SingleOverAxisIndicator from "./SingleOverAxisIndicator";
import ExclusionIndicator from "./ExclusionIndicator";
import StyledTooltip from "./StyledTooltip";
var DataHunchIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray, dataPoint = _a.dataPoint;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    //   const caseScale = useCallback(() => {
    // return CaseScaleGenerator(caseMax);
    // }, [caseMax]);
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var _b = useState([]), inVisDH = _b[0], setInVisDH = _b[1];
    var _c = useState([]), offVisDH = _c[0], setOffVisDH = _c[1];
    var _d = useState([]), exDH = _d[0], setExDH = _d[1];
    var _e = useState([]), aboveAxisDH = _e[0], setAboveAxisDH = _e[1];
    useEffect(function () {
        var tempInVis = [];
        var tempOffVis = [];
        var tempExDH = [];
        var tempAboveAxisDH = [];
        dataHunchArray.forEach(function (d) {
            if (['annotation', 'categorical', 'direction'].includes(d.type)) {
                tempOffVis.push(d);
            }
            else if (d.type === 'exclusion') {
                tempExDH.push(d);
            }
            else if (d.type === 'data space' && parseFloat(d.content) > valueScale.domain()[1]) {
                tempAboveAxisDH.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        stateUpdateWrapperUseJSON(inVisDH, tempInVis, setInVisDH);
        stateUpdateWrapperUseJSON(offVisDH, tempOffVis, setOffVisDH);
        stateUpdateWrapperUseJSON(exDH, tempExDH, setExDH);
        stateUpdateWrapperUseJSON(aboveAxisDH, tempAboveAxisDH, setAboveAxisDH);
    }, [dataHunchArray]);
    var calculateX = function (dataHunch, condensed) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (condensed) {
                var center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return valueScale(center) - 2;
            }
            else {
                return valueScale(min(parsedRange));
            }
        }
        if (condensed) {
            return valueScale(parseFloat(dataHunch.content));
        }
        return margin.left;
    };
    var calculateWidth = function (dataHunch) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            return Math.abs(valueScale(parsedRange[0]) - valueScale(parsedRange[1]));
        }
        else {
            return valueScale(parseFloat(dataHunch.content)) - margin.left;
        }
    };
    var findXPos = function (dataHunch, index, arrayLength) {
        var findDP = dataSet.filter(function (d) { return d.label === dataHunch.label; });
        if (findDP.length > 0) {
            var dp = findDP[0];
            if (valueScale(dp.value) >= (store.svgWidth - margin.right - margin.left)) {
                return valueScale(dp.value) + Math.floor(index / 2) * 40;
            }
            return valueScale(dp.value) + Math.floor(index / 2) * 90;
        }
        return 0;
    };
    var calculateText = function (dataHunchText, placement, arrayLength) {
        if (placement >= (store.svgWidth - margin.right - margin.left)) {
            if (arrayLength <= 2) {
                return "* ".concat(dataHunchText.slice(0, 15)).concat(dataHunchText.length > 15 ? '...' : '');
            }
            return "* ".concat(dataHunchText.slice(0, 3), "...");
        }
        if (arrayLength <= 2) {
            return "* ".concat(dataHunchText);
        }
        return "* ".concat(dataHunchText.slice(0, 10)).concat(dataHunchText.length > 10 ? '...' : '');
    };
    return (_jsxs("g", { children: [inVisDH.map(function (d, i) {
                return (_jsx(SketchyBar, { valueScaleDomain: JSON.stringify(valueScale.domain()), valueScaleRange: JSON.stringify(valueScale.range()), dataHunch: d, xPos: calculateX(d, d.type === 'range' || inVisDH.length > 3), yPos: (bandScale(d.label) || 0) + (inVisDH.length > 3 ? 0 : (bandScale.bandwidth() / inVisDH.length * i)), highlighted: d.id === store.highlightedDH, selected: store.selectedDH.includes(d.id), width: (d.type === 'range' || inVisDH.length > 3) ? 4 : calculateWidth(d), height: bandScale.bandwidth() / (inVisDH.length > 3 ? 1 : inVisDH.length) }, "".concat(d.id, "-dhindicatorSketchy")));
            }), aboveAxisDH.length > 0 ?
                _jsxs("g", { children: [_jsx("text", __assign({ x: valueScale(dataPoint.value) + 15, y: (bandScale(dataPoint.label) || 0) + 0.6 * bandScale.bandwidth(), textAnchor: "middle", fontSize: "medium", alignmentBaseline: "middle" }, { children: dataPoint.value }), void 0), aboveAxisDH.map(function (dataHunch, i) {
                            var startingPoint = valueScale(dataPoint.value);
                            return (_jsx(SingleOverAxisIndicator, { dataHunch: dataHunch, highlighted: store.highlightedDH === dataHunch.id, selected: store.selectedDH.includes(dataHunch.id), curvePoints: JSON.stringify([
                                    [startingPoint, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()],
                                    [startingPoint + (i + 1) * 16, (bandScale(dataPoint.label) || 0)],
                                    [startingPoint + (i + 1) * 32, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]
                                ]), arrowPoints: JSON.stringify([
                                    [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()],
                                    [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + 5],
                                    [startingPoint + (i + 1) * 32 + 8, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]
                                ]), rotateX: startingPoint + (i + 1) * 32 - 2, rotateY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth(), textX: valueScale(dataPoint.value) + 10 + (i + 1) * 32, textY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() }, "overaxis".concat(dataHunch.id)));
                        })] }, void 0)
                :
                    _jsx(_Fragment, {}, void 0), offVisDH.map(function (d, i) {
                return (_jsx(StyledTooltip, { childrenComponent: _jsx(DHIndicatorText, __assign({ x: findXPos(d, i, offVisDH.length), y: (bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * IndicatorSize) * (i % 2 === 0 ? -1 : 1), fontSize: 'larger', needBold: false, isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), onClick: function () { store.setSelectedDH([d.id]); }, onMouseOver: function () { store.setHighlightedDH(d.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: calculateText(d.content, findXPos(d, i, offVisDH.length), offVisDH.length) }), void 0), dataHunch: d }, "".concat(d.id, "-text")));
            }), exDH.map(function (d, i) {
                return (_jsx(ExclusionIndicator, { dataPoint: dataPoint, highlighted: store.highlightedDH === d.id, selected: store.selectedDH.includes(d.id), dataHunch: d, centerX: valueScale(dataPoint.value) - 20 - i * 10, centerY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth(), bandWidth: bandScale.bandwidth() }, void 0));
            })] }, void 0));
};
export default observer(DataHunchIndicator);
