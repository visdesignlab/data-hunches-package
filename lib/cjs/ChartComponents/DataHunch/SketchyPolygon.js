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
var core_1 = require("@material-ui/core");
var d3_selection_1 = require("d3-selection");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var rough = __importStar(require("roughjs/bin/rough"));
var SketchyPolygon = function (_a) {
    var dataHunch = _a.dataHunch, points = _a.points, fill = _a.fill, opacity = _a.opacity;
    var dhRef = (0, react_1.useRef)(null);
    var store = (0, react_1.useContext)(Store_1.default);
    (0, react_1.useLayoutEffect)(function () {
        if (dhRef.current !== null) {
            (0, d3_selection_1.select)(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyDH = rc.polygon((points), {
                fill: fill,
                stroke: 'white',
                fillStyle: 'solid',
                roughness: 2,
                hachureAngle: 60,
                hachureGap: 10,
                fillWeight: 1,
                strokeWidth: 1,
            });
            drawingG.appendChild(sketchyDH);
        }
    }, [points, fill]);
    return ((0, jsx_runtime_1.jsx)(core_1.Tooltip, __assign({ title: dataHunch.reasoning }, { children: (0, jsx_runtime_1.jsx)("g", { ref: dhRef, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, opacity: opacity, cursor: 'pointer' }, void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(SketchyPolygon);
