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
import { useContext, useState } from "react";
import { DataContext } from "..";
import { makeVerticalScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { LightGray, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
var ManipulationLayer = function (_a) {
    var sendManipulation = _a.sendManipulation;
    var store = useContext(Store);
    var _b = useState(false), isMouseDown = _b[0], setIsMouseDown = _b[1];
    var _c = useState(false), isDragging = _c[0], setIsDragging = _c[1];
    var _d = useState(0), pointerStartY = _d[0], setPointerStartY = _d[1];
    var dataSet = useContext(DataContext);
    var verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    var honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    var dragHandler = function (e) {
        if (isMouseDown) {
            setIsDragging(true);
            var yPos = pointer(e)[1];
            select('#result-rect')
                .attr('y', pointerStartY < yPos ? pointerStartY : yPos)
                .attr('height', Math.abs(pointerStartY - yPos));
        }
    };
    var mouseUpHandler = function (e) {
        setIsMouseDown(false);
        var dhRect = select('#result-rect');
        var manipulationResult;
        if (isDragging) {
            setIsDragging(false);
            manipulationResult =
                [verticalValueScale.invert((parseFloat(dhRect.attr('y')) + parseFloat(dhRect.attr('height')))).toFixed(2), verticalValueScale.invert(dhRect.attr('y')).toFixed(2)].toString();
        }
        else {
            manipulationResult = verticalValueScale.invert(pointerStartY).toFixed(2).toString();
        }
        sendManipulation(manipulationResult);
    };
    var mouseDownHandler = function (e) {
        setIsMouseDown(true);
        setIsDragging(false);
        setPointerStartY(pointer(e)[1]);
        select('#result-rect')
            .attr('y', pointer(e)[1])
            .attr('height', 2);
    };
    return (_jsxs("g", __assign({ display: store.inputMode === 'manipulation' ? undefined : 'none' }, { children: [_jsx("rect", { id: 'result-rect', fill: 'red', width: honrizontalBandScale.bandwidth(), x: honrizontalBandScale(store.selectedDP || '') }, void 0), _jsx("rect", { id: 'drag-rect', x: (honrizontalBandScale(store.selectedDP || '') || 0) - 50, y: margin.top, width: honrizontalBandScale.bandwidth() + 100, height: store.svgHeight - margin.top - margin.bottom, opacity: 0.5, fill: LightGray, onMouseLeave: function () { setIsDragging(false); setIsMouseDown(false); }, onMouseUpCapture: mouseUpHandler, onMouseDown: mouseDownHandler, onMouseMove: dragHandler }, void 0)] }), void 0));
};
export default observer(ManipulationLayer);
