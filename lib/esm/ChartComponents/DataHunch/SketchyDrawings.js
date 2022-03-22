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
import { useContext, useLayoutEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import Store from "../../Interfaces/Store";
import { select } from "d3-selection";
import * as rough from 'roughjs/bin/rough';
import { DataHunchColor, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import { line } from "d3-shape";
var SketchyDrawings = function (_a) {
    var dataHunch = _a.dataHunch, highlighted = _a.highlighted, selected = _a.selected;
    var store = useContext(Store);
    var dhRef = useRef(null);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).select('*').remove();
            var drawingG_1 = dhRef.current;
            var rc_1 = rough.default.svg(drawingG_1);
            var decodeSketch = JSON.parse(dataHunch.content);
            decodeSketch.forEach(function (path) {
                var sketchyPath = rc_1.path(line()(path) || '', __assign(__assign({}, DefaultSketchyOptions), { fillStyle: 'hachure', fill: 'none' }));
                drawingG_1.appendChild(sketchyPath);
            });
        }
    }, [dataHunch]);
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
    return (_jsx("g", { ref: dhRef, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () {
            store.setHighlightedDH(-1);
        }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, cursor: 'pointer' }, void 0));
};
export default observer(SketchyDrawings);