"use strict";
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
var react_2 = require("react");
var __1 = require("../..");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var rough = __importStar(require("roughjs/bin/rough"));
var d3_selection_1 = require("d3-selection");
var Constants_1 = require("../../Interfaces/Constants");
var StyledTooltip_1 = __importDefault(require("./StyledTooltip"));
var ExclusionIndicator = function (_a) {
    var dataHunch = _a.dataHunch, dataPoint = _a.dataPoint, centerX = _a.centerX, centerY = _a.centerY, bandWidth = _a.bandWidth, highlighted = _a.highlighted, selected = _a.selected;
    var dhRef = (0, react_1.useRef)(null);
    var store = (0, react_1.useContext)(Store_1.default);
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    (0, react_2.useLayoutEffect)(function () {
        if (dhRef.current !== null) {
            (0, d3_selection_1.select)(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var firstLine = rc.line(centerX - 20, centerY - 0.5 * bandWidth, centerX + 20, centerY + 0.5 * bandWidth, Constants_1.DefaultSketchyOptions);
            var secondLine = rc.line(centerX - 20, centerY + 0.5 * bandWidth, centerX + 20, centerY - 0.5 * bandWidth, Constants_1.DefaultSketchyOptions);
            drawingG.appendChild(firstLine);
            drawingG.appendChild(secondLine);
        }
    }, [centerX, centerY]);
    (0, react_2.useLayoutEffect)(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.HighlightColor);
            }
            else if (selected) {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.SelectionColor);
            }
            else {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return ((0, jsx_runtime_1.jsx)(StyledTooltip_1.default, { dataHunch: dataHunch, childrenComponent: (0, jsx_runtime_1.jsx)("g", { ref: dhRef, onMouseOver: function () { store.setHighlightedDH(dataHunch.id); }, onMouseOut: function () {
                store.setHighlightedDH(-1);
            }, onClick: function () { store.setSelectedDH([dataHunch.id]); }, cursor: 'pointer' }, void 0) }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(ExclusionIndicator);
