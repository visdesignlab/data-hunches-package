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
var ManipulationLayer = function () {
    var store = useContext(Store);
    var _a = useState(false), isMouseDown = _a[0], setIsMouseDown = _a[1];
    var _b = useState(false), isDragging = _b[0], setIsDragging = _b[1];
    var _c = useState(0), pointerStartY = _c[0], setPointerStartY = _c[1];
    var dataSet = useContext(DataContext);
    var verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    var honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    var dragHandler = function (e) {
        if (isMouseDown) {
            console.log('mouse drag');
            setIsDragging(true);
            var yPos = pointer(e)[1];
            select('#result-rect')
                .attr('y', pointerStartY < yPos ? pointerStartY : yPos)
                .attr('height', Math.abs(pointerStartY - yPos));
        }
    };
    var mouseUpHandler = function (e) {
        console.log('mouse up');
        setIsMouseDown(false);
        if (isDragging) {
            setIsDragging(false);
        }
        else {
            console.log('clicked');
        }
    };
    var mouseDownHandler = function (e) {
        console.log('mouse down');
        setIsMouseDown(true);
        setIsDragging(false);
        setPointerStartY(pointer(e)[1]);
        select('#result-rect')
            .attr('y', pointer(e)[1])
            .attr('height', 2);
    };
    return _jsxs("g", __assign({ display: store.inputMode === 'manipulation' ? undefined : 'none' }, { children: [_jsx("rect", { id: 'result-rect', fill: 'red', width: honrizontalBandScale.bandwidth(), x: honrizontalBandScale(store.selectedDP || '') }, void 0), _jsx("rect", { id: 'drag-rect', x: (honrizontalBandScale(store.selectedDP || '') || 0) - 50, y: margin.top, width: honrizontalBandScale.bandwidth() + 100, height: store.svgHeight - margin.top - margin.bottom, opacity: 0.5, fill: LightGray, onMouseLeave: function () { setIsDragging(false); setIsMouseDown(false); }, onMouseUpCapture: mouseUpHandler, onMouseDown: mouseDownHandler, onMouseMove: dragHandler }, void 0)] }), void 0);
};
export default observer(ManipulationLayer);