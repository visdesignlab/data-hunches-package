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
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";
var SingleOverAxisIndicator = function (_a) {
    var textX = _a.textX, textY = _a.textY, dataHunch = _a.dataHunch, curvePoints = _a.curvePoints, highlighted = _a.highlighted, selected = _a.selected, arrowPoints = _a.arrowPoints, rotateX = _a.rotateX, rotateY = _a.rotateY;
    var curveRef = useRef(null);
    var arrowRef = useRef(null);
    var store = useContext(Store);
    useLayoutEffect(function () {
        if (curveRef.current !== null && arrowRef.current !== null) {
            select(curveRef.current).selectAll('*').remove();
            select(arrowRef.current).selectAll('*').remove();
            var drawingG = curveRef.current;
            var arrowG = arrowRef.current;
            var rc = rough.default.svg(drawingG);
            var arrowRC = rough.default.svg(arrowG);
            var roughCurve = rc.curve(JSON.parse(curvePoints), __assign(__assign({}, DefaultSketchyOptions), { fillStyle: 'hachure', fill: 'none' }));
            var roughArrow = arrowRC.polygon(JSON.parse(arrowPoints), __assign(__assign({}, DefaultSketchyOptions), { fillStyle: 'solid' }));
            drawingG.appendChild(roughCurve);
            arrowG.appendChild(roughArrow);
        }
    }, [arrowPoints, curvePoints]);
    useLayoutEffect(function () {
        if (curveRef.current !== null && arrowRef.current !== null) {
            if (highlighted) {
                select(curveRef.current).selectAll('path').attr('stroke', HighlightColor);
                select(arrowRef.current).selectAll('path').attr('stroke', HighlightColor).attr('fill', HighlightColor);
            }
            else if (selected) {
                select(curveRef.current).selectAll('path').attr('stroke', SelectionColor);
                select(arrowRef.current).selectAll('path').attr('stroke', SelectionColor).attr('fill', SelectionColor);
            }
            else {
                select(curveRef.current).selectAll('path').attr('stroke', DataHunchColor);
                select(arrowRef.current).selectAll('path').attr('stroke', DataHunchColor).attr('fill', DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return (_jsx(StyledTooltip, { childrenComponent: _jsxs("g", __assign({ cursor: "pointer", onClick: function () { store.setSelectedDH([dataHunch.id]); }, onContextMenu: function (e) {
                toVoteDH(e, store.svgWidth, store.svgHeight, true);
                store.setVotingDH(dataHunch);
            }, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: [_jsx("g", { ref: curveRef }, void 0), _jsx("g", { ref: arrowRef, transform: "rotate(45,".concat(rotateX, ",").concat(rotateY, ")") }, void 0), _jsx("text", __assign({ textAnchor: "start", alignmentBaseline: "hanging", fill: highlighted ? HighlightColor : (selected ? SelectionColor : DataHunchColor), x: textX, y: textY, fontFamily: "'Nanum Brush Script', cursive", fontWeight: "bold" }, { children: dataHunch.content }), void 0)] }), void 0), dataHunch: dataHunch }, void 0));
};
export default observer(SingleOverAxisIndicator);
