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
import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "..";
import { makeVerticalScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { DarkGray, IndicatorSize, IndicatorSpace, margin } from "../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import Store from "../Interfaces/Store";
import 'roughjs';
import SketchyBar from "./SketchyBar";
import { DHIndicatorText } from "../Interfaces/StyledComponents";
import { Tooltip } from "@material-ui/core";
var DataHunchIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    var honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    // const categoricalColorScale = makeCategoricalScale(dataSet);
    var _b = useState([]), inVisDH = _b[0], setInVisDH = _b[1];
    var _c = useState([]), offVisDH = _c[0], setOffVisDH = _c[1];
    var dhRef = useRef(null);
    useEffect(function () {
        var tempInVis = [];
        var tempOffVis = [];
        dataHunchArray.forEach(function (d) {
            if (['annotation', 'exclusion'].includes(d.type)) {
                tempOffVis.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        stateUpdateWrapperUseJSON(inVisDH, tempInVis, setInVisDH);
        stateUpdateWrapperUseJSON(offVisDH, tempOffVis, setOffVisDH);
    }, [dataHunchArray]);
    var calculateY = function (dataHunch, rangeCenter) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (rangeCenter) {
                var center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return verticalValueScale(center) - 2;
            }
            else {
                return verticalValueScale(max(parsedRange));
            }
        }
        return verticalValueScale(parseFloat(dataHunch.content));
    };
    var calculateHeight = function (dataHunch) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            return Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));
        }
        else {
            return store.svgHeight - margin.bottom - verticalValueScale(parseFloat(dataHunch.content));
        }
    };
    return (_jsxs("g", { children: [inVisDH.map(function (d, i) {
                if (parseFloat(d.content) > verticalValueScale.domain()[0]) {
                    return _jsx("rect", { cursor: 'pointer', 
                        // onMouseOver={() => { store.setHighlightedDH(d.id); }}
                        x: honrizontalBandScale(d.label), width: honrizontalBandScale.bandwidth(), y: margin.top - 5, height: 4, fill: DarkGray, opacity: 0.7 }, d.id);
                }
                if (inVisDH.length > 3) {
                    return (_jsx("rect", { cursor: 'pointer', onMouseOver: function () { store.setHighlightedDH(d.id); }, x: honrizontalBandScale(d.label), width: honrizontalBandScale.bandwidth(), y: calculateY(d, true), height: 4, fill: DarkGray, opacity: 0.7 }, d.id));
                }
                else {
                    return _jsx(SketchyBar, { xPos: (honrizontalBandScale(d.label) || 0) + (honrizontalBandScale.bandwidth() / inVisDH.length * i), yPos: calculateY(d, false), width: honrizontalBandScale.bandwidth() / inVisDH.length, height: calculateHeight(d) }, d.id);
                }
            }), offVisDH.map(function (d, i) {
                return (_jsx(Tooltip, __assign({ title: d.reasoning }, { children: _jsx(DHIndicatorText, __assign({ x: (honrizontalBandScale(d.label) || 0) + 0.5 * honrizontalBandScale.bandwidth() + (2 * IndicatorSize + IndicatorSpace) * (i % 2 === 0 ? -1 : 1), y: store.svgHeight - margin.bottom + 25 + 2 * (IndicatorSize + IndicatorSpace) * Math.floor(i / 2), fontSize: d.type === 'exclusion' ? 'small' : 'large' }, { children: d.type === 'exclusion' ? 'x' : '*' }), d.id) }), d.id));
            })] }, void 0));
};
export default observer(DataHunchIndicator);
