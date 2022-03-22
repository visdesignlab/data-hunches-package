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
import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { LightGray } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { drag as d3dragg } from 'd3-drag';
import { line } from "d3-shape";
var SketchLayer = function (_a) {
    var sendManipulation = _a.sendManipulation;
    var store = useContext(Store);
    var sketchResult = [];
    var currentPath = [];
    var rectRef = useRef(null);
    var currentDrawing = useRef(null);
    var drag = function (e) {
        currentPath.push(pointer(e, select(currentDrawing.current).node()));
        if (currentDrawing.current) {
            select(currentDrawing.current)
                .attr('d', generatePath(currentPath));
        }
    };
    var dragStart = function () {
        currentPath = [];
    };
    var dragEnd = function () {
        var newSetPath = currentPath.filter(function (_d, i) { return i % 3 === 0; });
        sketchResult.push(newSetPath);
        select('#existing-path').selectAll('path')
            .data(sketchResult)
            .join('path')
            .attr('d', function (d) { return generatePath(d); })
            .attr('stroke', 'black')
            .attr('fill', 'none');
        sendManipulation(JSON.stringify(sketchResult));
    };
    var generatePath = function (points) {
        return line()(points);
    };
    useEffect(function () {
        if (currentDrawing.current) {
            select(currentDrawing.current)
                .attr('d', generatePath(currentPath));
        }
    }, [currentPath]);
    useLayoutEffect(function () {
        sketchResult = [];
        if (rectRef.current) {
            select(rectRef.current)
                .call(d3dragg()
                .on("start", dragStart)
                .on("drag", drag)
                .on("end", dragEnd));
        }
    }, [rectRef]);
    return (_jsxs("g", __assign({ id: 'dragging-layer', display: store.inputMode === 'sketch' ? undefined : 'none' }, { children: [_jsx("rect", { ref: rectRef, x: 0, y: 0, fill: LightGray, opacity: 0.2, width: store.svgWidth, height: store.svgHeight }, void 0), _jsxs("g", { children: [_jsx("g", { id: 'existing-path' }, void 0), _jsx("path", { ref: currentDrawing, fill: 'none', stroke: 'black' }, void 0)] }, void 0)] }), void 0));
};
export default observer(SketchLayer);
