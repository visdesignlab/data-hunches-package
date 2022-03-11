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
import { makeValueScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { LightGray, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
var RangeLayer = function (_a) {
    var sendManipulation = _a.sendManipulation;
    var store = useContext(Store);
    var _b = useState(false), isMouseDown = _b[0], setIsMouseDown = _b[1];
    //const [isDragging, setIsDragging] = useState(false);
    var _c = useState(0), pointerStartX = _c[0], setPointerStartX = _c[1];
    var dataSet = useContext(DataContext);
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var dragHandler = function (e) {
        if (isMouseDown) {
            var xPos = pointer(e)[0];
            select('#result-rect')
                .attr('x', pointerStartX < xPos ? pointerStartX : xPos)
                .attr('width', Math.abs(pointerStartX - xPos));
        }
    };
    var mouseUpHandler = function (e) {
        setIsMouseDown(false);
        var dhRect = select('#result-rect');
        var manipulationResult;
        manipulationResult =
            [valueScale.invert((parseFloat(dhRect.attr('x')) + parseFloat(dhRect.attr('width')))).toFixed(2), valueScale.invert(dhRect.attr('x')).toFixed(2)].toString();
        sendManipulation(manipulationResult);
    };
    var mouseDownHandler = function (e) {
        setIsMouseDown(true);
        setPointerStartX(pointer(e)[0]);
        select('#result-rect')
            .attr('x', pointer(e)[0])
            .attr('width', 2);
    };
    return (_jsxs("g", __assign({ display: store.inputMode === 'manipulations' ? undefined : 'none' }, { children: [_jsx("rect", { id: 'result-rect', fill: 'red', height: bandScale.bandwidth(), y: bandScale(store.selectedDP || '') }, void 0), _jsx("rect", { id: 'drag-rect', x: margin.left, y: (bandScale(store.selectedDP || '') || 0) - 50, width: store.svgWidth - margin.left - margin.right, height: bandScale.bandwidth() + 100, opacity: 0.5, fill: LightGray, onMouseLeave: function () { setIsMouseDown(false); }, onMouseUp: mouseUpHandler, onMouseDown: mouseDownHandler, onMouseMove: dragHandler }, void 0)] }), void 0));
};
export default observer(RangeLayer);
