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
import { Tooltip } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../..";
import { handlePreviewOnClick, handleResetOnClick } from "../../HelperFunctions/PreviewReset";
import { makeBandScale } from "../../HelperFunctions/ScaleGenerator";
import { margin, DarkGray } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DHIndicatorRect } from "../../Interfaces/StyledComponents";
var OverAxisIndicator = function (_a) {
    var dataHunch = _a.dataHunch;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var _b = useState(false), needReset = _b[0], setNeedReset = _b[1];
    var honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    useEffect(function () {
        if (store.selectedDH === dataHunch.id) {
            store.setNeedToShowPreview(true);
            setNeedReset(true);
            handlePreviewOnClick(dataSet, dataHunch.label, parseFloat(dataHunch.content), store.svgHeight, store.svgWidth, store.containCategory);
        }
        else if (store.selectedDH !== dataHunch.id && needReset) {
            store.setNeedToShowPreview(false);
            setNeedReset(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
        }
    }, [store.selectedDH]);
    return (_jsx(Tooltip, __assign({ title: dataHunch.reasoning }, { children: _jsxs("g", __assign({ cursor: 'pointer', onMouseOver: function () {
                store.setSelectedDH(dataHunch.id);
                store.setHighlightedDH(dataHunch.id);
            }, onMouseOut: function () {
                store.setSelectedDH(-1);
                store.setHighlightedDH(-1);
            } }, { children: [_jsx("line", { x1: (honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), x2: (honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), stroke: DarkGray, strokeWidth: 4, y1: margin.top - 5, y2: margin.top - 20 }, void 0), _jsx("polygon", { points: "0,0 7,5 -7,5", fill: DarkGray, stroke: 'none', transform: "translate(".concat((honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), ",").concat(margin.top - 20, ")") }, void 0), _jsx(DHIndicatorRect, { x: honrizontalBandScale(dataHunch.label) || 0, width: honrizontalBandScale.bandwidth(), y: margin.top - 5 }, void 0)] }), void 0) }), void 0));
};
export default observer(OverAxisIndicator);
