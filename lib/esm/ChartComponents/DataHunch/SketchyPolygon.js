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
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useLayoutEffect, useRef } from "react";
import Store from "../../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { HighlightColor, SelectionColor } from "../../Interfaces/Constants";
var SketchyPolygon = function (_a) {
    var dataHunch = _a.dataHunch, points = _a.points, fill = _a.fill, opacity = _a.opacity, highlighted = _a.highlighted, selected = _a.selected;
    var dhRef = useRef(null);
    var store = useContext(Store);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyDH = rc.polygon((points), {
                fill: fill,
                stroke: 'white',
                fillStyle: 'zigzag',
                roughness: 2,
                hachureAngle: 5,
                hachureGap: 5,
                fillWeight: 2,
                strokeWidth: 1,
            });
            drawingG.appendChild(sketchyDH);
        }
    }, [points, fill]);
    // "rect[col='2']"
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll("path[stroke='white'],path[stroke='#eb9800']").attr('stroke', HighlightColor);
            }
            else if (selected) {
                select(dhRef.current).selectAll("path[stroke='white'],path[stroke='#eb0053']").attr('stroke', SelectionColor);
            }
            else {
                select(dhRef.current).selectAll("path[stroke='#eb9800'],path[stroke='#eb0053']").attr('stroke', "white");
            }
        }
    }, [highlighted, selected]);
    return (_jsx(Tooltip, __assign({ title: dataHunch.reasoning }, { children: _jsx("g", { ref: dhRef, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, opacity: opacity, 
            // opacity={1}
            cursor: 'pointer' }, void 0) }), void 0));
};
export default observer(SketchyPolygon);
