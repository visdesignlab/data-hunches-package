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
import { useContext } from "react";
import { DataContext } from "..";
import { makeCategoricalScale } from "../HelperFunctions/ScaleGenerator";
import { DataPreset, IndicatorSize } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
var ChartLegends = function () {
    var dataSet = useContext(DataContext);
    var store = useContext(Store);
    var categoricalColorScale = makeCategoricalScale(dataSet);
    return (_jsx("g", __assign({ transform: "translate(0,10)" }, { children: DataPreset[store.dbTag].categories.map(function (cat, i) {
            return (_jsxs("g", { children: [_jsx("circle", { fill: categoricalColorScale(cat), cx: store.svgWidth - IndicatorSize * 2, cy: IndicatorSize + 2 + (IndicatorSize + 2) * i * 2, r: IndicatorSize }, void 0), _jsx("text", __assign({ x: store.svgWidth - IndicatorSize * 4, y: IndicatorSize + 2 + (IndicatorSize + 2) * i * 2, alignmentBaseline: 'central', textAnchor: 'end' }, { children: cat }), void 0)] }, "".concat(cat, "-legend")));
        }) }), void 0));
};
export default observer(ChartLegends);
