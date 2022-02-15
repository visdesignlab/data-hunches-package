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
require("d3-transition");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var PreviewReset_1 = require("../../HelperFunctions/PreviewReset");
var PreviewResetButtons = function (_a) {
    var labelToPreview = _a.labelToPreview, valueToPreview = _a.valueToPreview, disableButtons = _a.disableButtons;
    var store = (0, react_1.useContext)(Store_1.default);
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var previewHandler = function () {
        store.setNeedToShowPreview(true);
        (0, PreviewReset_1.handlePreviewOnClick)(dataSet, labelToPreview, valueToPreview, store.svgHeight, store.svgWidth, store.containCategory);
    };
    var resetHandler = function () {
        store.setNeedToShowPreview(false);
        (0, PreviewReset_1.handleResetOnClick)(dataSet, store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, __assign({ size: 'small', disabled: disableButtons, onClick: previewHandler }, { children: "Preview" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ size: 'small', disabled: disableButtons, onClick: resetHandler }, { children: "Reset" }), void 0)] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(PreviewResetButtons);
