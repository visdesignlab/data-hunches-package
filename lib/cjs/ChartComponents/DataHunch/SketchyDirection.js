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
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var rough = __importStar(require("roughjs/bin/rough"));
var StyledTooltip_1 = __importDefault(require("./StyledTooltip"));
var d3_selection_1 = require("d3-selection");
var Constants_1 = require("../../Interfaces/Constants");
var UpvotesDownvotes_1 = require("./UpvotesDownvotes");
var SketchyDirection = function (_a) {
    var dataHunch = _a.dataHunch, xPos = _a.xPos, yPos = _a.yPos, highlighted = _a.highlighted, selected = _a.selected;
    var store = (0, react_1.useContext)(Store_1.default);
    var dhRef = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(function () {
        if (dhRef.current !== null) {
            (0, d3_selection_1.select)(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyLine = rc.line(xPos, yPos, dataHunch.content === 'higher' ? xPos + 10 : xPos - 10, yPos, Constants_1.DefaultSketchyOptions);
            drawingG.appendChild(sketchyLine);
            var sketchyArrow = rc.polygon([
                [dataHunch.content === 'higher' ? xPos + 10 : xPos - 10, yPos - 5],
                [dataHunch.content === 'higher' ? xPos + 10 : xPos - 10, yPos + 5],
                [dataHunch.content === 'higher' ? xPos + 15 : xPos - 15, yPos]
            ], __assign(__assign({}, Constants_1.DefaultSketchyOptions), { fillStyle: 'solid' }));
            drawingG.appendChild(sketchyArrow);
        }
    }, [xPos, yPos]);
    (0, react_1.useLayoutEffect)(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.HighlightColor).attr('fill', Constants_1.HighlightColor);
            }
            else if (selected) {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.SelectionColor).attr('fill', Constants_1.SelectionColor);
            }
            else {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.DataHunchColor).attr('fill', Constants_1.DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return ((0, jsx_runtime_1.jsx)(StyledTooltip_1.default, { dataHunch: dataHunch, childrenComponent: (0, jsx_runtime_1.jsx)("g", { display: store.needToShowPreview ? 'none' : undefined, ref: dhRef, cursor: 'pointer', onContextMenu: function (e) {
                (0, UpvotesDownvotes_1.toVoteDH)(e, store.svgWidth, store.svgHeight, true);
                store.setVotingDH(dataHunch);
            }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, void 0) }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(SketchyDirection);
