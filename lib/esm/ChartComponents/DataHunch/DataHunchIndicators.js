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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { max } from "d3-array";
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
import { Tooltip } from "@material-ui/core";
import OverAxisIndicator from "./OverAxisIndicator";
import DHIndicatorRect from "./DHIndicatorRect";
var DataHunchIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    // const categoricalColorScale = makeCategoricalScale(dataSet);
    var _b = useState([]), inVisDH = _b[0], setInVisDH = _b[1];
    var _c = useState([]), offVisDH = _c[0], setOffVisDH = _c[1];
    var _d = useState([]), exDH = _d[0], setExDH = _d[1];
    useEffect(function () {
        var tempInVis = [];
        var tempOffVis = [];
        var tempExDH = [];
        dataHunchArray.forEach(function (d) {
            if (['annotation', 'categorical'].includes(d.type)) {
                tempOffVis.push(d);
            }
            else if (d.type === 'exclusion') {
                tempExDH.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        stateUpdateWrapperUseJSON(inVisDH, tempInVis, setInVisDH);
        stateUpdateWrapperUseJSON(offVisDH, tempOffVis, setOffVisDH);
        stateUpdateWrapperUseJSON(exDH, tempExDH, setExDH);
    }, [dataHunchArray]);
    var calculateX = function (dataHunch, rangeCenter) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (rangeCenter) {
                var center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return valueScale(center) - 2;
            }
            else {
                return valueScale(max(parsedRange));
            }
        }
        return valueScale(parseFloat(dataHunch.content));
    };
    var calculateWidth = function (dataHunch) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            return Math.abs(valueScale(parsedRange[0]) - valueScale(parsedRange[1]));
        }
        else {
            return store.svgHeight - margin.bottom - valueScale(parseFloat(dataHunch.content));
        }
    };
    var findXPos = function (dataHunch) {
        var findDP = dataSet.filter(function (d) { return d.label === dataHunch.label; });
        if (findDP.length > 0) {
            var dp = findDP[0];
            return valueScale(dp.value);
        }
        return 0;
    };
    return (_jsxs("g", { children: [inVisDH.map(function (d, i) {
                if (parseFloat(d.content) > valueScale.domain()[1]) {
                    return _jsx(OverAxisIndicator, { dataHunch: d }, "".concat(d.id, "-overaxis"));
                }
                if (inVisDH.length > 3) {
                    return (_jsx(DHIndicatorRect, { dataHunch: d, xPos: calculateX(d, true), height: bandScale.bandwidth(), yPos: bandScale(d.label) || 0 }, "".concat(d.id, "-dhindicatorRect")));
                }
                else {
                    return (_jsx(SketchyBar, { dataHunch: d, xPos: calculateX(d, false), yPos: (bandScale(d.label) || 0) + bandScale.bandwidth() / inVisDH.length * i, width: calculateWidth(d), height: bandScale.bandwidth() / inVisDH.length }, "".concat(d.id, "-dhindicatorSketchy")));
                }
            }), offVisDH.map(function (d, i) {
                return (_jsx(Tooltip, __assign({ title: d.reasoning }, { children: _jsx(DHIndicatorText, __assign({ x: findXPos(d), y: (bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * IndicatorSize) * (i % 2 === 0 ? -1 : 1), fontSize: 'larger', isHighlighted: d.id === store.highlightedDH, onMouseOver: function () { store.setHighlightedDH(d.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: "* ".concat(d.content) }), "".concat(d.id, "-text")) }), void 0));
            }), exDH.map(function (d, i) {
                return (_jsx(Tooltip, __assign({ title: d.reasoning }, { children: _jsx(DHIndicatorText, { isHighlighted: d.id === store.highlightedDH, fontSize: 'small' }, "".concat(d.id, "-text")) }), void 0));
            })] }, void 0));
};
export default observer(DataHunchIndicator);
