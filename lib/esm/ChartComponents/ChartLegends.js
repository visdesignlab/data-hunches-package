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
import { observer } from "mobx-react-lite";
import { useContext, useLayoutEffect, useRef } from "react";
import { DataContext } from "..";
import { makeCategoricalScale } from "../HelperFunctions/ScaleGenerator";
import { IndicatorSize } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { textwrap } from 'd3-textwrap';
import { select } from "d3-selection";
import { DataPreset } from "../Interfaces/Datasets";
var ChartLegends = function () {
    var dataSet = useContext(DataContext);
    var store = useContext(Store);
    var legendRef = useRef(null);
    var categoricalColorScale = makeCategoricalScale(DataPreset[store.dbTag].categories);
    var wrap = textwrap().bounds({ width: 100, height: (IndicatorSize + 2) * 5 }).method('tspans');
    useLayoutEffect(function () {
        if (legendRef.current !== null) {
            select(legendRef.current).selectAll('text').call(wrap);
            select(legendRef.current).selectAll('tspan').attr('alignment-baseline', 'central');
        }
    }, [legendRef, store.dbTag]);
    return (_jsx("g", __assign({ transform: "translate(0,10)", ref: legendRef }, { children: DataPreset[store.dbTag].categories.map(function (cat, i) {
            return (_jsxs("g", { children: [_jsx("circle", { fill: categoricalColorScale(cat), cx: store.svgWidth - IndicatorSize * 2 - 100, cy: IndicatorSize + 2 + (IndicatorSize + 2) * i * 4, r: IndicatorSize }, void 0), _jsx("text", __assign({ x: store.svgWidth - 100, y: IndicatorSize + 2 + (IndicatorSize + 2) * i * 4, alignmentBaseline: 'central', textAnchor: 'start' }, { children: cat }), void 0)] }, "".concat(cat, "-legend")));
        }) }), void 0));
};
export default observer(ChartLegends);
