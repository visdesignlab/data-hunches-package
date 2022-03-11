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
var SketchyPolygon = function (_a) {
    var dataHunch = _a.dataHunch, points = _a.points, fill = _a.fill, opacity = _a.opacity;
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
                fillStyle: 'solid',
                roughness: 2,
                hachureAngle: 60,
                hachureGap: 10,
                fillWeight: 1,
                strokeWidth: 1,
            });
            drawingG.appendChild(sketchyDH);
        }
    }, [points, fill]);
    return (_jsx(Tooltip, __assign({ title: dataHunch.reasoning }, { children: _jsx("g", { ref: dhRef, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, opacity: opacity, cursor: 'pointer' }, void 0) }), void 0));
};
export default observer(SketchyPolygon);
