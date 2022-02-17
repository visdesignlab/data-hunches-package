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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DataContext } from "..";
import { makeCategoricalScale } from "../HelperFunctions/ScaleGenerator";
import { IndicatorSize } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
var ChartLegends = function () {
    var dataSet = useContext(DataContext);
    var store = useContext(Store);
    var categoricalColorScale = makeCategoricalScale(dataSet);
    return (_jsx("g", { children: store.containCategory.map(function (cat, i) {
            return (_jsxs(_Fragment, { children: [_jsx("circle", { fill: categoricalColorScale(cat), cx: store.svgWidth - 30, cy: IndicatorSize + IndicatorSize * i, r: IndicatorSize }, void 0), _jsx("text", __assign({ x: store.svgWidth - 30, y: IndicatorSize + IndicatorSize * i }, { children: cat }), void 0)] }, void 0));
        }) }, void 0));
};
export default observer(ChartLegends);
