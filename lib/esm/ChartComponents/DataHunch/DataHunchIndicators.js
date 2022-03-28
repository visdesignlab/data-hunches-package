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
import { makeValueScale, makeBandScale, makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { IndicatorSize, LightGray, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import 'roughjs';
import SketchyBar from "./SketchyBar";
import { DHIndicatorText } from "../../Interfaces/StyledComponents";
import SingleOverAxisIndicator from "./SingleOverAxisIndicator";
import ExclusionIndicator from "./ExclusionIndicator";
import StyledTooltip from "./StyledTooltip";
import SketchyDirection from "./SketchyDirection";
import { toVoteDH } from "./UpvotesDownvotes";
import CategoricalIndicator from "./CategoricalIndicator";
import { DataPreset } from "../../Interfaces/Datasets";
var DataHunchIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray, dataPoint = _a.dataPoint;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var categoricalScale = makeCategoricalScale(DataPreset[store.dbTag].categories);
    // const [inVisDH, setInVisDH] = useState<DataHunch[]>([]);
    // const [offVisDH, setOffVisDH] = useState<DataHunch[]>([]);
    // const [exDH, setExDH] = useState<DataHunch[]>([]);
    // const [aboveAxisDH, setAboveAxisDH] = useState<DataHunch[]>([]);
    // const [directionDH, setDirectionDH] = useState<DataHunch[]>([]);
    var _b = useState({
        dataSpace: [],
        offVis: [],
        exclude: [],
        aboveAxis: [],
        direction: [],
        cat: [],
    }), dataHunchDictionary = _b[0], setDataHunchDictionary = _b[1];
    useEffect(function () {
        var tempInVis = [];
        var tempOffVis = [];
        var tempExDH = [];
        var tempDirectionDH = [];
        var tempAboveAxisDH = [];
        var tempCatDH = [];
        dataHunchArray.forEach(function (d) {
            switch (d.type) {
                case 'exclusion':
                    tempExDH.push(d);
                    break;
                case 'data space':
                    if (parseFloat(d.content) > valueScale.domain()[1]) {
                        tempAboveAxisDH.push(d);
                    }
                    else {
                        tempInVis.push(d);
                    }
                    break;
                case 'direction':
                    tempDirectionDH.push(d);
                    break;
                case 'annotation':
                case 'rating':
                    tempOffVis.push(d);
                    break;
                case 'categorical':
                    tempCatDH.push(d);
                    break;
                default:
                    tempInVis.push(d);
            }
        });
        var assemble = {
            dataSpace: tempInVis,
            offVis: tempOffVis,
            exclude: tempExDH,
            aboveAxis: tempAboveAxisDH,
            direction: tempDirectionDH,
            cat: tempCatDH,
        };
        stateUpdateWrapperUseJSON(dataHunchDictionary, assemble, setDataHunchDictionary);
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
                return valueScale(dp.value) + 10 + Math.floor(index / 2) * 40;
            }
            return valueScale(dp.value) + 10 + Math.floor(index / 2) * 90;
        }
        return 0;
    };
    var calculateText = function (dataHunchText, placement, arrayLength, type) {
        if (type === 'rating') {
            var starAmount = parseInt(dataHunchText);
            return (_jsxs("tspan", { children: ["* ", _jsx("tspan", __assign({ fontSize: 'medium' }, { children: '★'.repeat(starAmount) }), void 0), _jsx("tspan", __assign({ fontSize: 'medium', fill: LightGray, stroke: LightGray }, { children: '★'.repeat(5 - starAmount) }), void 0)] }, void 0));
        }
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
    var calculateCurvePoints = function (startingPoint, i) {
        return [
            [startingPoint, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()],
            [startingPoint + (i + 1) * 16, (bandScale(dataPoint.label) || 0)],
            [startingPoint + (i + 1) * 32, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]
        ];
    };
    var calculateArrowPoints = function (startingPoint, i) {
        return [
            [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()],
            [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + 5],
            [startingPoint + (i + 1) * 32 + 8, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]
        ];
    };
    return (_jsxs("g", { children: [dataHunchDictionary.dataSpace.map(function (d, i) {
                var arrayLength = dataHunchDictionary.dataSpace.length;
                return (_jsx(SketchyBar, { valueScaleDomain: JSON.stringify(valueScale.domain()), valueScaleRange: JSON.stringify(valueScale.range()), dataHunch: d, xPos: calculateX(d, d.type === 'range' || arrayLength > 3), yPos: (bandScale(d.label) || 0) + (arrayLength > 3 ? 0 : (bandScale.bandwidth() / arrayLength * i)), highlighted: d.id === store.highlightedDH, selected: store.selectedDH.includes(d.id), width: (d.type === 'range' || arrayLength > 3) ? 4 : calculateWidth(d), height: bandScale.bandwidth() / (arrayLength > 3 ? 1 : arrayLength) }, "".concat(d.id, "-dhindicatorSketchy")));
            }), dataHunchDictionary.direction.map(function (d, i) {
                return (_jsx(SketchyDirection, { dataHunch: d, highlighted: d.id === store.highlightedDH, selected: store.selectedDH.includes(d.id), xPos: valueScale(dataPoint.value), yPos: (bandScale(dataPoint.label) || 0) + bandScale.bandwidth() / dataHunchDictionary.direction.length * (i + 0.5) }, "sketchy-".concat(d.id)));
            }), dataHunchDictionary.aboveAxis.length > 0 ?
                _jsxs("g", { children: [_jsx("text", __assign({ x: valueScale(dataPoint.value) + 15, y: (bandScale(dataPoint.label) || 0) + 0.6 * bandScale.bandwidth(), textAnchor: "middle", fontSize: "medium", alignmentBaseline: "middle" }, { children: dataPoint.value }), void 0), dataHunchDictionary.aboveAxis.map(function (dataHunch, i) {
                            var startingPoint = valueScale(dataPoint.value);
                            return (_jsx(SingleOverAxisIndicator, { dataHunch: dataHunch, highlighted: store.highlightedDH === dataHunch.id, selected: store.selectedDH.includes(dataHunch.id), curvePoints: JSON.stringify(calculateCurvePoints(valueScale(dataPoint.value), i)), arrowPoints: JSON.stringify(calculateArrowPoints(valueScale(dataPoint.value), i)), rotateX: startingPoint + (i + 1) * 32 - 2, rotateY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth(), textX: valueScale(dataPoint.value) + 10 + (i + 1) * 32, textY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() }, "overaxis".concat(dataHunch.id)));
                        })] }, void 0)
                :
                    _jsx(_Fragment, {}, void 0), dataHunchDictionary.offVis.map(function (d, i) {
                var arrayLength = dataHunchDictionary.offVis.length;
                return (_jsx(StyledTooltip, { childrenComponent: _jsx(DHIndicatorText, __assign({ x: findXPos(d, i, arrayLength), y: (bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * IndicatorSize) * (i % 2 === 0 ? -1 : 1), fontSize: 'larger', needBold: false, isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), onClick: function () { store.setSelectedDH([d.id]); }, onMouseOver: function () { store.setHighlightedDH(d.id); }, onContextMenu: function (e) {
                            toVoteDH(e, store.svgWidth, store.svgHeight);
                            store.setVotingDH(d);
                        }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: calculateText(d.content, findXPos(d, i, arrayLength), arrayLength, d.type) }), void 0), dataHunch: d }, "".concat(d.id, "-text")));
            }), dataHunchDictionary.exclude.map(function (d, i) {
                return (_jsx(ExclusionIndicator, { dataPoint: dataPoint, highlighted: store.highlightedDH === d.id, selected: store.selectedDH.includes(d.id), dataHunch: d, centerX: valueScale(dataPoint.value) - 20 - i * 10, centerY: (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth(), bandWidth: bandScale.bandwidth() }, "exclusion-".concat(d.id)));
            }), store.showCategory ? dataHunchDictionary.cat.map(function (d, i) {
                var catWidth = (valueScale(dataPoint.value) - margin.left - 40) / DataPreset[store.dbTag].categories.length;
                return (_jsx(CategoricalIndicator, { highlighted: store.highlightedDH === d.id, selected: store.selectedDH.includes(d.id), xPos: valueScale(dataPoint.value) - 40 - (i + 1) * catWidth, yPos: (bandScale(dataPoint.label) || 0) + 3, width: catWidth, height: bandScale.bandwidth() - 6, fillColor: categoricalScale(d.content), dataHunch: d }, "cat-".concat(d.id)));
            }) : _jsx(_Fragment, {}, void 0)] }, void 0));
};
export default observer(DataHunchIndicator);
