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
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useLayoutEffect, useRef } from "react";
import { DataHunchColor, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { LightTooltip } from "../../Interfaces/StyledComponents";
var SingleOverAxisIndicator = function (_a) {
    var textX = _a.textX, textY = _a.textY, dataHunch = _a.dataHunch, curvePoints = _a.curvePoints, highlighted = _a.highlighted, selected = _a.selected, arrowPoints = _a.arrowPoints;
    var curveRef = useRef(null);
    var store = useContext(Store);
    useLayoutEffect(function () {
        if (curveRef.current !== null) {
            select(curveRef.current).selectAll('*').remove();
            var drawingG = curveRef.current;
            var rc = rough.default.svg(drawingG);
            var roughCurve = rc.curve(JSON.parse(curvePoints), __assign(__assign({}, DefaultSketchyOptions), { fillStyle: 'hachure', fill: 'none' }));
            var roughArrow = rc.polygon(JSON.parse(arrowPoints), __assign(__assign({}, DefaultSketchyOptions), { fillStyle: 'solid' }));
            drawingG.appendChild(roughCurve);
            drawingG.appendChild(roughArrow);
        }
    }, [arrowPoints, curvePoints]);
    useLayoutEffect(function () {
        if (curveRef.current !== null) {
            if (highlighted) {
                select(curveRef.current).selectAll('path').attr('stroke', HighlightColor);
            }
            else if (selected) {
                select(curveRef.current).selectAll('path').attr('stroke', SelectionColor);
            }
            else {
                select(curveRef.current).selectAll('path').attr('stroke', DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return (_jsx(LightTooltip, __assign({ title: dataHunch.reasoning }, { children: _jsxs("g", __assign({ cursor: "pointer", onClick: function () { store.setSelectedDH([dataHunch.id]); }, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: [_jsx("g", { ref: curveRef }, void 0), _jsx("text", __assign({ textAnchor: "middle", alignmentBaseline: "hanging", fill: highlighted ? HighlightColor : (selected ? SelectionColor : DataHunchColor), x: textX, y: textY, fontFamily: "'Nanum Brush Script', cursive", fontWeight: "bold" }, { children: dataHunch.content }), void 0)] }), void 0) }), void 0));
};
export default observer(SingleOverAxisIndicator);
