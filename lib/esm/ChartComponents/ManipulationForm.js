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
import { Container, Slider, TextField, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import SubmitCancelButtons from "./SubmitCancelButtons";
var ManipulationForm = function () {
    var styles = useStyles();
    var store = useContext(Store);
    var _a = useState(''), reasonInput = _a[0], setReasonInput = _a[1];
    var handleReasonChange = function (event) {
        setReasonInput(event.target.value);
    };
    var _b = useState(undefined), manipulationOutput = _b[0], setManipulationOutput = _b[1];
    var _c = useState(3), confidenceInput = _c[0], setConfidenceInput = _c[1];
    var handleConfidenceChange = function (event, value) {
        setConfidenceInput(value);
    };
    return (_jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsx(TextField, { required: true, label: "Reason", multiline: true, rows: 3, size: "small", onChange: handleReasonChange, placeholder: "Enter reason for the data hunch", variant: "outlined" }, void 0), _jsxs("div", __assign({ style: { paddingLeft: '10px', paddingRight: '10px' } }, { children: [_jsx(Typography, __assign({ style: { textAlign: 'start' } }, { children: "Confidence" }), void 0), _jsx(Slider, { defaultValue: 3, "aria-labelledby": "discrete-slider", valueLabelDisplay: "auto", step: 1, "aria-label": "Confidence", onChangeCommitted: handleConfidenceChange, marks: true, min: 1, max: 5 }, void 0)] }), void 0), _jsx(SubmitCancelButtons, { disableSubmit: reasonInput.length === 0 || manipulationOutput === undefined, dhToSubmit: {
                    type: 'annotation',
                    user: store.userName,
                    label: "".concat(store.selectedDP === 'none' ? 'all chart' : store.selectedDP),
                    // Add Content
                    content: manipulationOutput === undefined ? '' : manipulationOutput.toString(),
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0));
};
export default observer(ManipulationForm);
