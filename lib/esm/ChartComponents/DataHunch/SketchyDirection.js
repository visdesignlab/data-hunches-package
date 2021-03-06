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
import { useContext, useLayoutEffect, useRef } from "react";
import Store from "../../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import StyledTooltip from "./StyledTooltip";
import { select } from "d3-selection";
import { HighlightColor, SelectionColor, DataHunchColor, DefaultSketchyOptions } from "../../Interfaces/Constants";
import { toVoteDH } from "./UpvotesDownvotes";
import ShowUpvotesDownvotes from "./ShowUpvotesDownvotes";
var SketchyDirection = function (_a) {
    var dataHunch = _a.dataHunch, xPos = _a.xPos, yPos = _a.yPos, highlighted = _a.highlighted, selected = _a.selected;
    var store = useContext(Store);
    var dhRef = useRef(null);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyLine = rc.line(xPos, yPos, dataHunch.content === 'higher' ? xPos + 14 : xPos - 14, yPos, DefaultSketchyOptions);
            drawingG.appendChild(sketchyLine);
            var sketchyArrow = rc.polygon([
                [dataHunch.content === 'higher' ? xPos + 14 : xPos - 14, yPos - 7],
                [dataHunch.content === 'higher' ? xPos + 14 : xPos - 14, yPos + 7],
                [dataHunch.content === 'higher' ? xPos + 21 : xPos - 21, yPos]
            ], __assign(__assign({}, DefaultSketchyOptions), { fillStyle: 'solid' }));
            drawingG.appendChild(sketchyArrow);
        }
    }, [xPos, yPos]);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll('path').attr('stroke', HighlightColor).attr('fill', HighlightColor);
            }
            else if (selected) {
                select(dhRef.current).selectAll('path').attr('stroke', SelectionColor).attr('fill', SelectionColor);
            }
            else {
                select(dhRef.current).selectAll('path').attr('stroke', DataHunchColor).attr('fill', DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return (_jsx(StyledTooltip, { dataHunch: dataHunch, childrenComponent: _jsxs("g", __assign({ display: store.needToShowPreview ? 'none' : undefined }, { children: [dataHunch.upvotes + dataHunch.downvotes > 0 ? _jsx(ShowUpvotesDownvotes, { xPos: xPos + 16, yPos: yPos - 7, dataHunch: dataHunch }, void 0) : _jsx(_Fragment, {}, void 0), _jsx("g", { ref: dhRef, cursor: 'pointer', onContextMenu: function (e) {
                        toVoteDH(e, store.svgWidth, store.svgHeight);
                        store.setVotingDH(dataHunch);
                    }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, void 0)] }), void 0) }, void 0));
};
export default observer(SketchyDirection);
