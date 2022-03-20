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
var Constants_1 = require("../../Interfaces/Constants");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var rough = __importStar(require("roughjs/bin/rough"));
var StyledComponents_1 = require("../../Interfaces/StyledComponents");
var SingleOverAxisIndicator = function (_a) {
    var textX = _a.textX, textY = _a.textY, dataHunch = _a.dataHunch, curvePoints = _a.curvePoints, highlighted = _a.highlighted, selected = _a.selected, arrowPoints = _a.arrowPoints, rotateX = _a.rotateX, rotateY = _a.rotateY;
    var curveRef = (0, react_1.useRef)(null);
    var arrowRef = (0, react_1.useRef)(null);
    var store = (0, react_1.useContext)(Store_1.default);
    (0, react_1.useLayoutEffect)(function () {
        if (curveRef.current !== null && arrowRef.current !== null) {
            (0, d3_selection_1.select)(curveRef.current).selectAll('*').remove();
            (0, d3_selection_1.select)(arrowRef.current).selectAll('*').remove();
            var drawingG = curveRef.current;
            var arrowG = arrowRef.current;
            var rc = rough.default.svg(drawingG);
            var arrowRC = rough.default.svg(arrowG);
            var roughCurve = rc.curve(JSON.parse(curvePoints), __assign(__assign({}, Constants_1.DefaultSketchyOptions), { fillStyle: 'hachure', fill: 'none' }));
            var roughArrow = arrowRC.polygon(JSON.parse(arrowPoints), __assign(__assign({}, Constants_1.DefaultSketchyOptions), { fillStyle: 'solid' }));
            drawingG.appendChild(roughCurve);
            arrowG.appendChild(roughArrow);
        }
    }, [arrowPoints, curvePoints]);
    (0, react_1.useLayoutEffect)(function () {
        if (curveRef.current !== null && arrowRef.current !== null) {
            if (highlighted) {
                (0, d3_selection_1.select)(curveRef.current).selectAll('path').attr('stroke', Constants_1.HighlightColor);
                (0, d3_selection_1.select)(arrowRef.current).selectAll('path').attr('stroke', Constants_1.HighlightColor).attr('fill', Constants_1.HighlightColor);
            }
            else if (selected) {
                (0, d3_selection_1.select)(curveRef.current).selectAll('path').attr('stroke', Constants_1.SelectionColor);
                (0, d3_selection_1.select)(arrowRef.current).selectAll('path').attr('stroke', Constants_1.SelectionColor).attr('fill', Constants_1.SelectionColor);
            }
            else {
                (0, d3_selection_1.select)(curveRef.current).selectAll('path').attr('stroke', Constants_1.DataHunchColor);
                (0, d3_selection_1.select)(arrowRef.current).selectAll('path').attr('stroke', Constants_1.DataHunchColor).attr('fill', Constants_1.DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return ((0, jsx_runtime_1.jsx)(StyledComponents_1.LightTooltip, __assign({ title: dataHunch.reasoning }, { children: (0, jsx_runtime_1.jsxs)("g", __assign({ cursor: "pointer", onClick: function () { store.setSelectedDH([dataHunch.id]); }, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); } }, { children: [(0, jsx_runtime_1.jsx)("g", { ref: curveRef }, void 0), (0, jsx_runtime_1.jsx)("g", { ref: arrowRef, transform: "rotate(45,".concat(rotateX, ",").concat(rotateY, ")") }, void 0), (0, jsx_runtime_1.jsx)("text", __assign({ textAnchor: "start", alignmentBaseline: "hanging", fill: highlighted ? Constants_1.HighlightColor : (selected ? Constants_1.SelectionColor : Constants_1.DataHunchColor), x: textX, y: textY, fontFamily: "'Nanum Brush Script', cursive", fontWeight: "bold" }, { children: dataHunch.content }), void 0)] }), void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(SingleOverAxisIndicator);
