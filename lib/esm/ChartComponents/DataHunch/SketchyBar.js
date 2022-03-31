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
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useCallback, useContext, useLayoutEffect, useRef } from "react";
import * as rough from 'roughjs/bin/rough';
import { SelectionColor, DefaultSketchyOptions, HighlightColor, DataHunchColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import ShowUpvotesDownvotes from "./ShowUpvotesDownvotes";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";
var SketchyBar = function (_a) {
    var xPos = _a.xPos, yPos = _a.yPos, width = _a.width, height = _a.height, dataHunch = _a.dataHunch, highlighted = _a.highlighted, selected = _a.selected, valueScaleDomain = _a.valueScaleDomain, valueScaleRange = _a.valueScaleRange;
    var store = useContext(Store);
    var dhRef = useRef(null);
    var valueScale = useCallback(function () {
        return scaleLinear()
            .domain(JSON.parse(valueScaleDomain))
            .range(JSON.parse(valueScaleRange));
    }, [valueScaleDomain, valueScaleRange]);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            if (dataHunch.type === 'range') {
                var parsedRange = JSON.parse('[' + dataHunch.content + ']');
                var sketchyDH = rc.rectangle(xPos, yPos, width, height, DefaultSketchyOptions);
                var rangePoly = rc.polygon(([
                    [valueScale()(parsedRange[0]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height - 4],
                    [valueScale()(parsedRange[1]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height + 4]
                ]), DefaultSketchyOptions);
                drawingG.appendChild(sketchyDH);
                drawingG.appendChild(rangePoly);
            }
            else {
                var sketchyDH = rc.rectangle(xPos, yPos, width, height, DefaultSketchyOptions);
                drawingG.appendChild(sketchyDH);
            }
        }
        ;
    }, [xPos, yPos, width, height]);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll('path').attr('stroke', HighlightColor);
            }
            else if (selected) {
                select(dhRef.current).selectAll('path').attr('stroke', SelectionColor);
            }
            else {
                select(dhRef.current).selectAll('path').attr('stroke', DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return (_jsx(StyledTooltip, { dataHunch: dataHunch, childrenComponent: _jsxs("g", __assign({ display: store.needToShowPreview ? 'none' : undefined }, { children: [dataHunch.upvotes + dataHunch.downvotes > 0 ? _jsx(ShowUpvotesDownvotes, { xPos: xPos + width + (dataHunch.type === 'range' ? JSON.parse('[' + dataHunch.content + ']')[1] + 30 : 0), yPos: yPos, dataHunch: dataHunch }, void 0) : _jsx(_Fragment, {}, void 0), _jsx("g", { ref: dhRef }, void 0), _jsxs("g", { children: [_jsx("rect", { x: xPos, y: yPos, width: width, height: height, opacity: 0, fill: 'white', cursor: 'pointer', onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, onContextMenu: function (e) {
                                toVoteDH(e, store.svgWidth, store.svgHeight);
                                store.setVotingDH(dataHunch);
                            } }, void 0), dataHunch.type === 'range' ? _jsx("polygon", { points: [
                                [valueScale()((JSON.parse('[' + dataHunch.content + ']')[0])), yPos + 0.5 * height],
                                [xPos, yPos + 0.5 * height - 4],
                                [valueScale()((JSON.parse('[' + dataHunch.content + ']')[1])), yPos + 0.5 * height],
                                [xPos, yPos + 0.5 * height + 4]
                            ].toString(), opacity: 0, fill: 'white', cursor: 'pointer', onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, onContextMenu: function (e) {
                                toVoteDH(e, store.svgWidth, store.svgHeight);
                                store.setVotingDH(dataHunch);
                            } }, void 0) : _jsx(_Fragment, {}, void 0)] }, void 0)] }), void 0) }, void 0));
};
export default observer(SketchyBar);
