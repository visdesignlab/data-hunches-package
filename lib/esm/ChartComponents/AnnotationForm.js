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
var AnnotationForm = function () {
    var styles = useStyles();
    var store = useContext(Store);
    var _a = useState(3), confidenceInput = _a[0], setConfidenceInput = _a[1];
    var _b = useState(''), reasonInput = _b[0], setReasonInput = _b[1];
    var _c = useState(''), annotationInput = _c[0], setAnnotationInput = _c[1];
    var handleReasonChange = function (event) {
        setReasonInput(event.target.value);
    };
    var handleAnnotationChange = function (event) {
        setAnnotationInput(event.target.value);
    };
    var handleConfidenceChange = function (event, value) {
        setConfidenceInput(value);
    };
    return (_jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsx(TextField, { style: { paddingBottom: '10px' }, required: true, label: "Annotation Input", variant: "outlined", multiline: true, size: "small", onChange: handleAnnotationChange, rows: 2, placeholder: "Annotate on ".concat(store.selectedDP ? store.selectedDP : 'chart') }, void 0), _jsx(TextField, { required: true, label: "Reason", multiline: true, rows: 3, size: "small", onChange: handleReasonChange, placeholder: "Enter reason for the data hunch", variant: "outlined" }, void 0), _jsxs("div", __assign({ style: { paddingLeft: '10px', paddingRight: '10px' } }, { children: [_jsx(Typography, __assign({ style: { textAlign: 'start' } }, { children: "Confidence" }), void 0), _jsx(Slider, { defaultValue: 3, "aria-labelledby": "discrete-slider", valueLabelDisplay: "auto", step: 1, "aria-label": "Confidence", onChangeCommitted: handleConfidenceChange, marks: true, min: 1, max: 5 }, void 0)] }), void 0), _jsx(SubmitCancelButtons, { disableSubmit: annotationInput.length === 0 || reasonInput.length === 0, dhToSubmit: {
                    type: 'annotation',
                    user: store.userName,
                    label: "".concat(store.selectedDP === 'none' ? 'all chart' : store.selectedDP),
                    content: annotationInput,
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0));
};
export default observer(AnnotationForm);
