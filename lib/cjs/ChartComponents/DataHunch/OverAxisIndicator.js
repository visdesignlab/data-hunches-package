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
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var __1 = require("../..");
var ScaleGenerator_1 = require("../../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../../Interfaces/Constants");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var StyledComponents_1 = require("../../Interfaces/StyledComponents");
var PreviewResetButtons_1 = require("../Forms/PreviewResetButtons");
var OverAxisIndicator = function (_a) {
    var dataHunch = _a.dataHunch;
    var store = (0, react_1.useContext)(Store_1.default);
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    return ((0, jsx_runtime_1.jsxs)("g", __assign({ cursor: 'pointer', onMouseOver: function () {
            store.setNeedToShowPreview(true);
            (0, PreviewResetButtons_1.handlePreviewOnClick)(dataSet, dataHunch.label, parseFloat(dataHunch.content), store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
        }, onMouseOut: function () {
            store.setNeedToShowPreview(false);
            (0, PreviewResetButtons_1.handleResetOnClick)(dataSet, store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
        } }, { children: [(0, jsx_runtime_1.jsx)("line", { x1: (honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), x2: (honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), stroke: Constants_1.DarkGray, strokeWidth: 4, y1: Constants_1.margin.top - 5, y2: Constants_1.margin.top - 20 }, void 0), (0, jsx_runtime_1.jsx)("polygon", { points: "0,0 7,5 -7,5", fill: Constants_1.DarkGray, stroke: 'none', transform: "translate(".concat((honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), ",").concat(Constants_1.margin.top - 20, ")") }, void 0), (0, jsx_runtime_1.jsx)(StyledComponents_1.DHIndicatorRect
            // onMouseOver={() => { store.setHighlightedDH(d.id); }}
            , { 
                // onMouseOver={() => { store.setHighlightedDH(d.id); }}
                x: honrizontalBandScale(dataHunch.label) || 0, width: honrizontalBandScale.bandwidth(), y: Constants_1.margin.top - 5 }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(OverAxisIndicator);
