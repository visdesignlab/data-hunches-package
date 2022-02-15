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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var ReasonConfidenceInput = function (_a) {
    var updateConfidenceReason = _a.updateConfidenceReason;
    var _b = (0, react_1.useState)(3), confidenceInput = _b[0], setConfidenceInput = _b[1];
    var _c = (0, react_1.useState)(''), reasonInput = _c[0], setReasonInput = _c[1];
    var handleReasonChange = function (event) {
        setReasonInput(event.target.value);
        updateConfidenceReason(confidenceInput, event.target.value);
    };
    var handleConfidenceChange = function (event, value) {
        setConfidenceInput(value);
        updateConfidenceReason(value, reasonInput);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ style: { paddingLeft: '10px', paddingRight: '10px' } }, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: { textAlign: 'start' } }, { children: "Confidence" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Slider, { defaultValue: 3, "aria-labelledby": "discrete-slider", valueLabelDisplay: "auto", step: 1, "aria-label": "Confidence", onChangeCommitted: handleConfidenceChange, marks: true, min: 1, max: 5 }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(core_1.TextField, { style: { paddingTop: '5px' }, required: true, label: "Reason", multiline: true, rows: 3, size: "small", onChange: handleReasonChange, value: reasonInput, placeholder: "Enter reason for the data hunch", variant: "outlined" }, void 0)] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(ReasonConfidenceInput);
