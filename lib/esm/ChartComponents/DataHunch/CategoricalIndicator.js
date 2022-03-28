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
import { makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { DataPreset } from "../../Interfaces/Datasets";
import * as rough from 'roughjs/bin/rough';
import Store from "../../Interfaces/Store";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";
import { HighlightColor, SelectionColor } from "../../Interfaces/Constants";
var CategoricalIndicator = function (_a) {
    var dataHunch = _a.dataHunch, xPos = _a.xPos, yPos = _a.yPos, width = _a.width, height = _a.height, highlighted = _a.highlighted, selected = _a.selected, fillColor = _a.fillColor;
    var store = useContext(Store);
    var dhRef = useRef(null);
    var categoricalScale = makeCategoricalScale(DataPreset[store.dbTag].categories);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyDH = rc.rectangle(xPos, yPos, width, height, {
                fillStyle: 'zigzag',
                fill: fillColor,
                stroke: 'white',
                fillWeight: 10,
                hachureAngle: 20,
                hachureGap: 18,
                roughness: 3,
                strokeWidth: 2
            });
            drawingG.appendChild(sketchyDH);
            select(dhRef.current).selectAll("path[stroke='white']").attr('opacity', 0);
        }
    }, [xPos, yPos, width, height, fillColor]);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll("path[stroke='white'],path[stroke='".concat(SelectionColor, "']"))
                    .attr('stroke', HighlightColor)
                    .attr('opacity', 1);
            }
            else if (selected) {
                select(dhRef.current).selectAll("path[stroke='white'],path[stroke='".concat(HighlightColor, "']"))
                    .attr('stroke', SelectionColor)
                    .attr('opacity', 1);
            }
            else {
                select(dhRef.current)
                    .selectAll("path[stroke='".concat(HighlightColor, "'],path[stroke='").concat(SelectionColor, "']"))
                    .attr('stroke', 'white')
                    .attr('opacity', 0);
            }
        }
    }, [highlighted, selected]);
    return (_jsx(StyledTooltip, { dataHunch: dataHunch, childrenComponent: _jsxs("g", __assign({ display: store.needToShowPreview ? 'none' : undefined }, { children: [_jsx("g", { ref: dhRef }, void 0), _jsx("rect", { x: xPos, y: yPos, width: width, height: height, opacity: 0, fill: 'white', cursor: 'pointer', onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, onContextMenu: function (e) {
                        toVoteDH(e, store.svgWidth, store.svgHeight);
                        store.setVotingDH(dataHunch);
                    } }, void 0)] }), void 0) }, void 0));
};
export default observer(CategoricalIndicator);
