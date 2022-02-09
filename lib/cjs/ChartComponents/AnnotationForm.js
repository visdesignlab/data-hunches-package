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
var mobx_react_1 = require("mobx-react");
var react_1 = require("react");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var CancelButton_1 = __importDefault(require("./CancelButton"));
var AnnotationForm = function () {
    var styles = (0, StyledComponents_1.useStyles)();
    var store = (0, react_1.useContext)(Store_1.default);
    var _a = (0, react_1.useState)(false), tryToSubmit = _a[0], setTryToSubmit = _a[1];
    var submitClickHandler = function () {
        setTryToSubmit(true);
        if (reasonInput.length > 0 && annotationInput.length > 0) {
            //submit the DH
        }
    };
    var _b = (0, react_1.useState)(3), confidenceInput = _b[0], setConfidenceInput = _b[1];
    var _c = (0, react_1.useState)(''), reasonInput = _c[0], setReasonInput = _c[1];
    var _d = (0, react_1.useState)(''), annotationInput = _d[0], setAnnotationInput = _d[1];
    var handleReasonChange = function (event) {
        setReasonInput(event.target.value);
    };
    var handleAnnotationChange = function (event) {
        setAnnotationInput(event.target.value);
    };
    var handleConfidenceChange = function (event, value) {
        setConfidenceInput(value);
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, __assign({ className: styles.foreignObjectContainer }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextField, { style: { paddingBottom: (annotationInput.length === 0 && tryToSubmit) ? '0px' : '10px' }, required: true, label: "Annotation Input", error: (annotationInput.length === 0 && tryToSubmit) ? true : false, variant: "outlined", multiline: true, size: "small", helperText: (annotationInput.length === 0 && tryToSubmit) ? 'Please enter the data hunch' : undefined, onChange: handleAnnotationChange, rows: 2, placeholder: "Enter annotation for ".concat(store.selectedDP ? store.selectedDP : 'chart') }, void 0), (0, jsx_runtime_1.jsx)(core_1.TextField, { required: true, label: "Reason", error: (reasonInput.length === 0 && tryToSubmit) ? true : false, helperText: (reasonInput.length === 0 && tryToSubmit) ? 'Please enter a reason' : undefined, multiline: true, rows: 3, size: "small", onChange: handleReasonChange, placeholder: "Enter reason for the data hunch", variant: "outlined" }, void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { paddingLeft: '10px', paddingRight: '10px' } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: { textAlign: 'start' } }, { children: "Confidence" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Slider, { defaultValue: 3, "aria-labelledby": "discrete-slider", valueLabelDisplay: "auto", step: 1, "aria-label": "Confidence", onChangeCommitted: handleConfidenceChange, marks: true, min: 1, max: 5 }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, __assign({ size: 'small', onClick: submitClickHandler }, { children: "Submit" }), void 0), (0, jsx_runtime_1.jsx)(CancelButton_1.default, {}, void 0)] }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_1.observer)(AnnotationForm);
