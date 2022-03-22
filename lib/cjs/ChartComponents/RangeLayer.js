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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var rough = __importStar(require("roughjs/bin/rough"));
var d3_array_1 = require("d3-array");
var d3_timer_1 = require("d3-timer");
var RangeLayer = function (_a) {
    var sendManipulation = _a.sendManipulation;
    var store = (0, react_1.useContext)(Store_1.default);
    var _b = (0, react_1.useState)(false), isMouseDown = _b[0], setIsMouseDown = _b[1];
    var _c = (0, react_1.useState)(0), pointerStartX = _c[0], setPointerStartX = _c[1];
    var timer0 = null;
    var resultRef = (0, react_1.useRef)(null);
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var valueScale = (0, ScaleGenerator_1.makeValueScale)(dataSet, store.svgWidth);
    var bandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgHeight);
    var sketchyOption = __assign(__assign({}, Constants_1.DefaultSketchyOptions), { fill: Constants_1.SelectionColor, stroke: Constants_1.SelectionColor, fillWeight: 3 });
    var dragHandler = function (e) {
        if (isMouseDown) {
            var xPos = pointerStartX < (0, d3_selection_1.pointer)(e)[0] ? pointerStartX : (0, d3_selection_1.pointer)(e)[0];
            var yPos = bandScale(store.selectedDP || '') || 0;
            var height = bandScale.bandwidth();
            if (resultRef.current !== null && (((0, d3_timer_1.now)() - (timer0 || 0)) > 50)) {
                (0, d3_selection_1.select)(resultRef.current).selectAll('*').remove();
                var drawingG = resultRef.current;
                var rc = rough.default.svg(drawingG);
                var sketchyRec = rc.rectangle(xPos + 0.5 * Math.abs(pointerStartX - (0, d3_selection_1.pointer)(e)[0]), yPos, 4, height, sketchyOption);
                var rangePoly = rc.polygon([
                    [xPos, yPos + 0.5 * height],
                    [xPos + 0.5 * Math.abs(pointerStartX - (0, d3_selection_1.pointer)(e)[0]), yPos + 0.5 * height - 4],
                    [xPos + Math.abs(pointerStartX - (0, d3_selection_1.pointer)(e)[0]), yPos + 0.5 * height],
                    [xPos + 0.5 * Math.abs(pointerStartX - (0, d3_selection_1.pointer)(e)[0]), yPos + 0.5 * height + 4]
                ], sketchyOption);
                drawingG.appendChild(sketchyRec);
                drawingG.appendChild(rangePoly);
                timer0 = (0, d3_timer_1.now)();
            }
        }
    };
    var mouseUpHandler = function (e) {
        setIsMouseDown(false);
        var manipulationResult;
        var pointerEndX = (0, d3_selection_1.pointer)(e)[0];
        manipulationResult =
            [valueScale.invert((0, d3_array_1.min)([pointerEndX, pointerStartX]) || 0).toFixed(2), valueScale.invert((0, d3_array_1.max)([pointerEndX, pointerStartX]) || 0).toFixed(2)].toString();
        sendManipulation(manipulationResult);
    };
    var mouseDownHandler = function (e) {
        if (!isMouseDown && resultRef.current !== null) {
            (0, d3_selection_1.select)(resultRef.current).selectAll('*').remove();
            var drawingG = resultRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyRec = rc.rectangle((0, d3_selection_1.pointer)(e)[0] || 0, bandScale(store.selectedDP || '') || 0, 2, bandScale.bandwidth(), sketchyOption);
            drawingG.appendChild(sketchyRec);
        }
        setIsMouseDown(true);
        setPointerStartX((0, d3_selection_1.pointer)(e)[0]);
        timer0 = (0, d3_timer_1.now)();
    };
    return ((0, jsx_runtime_1.jsxs)("g", __assign({ display: store.inputMode === 'range' ? undefined : 'none' }, { children: [(0, jsx_runtime_1.jsx)("g", { id: 'result-rect', ref: resultRef }, void 0), (0, jsx_runtime_1.jsx)("rect", { id: 'drag-rect', x: Constants_1.margin.left, 
                // y={(bandScale(store.selectedDP || '') || 0) - 50}
                y: Constants_1.margin.top, width: store.svgWidth - Constants_1.margin.left - Constants_1.margin.right, 
                // height={bandScale.bandwidth() + 100}
                height: store.svgHeight - Constants_1.margin.top - Constants_1.margin.bottom, opacity: 0, fill: Constants_1.LightGray, onMouseLeave: function () { setIsMouseDown(false); }, onMouseUp: mouseUpHandler, onMouseDown: mouseDownHandler, onMouseMove: dragHandler }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(RangeLayer);
