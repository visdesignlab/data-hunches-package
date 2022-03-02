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
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var d3_drag_1 = require("d3-drag");
var d3_shape_1 = require("d3-shape");
var SketchLayer = function (_a) {
    var sendManipulation = _a.sendManipulation;
    var store = (0, react_1.useContext)(Store_1.default);
    var sketchResult = [];
    var currentPath = [];
    var rectRef = (0, react_1.useRef)(null);
    var currentDrawing = (0, react_1.useRef)(null);
    var drag = function (e) {
        currentPath.push((0, d3_selection_1.pointer)(e, (0, d3_selection_1.select)(currentDrawing.current).node()));
        if (currentDrawing.current) {
            (0, d3_selection_1.select)(currentDrawing.current)
                .attr('d', generatePath(currentPath));
        }
    };
    var dragStart = function () {
        currentPath = [];
    };
    var dragEnd = function () {
        var newSetPath = currentPath.filter(function (_d, i) { return i % 5 === 0; });
        sketchResult.push(newSetPath);
        (0, d3_selection_1.select)('#existing-path').selectAll('path')
            .data(sketchResult)
            .join('path')
            .attr('d', function (d) { return generatePath(d); })
            .attr('stroke', 'black')
            .attr('fill', 'none');
        sendManipulation(JSON.stringify(sketchResult));
    };
    var generatePath = function (points) {
        return (0, d3_shape_1.line)()(points);
    };
    (0, react_1.useEffect)(function () {
        if (currentDrawing.current) {
            (0, d3_selection_1.select)(currentDrawing.current)
                .attr('d', generatePath(currentPath));
        }
    }, [currentPath]);
    (0, react_1.useLayoutEffect)(function () {
        sketchResult = [];
        if (rectRef.current) {
            (0, d3_selection_1.select)(rectRef.current)
                .call((0, d3_drag_1.drag)()
                .on("start", dragStart)
                .on("drag", drag)
                .on("end", dragEnd));
        }
    }, [rectRef]);
    return ((0, jsx_runtime_1.jsxs)("g", __assign({ id: 'dragging-layer' }, { children: [(0, jsx_runtime_1.jsx)("rect", { ref: rectRef, x: 0, y: 0, fill: Constants_1.LightGray, opacity: 0.5, width: store.svgWidth, height: store.svgHeight }, void 0), (0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("g", { id: 'existing-path' }, void 0), (0, jsx_runtime_1.jsx)("path", { ref: currentDrawing, fill: 'none', stroke: 'black' }, void 0)] }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(SketchLayer);
