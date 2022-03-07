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
import 'roughjs';
import * as rough from 'roughjs/bin/rough';
import { DarkGray } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
var DHIndicatorRect = function (_a) {
    var xPos = _a.xPos, yPos = _a.yPos, width = _a.width, dataHunch = _a.dataHunch;
    var store = useContext(Store);
    var dhRef = useRef(null);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyDH = rc.rectangle(xPos, yPos, width, 4, {
                stroke: DarkGray,
                roughness: 2.8,
                hachureAngle: 60,
                hachureGap: 10,
                fillWeight: 2,
                strokeWidth: 2,
            });
            drawingG.appendChild(sketchyDH);
        }
        ;
    }, [xPos, yPos, width]);
    return (_jsx(Tooltip, __assign({ title: dataHunch.reasoning }, { children: _jsx("g", { display: store.needToShowPreview ? 'none' : undefined, ref: dhRef, onMouseOver: function () { store.setSelectedDH([dataHunch.id]); store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () {
                store.setHighlightedDH(-1);
            }, cursor: 'pointer' }, void 0) }), void 0));
};
export default observer(DHIndicatorRect);