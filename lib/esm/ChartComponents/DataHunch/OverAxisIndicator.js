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
import { useRef } from "react";
import { useContext } from "react";
import { DataContext } from "../..";
import { makeBandScale, makeValueScale } from "../../HelperFunctions/ScaleGenerator";
import Store from "../../Interfaces/Store";
import SingleOverAxisIndicator from "./SingleOverAxisIndicator";
var OverAxisIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray, dataPoint = _a.dataPoint;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var curveRef = useRef(null);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    return (_jsxs("g", { children: [_jsx("text", __assign({ x: valueScale(dataPoint.value) + 7, y: (bandScale(dataPoint.label) || 0) + 0.75 * bandScale.bandwidth() - 2, textAnchor: "middle", fontSize: "smaller", alignmentBaseline: "hanging" }, { children: dataPoint.value }), void 0), _jsx("g", { ref: curveRef }, void 0), dataHunchArray.map(function (dataHunch, i) {
                var startingPoint = valueScale(dataPoint.value) + 10;
                return (_jsx(SingleOverAxisIndicator, { dataHunch: dataHunch, highlighted: store.highlightedDH === dataHunch.id, selected: store.selectedDH.includes(dataHunch.id), curvePoints: JSON.stringify([
                        [startingPoint, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()],
                        [startingPoint + (i + 1) * 15, (bandScale(dataPoint.label) || 0)],
                        [startingPoint + (i + 1) * 30, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]
                    ]), arrowPoints: JSON.stringify([
                        [startingPoint + (i + 1) * 30 - 8, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()],
                        [startingPoint + (i + 1) * 30 - 3, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + 5],
                        [startingPoint + (i + 1) * 30 + 2, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()]
                    ]), textX: valueScale(dataPoint.value) + 7 + (i + 1) * 30, textY: (bandScale(dataPoint.label) || 0) + 0.75 * bandScale.bandwidth() }, "overaxis".concat(dataHunch.id)));
            })] }, void 0));
};
export default observer(OverAxisIndicator);
