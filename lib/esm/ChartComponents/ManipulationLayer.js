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
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { DataContext } from "..";
import { makeValueScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { SelectionColor, DefaultSketchyOptions, LightGray, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { now } from 'd3-timer';
var ManipulationLayer = function (_a) {
    var sendManipulation = _a.sendManipulation;
    var store = useContext(Store);
    var _b = useState(false), isMouseDown = _b[0], setIsMouseDown = _b[1];
    var timer0 = null;
    var resultRef = useRef(null);
    var dataSet = useContext(DataContext);
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var sketchyOption = __assign(__assign({}, DefaultSketchyOptions), { fill: SelectionColor, stroke: SelectionColor, fillWeight: 3 });
    var dragHandler = function (e) {
        if (isMouseDown) {
            var xPos = pointer(e)[0];
            if (resultRef.current !== null && ((now() - (timer0 || 0)) > 50)) {
                select(resultRef.current).selectAll('*').remove();
                var drawingG = resultRef.current;
                var rc = rough.default.svg(drawingG);
                var sketchyRec = rc.rectangle(margin.left, bandScale(store.selectedDP || '') || 0, xPos - margin.left, bandScale.bandwidth(), sketchyOption);
                drawingG.appendChild(sketchyRec);
                timer0 = now();
            }
        }
    };
    var mouseUpHandler = function (e) {
        setIsMouseDown(false);
        var manipulationResult;
        var pointerEndX = pointer(e)[0];
        manipulationResult = valueScale.invert(pointerEndX).toFixed(2).toString();
        // [valueScale.invert(min([pointerEndX, pointerStartX]) || 0).toFixed(2), valueScale.invert(max([pointerEndX, pointerStartX]) || 0).toFixed(2)].toString();
        sendManipulation(manipulationResult);
    };
    var mouseDownHandler = function (e) {
        if (!isMouseDown && resultRef.current !== null) {
            select(resultRef.current).selectAll('*').remove();
            var drawingG = resultRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyRec = rc.rectangle(margin.left, bandScale(store.selectedDP || '') || 0, pointer(e)[0] - margin.left, bandScale.bandwidth(), sketchyOption);
            drawingG.appendChild(sketchyRec);
        }
        setIsMouseDown(true);
        timer0 = now();
    };
    useLayoutEffect(function () {
        if (resultRef.current) {
            select(resultRef.current).selectAll('*').remove();
            var drawingG = resultRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyRec = rc.rectangle(margin.left, bandScale(store.selectedDP || '') || 0, 0.5 * store.svgWidth - margin.left, bandScale.bandwidth(), sketchyOption);
            drawingG.appendChild(sketchyRec);
        }
    }, []);
    return (_jsxs("g", { children: [_jsx("g", { id: 'result-rect', ref: resultRef }, void 0), _jsx("rect", { id: 'drag-rect', x: margin.left, 
                // y={(bandScale(store.selectedDP || '') || 0) - 50}
                y: margin.top, width: store.svgWidth - margin.left - margin.right, 
                // height={bandScale.bandwidth() + 100}
                height: store.svgHeight - margin.top - margin.bottom, opacity: 0, fill: LightGray, onMouseLeave: function () { setIsMouseDown(false); }, onMouseUp: mouseUpHandler, onMouseDown: mouseDownHandler, onMouseMove: dragHandler }, void 0)] }, void 0));
};
export default observer(ManipulationLayer);
