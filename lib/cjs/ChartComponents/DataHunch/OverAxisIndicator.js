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
var core_1 = require("@material-ui/core");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var __1 = require("../..");
var PreviewReset_1 = require("../../HelperFunctions/PreviewReset");
var ScaleGenerator_1 = require("../../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../../Interfaces/Constants");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var StyledComponents_1 = require("../../Interfaces/StyledComponents");
var OverAxisIndicator = function (_a) {
    var dataHunch = _a.dataHunch;
    var store = (0, react_1.useContext)(Store_1.default);
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var _b = (0, react_1.useState)(false), needReset = _b[0], setNeedReset = _b[1];
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    (0, react_1.useEffect)(function () {
        if (store.selectedDH.includes(dataHunch.id)) {
            store.setNeedToShowPreview(true);
            setNeedReset(true);
            (0, PreviewReset_1.handlePreviewOnClick)(dataSet, dataHunch.label, parseFloat(dataHunch.content), store.svgHeight, store.svgWidth, store.containCategory.length > 0, undefined);
        }
        else if (!store.selectedDH.includes(dataHunch.id) && needReset) {
            store.setNeedToShowPreview(false);
            setNeedReset(false);
            (0, PreviewReset_1.handleResetOnClick)(dataSet, store.svgHeight, store.svgWidth, store.containCategory.length > 0, store.selectedDP);
        }
    }, [store.selectedDH]);
    return ((0, jsx_runtime_1.jsx)(core_1.Tooltip, __assign({ title: dataHunch.reasoning }, { children: (0, jsx_runtime_1.jsxs)("g", __assign({ cursor: 'pointer', onMouseOver: function () {
                store.setSelectedDH([dataHunch.id]);
                store.setHighlightedDH(dataHunch.id);
            }, onMouseOut: function () {
                store.setSelectedDH([]);
                store.setHighlightedDH(-1);
            } }, { children: [(0, jsx_runtime_1.jsx)("line", { x1: (honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), x2: (honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), stroke: Constants_1.DarkGray, strokeWidth: 4, y1: Constants_1.margin.top - 10, y2: Constants_1.margin.top - 25 }, void 0), (0, jsx_runtime_1.jsx)("polygon", { points: "0,0 7,5 -7,5", fill: Constants_1.DarkGray, stroke: 'none', transform: "translate(".concat((honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth(), ",").concat(Constants_1.margin.top - 25, ")") }, void 0), (0, jsx_runtime_1.jsx)(StyledComponents_1.DHIndicatorRect, { x: honrizontalBandScale(dataHunch.label) || 0, width: honrizontalBandScale.bandwidth(), y: Constants_1.margin.top - 10 }, void 0)] }), void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(OverAxisIndicator);
