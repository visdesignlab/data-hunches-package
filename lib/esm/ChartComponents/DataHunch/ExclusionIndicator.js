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
import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import { useLayoutEffect } from "react";
import { DataContext } from "../..";
import Store from "../../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { select } from "d3-selection";
import { DarkGray, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";
var ExclusionIndicator = function (_a) {
    var dataHunch = _a.dataHunch, dataPoint = _a.dataPoint, centerX = _a.centerX, centerY = _a.centerY, bandWidth = _a.bandWidth, highlighted = _a.highlighted, selected = _a.selected;
    var dhRef = useRef(null);
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var firstLine = rc.line(centerX - 20, centerY - 0.5 * bandWidth, centerX + 20, centerY + 0.5 * bandWidth, DefaultSketchyOptions);
            var secondLine = rc.line(centerX - 20, centerY + 0.5 * bandWidth, centerX + 20, centerY - 0.5 * bandWidth, DefaultSketchyOptions);
            drawingG.appendChild(firstLine);
            drawingG.appendChild(secondLine);
        }
    }, [centerX, centerY]);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll('path').attr('stroke', HighlightColor);
            }
            else if (selected) {
                select(dhRef.current).selectAll('path').attr('stroke', SelectionColor);
            }
            else {
                select(dhRef.current).selectAll('path').attr('stroke', DarkGray);
            }
        }
    }, [highlighted, selected]);
    return (_jsx(Tooltip, __assign({ title: dataHunch.reasoning }, { children: _jsx("g", { ref: dhRef, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () {
                store.setHighlightedDH(-1);
            }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, cursor: 'pointer' }, void 0) }), void 0));
};
export default observer(ExclusionIndicator);