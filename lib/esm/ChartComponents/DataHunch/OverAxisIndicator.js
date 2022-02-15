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
import { DataContext } from "../..";
import { makeBandScale } from "../../HelperFunctions/ScaleGenerator";
import { margin, DarkGray } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DHIndicatorRect } from "../../Interfaces/StyledComponents";
import { handlePreviewOnClick, handleResetOnClick } from "../Forms/PreviewResetButtons";
var OverAxisIndicator = function (_a) {
    var dataHunch = _a.dataHunch;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    return (_jsxs("g", __assign({ cursor: 'pointer', onMouseOver: function () {
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, dataHunch.label, parseFloat(dataHunch.content), store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
        }, onMouseOut: function () {
            store.setNeedToShowPreview(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
        } }, { children: [_jsx("line", { x1: (honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), x2: (honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), stroke: DarkGray, strokeWidth: 4, y1: margin.top - 5, y2: margin.top - 20 }, void 0), _jsx("polygon", { points: "0,0 7,5 -7,5", fill: DarkGray, stroke: 'none', transform: "translate(".concat((honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), ",").concat(margin.top - 20, ")") }, void 0), _jsx(DHIndicatorRect
            // onMouseOver={() => { store.setHighlightedDH(d.id); }}
            , { 
                // onMouseOver={() => { store.setHighlightedDH(d.id); }}
                x: honrizontalBandScale(dataHunch.label) || 0, width: honrizontalBandScale.bandwidth(), y: margin.top - 5 }, void 0)] }), void 0));
};
export default observer(OverAxisIndicator);
