"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var d3_selection_1 = require("d3-selection");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var __1 = require("..");
var ScaleGenerator_1 = require("../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var ManipulationLayer = function (_a) {
    var sendManipulation = _a.sendManipulation;
    var store = (0, react_1.useContext)(Store_1.default);
    var _b = (0, react_1.useState)(false), isMouseDown = _b[0], setIsMouseDown = _b[1];
    var _c = (0, react_1.useState)(false), isDragging = _c[0], setIsDragging = _c[1];
    var _d = (0, react_1.useState)(0), pointerStartY = _d[0], setPointerStartY = _d[1];
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var verticalValueScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    var dragHandler = function (e) {
        if (isMouseDown) {
            setIsDragging(true);
            var yPos = (0, d3_selection_1.pointer)(e)[1];
            (0, d3_selection_1.select)('#result-rect')
                .attr('y', pointerStartY < yPos ? pointerStartY : yPos)
                .attr('height', Math.abs(pointerStartY - yPos));
        }
    };
    var mouseUpHandler = function (e) {
        setIsMouseDown(false);
        var dhRect = (0, d3_selection_1.select)('#result-rect');
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
        setPointerStartY((0, d3_selection_1.pointer)(e)[1]);
        (0, d3_selection_1.select)('#result-rect')
            .attr('y', (0, d3_selection_1.pointer)(e)[1])
            .attr('height', 2);
    };
    return ((0, jsx_runtime_1.jsxs)("g", __assign({ display: store.inputMode === 'manipulation' ? undefined : 'none' }, { children: [(0, jsx_runtime_1.jsx)("rect", { id: 'result-rect', fill: 'red', width: honrizontalBandScale.bandwidth(), x: honrizontalBandScale(store.selectedDP || '') }, void 0), (0, jsx_runtime_1.jsx)("rect", { id: 'drag-rect', x: (honrizontalBandScale(store.selectedDP || '') || 0) - 50, y: Constants_1.margin.top, width: honrizontalBandScale.bandwidth() + 100, height: store.svgHeight - Constants_1.margin.top - Constants_1.margin.bottom, opacity: 0.5, fill: Constants_1.LightGray, onMouseLeave: function () { setIsDragging(false); setIsMouseDown(false); }, onMouseUpCapture: mouseUpHandler, onMouseDown: mouseDownHandler, onMouseMove: dragHandler }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(ManipulationLayer);
