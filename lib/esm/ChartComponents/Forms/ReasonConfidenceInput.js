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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TextField, Typography, Slider } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";
var ReasonConfidenceInput = function (_a) {
    var updateConfidenceReason = _a.updateConfidenceReason;
    var _b = useState(3), confidenceInput = _b[0], setConfidenceInput = _b[1];
    var _c = useState(''), reasonInput = _c[0], setReasonInput = _c[1];
    var handleReasonChange = function (event) {
        setReasonInput(event.target.value);
        updateConfidenceReason(confidenceInput, event.target.value);
    };
    var handleConfidenceChange = function (event, value) {
        setConfidenceInput(value);
        updateConfidenceReason(value, reasonInput);
    };
    return (_jsxs("div", { children: [_jsxs("div", __assign({ style: { paddingLeft: '10px', paddingRight: '10px' } }, { children: [_jsx(Typography, __assign({ style: { textAlign: 'start' } }, { children: "Confidence" }), void 0), _jsx(Slider, { defaultValue: 3, "aria-labelledby": "discrete-slider", valueLabelDisplay: "auto", step: 1, "aria-label": "Confidence", onChangeCommitted: handleConfidenceChange, marks: true, min: 1, max: 5 }, void 0)] }), void 0), _jsx(TextField, { style: { paddingTop: '5px' }, required: true, label: "Reason", multiline: true, rows: 3, size: "small", onChange: handleReasonChange, value: reasonInput, placeholder: "Enter reason for the data hunch", variant: "outlined" }, void 0)] }, void 0));
};
export default observer(ReasonConfidenceInput);
