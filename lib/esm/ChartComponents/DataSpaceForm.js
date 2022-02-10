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
import { Container, Slider, TextField, Typography, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useState } from "react";
import { DataContext } from "..";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import PreviewResetButtons from "./PreviewResetButtons";
import SubmitCancelButtons from "./SubmitCancelButtons";
var DataSpaceForm = function (_a) {
    var isIncExc = _a.isIncExc;
    var store = useContext(Store);
    var styles = useStyles();
    var data = useContext(DataContext);
    var _b = useState(''), dataInput = _b[0], setDataInput = _b[1];
    var _c = useState(3), confidenceInput = _c[0], setConfidenceInput = _c[1];
    var _d = useState(''), reasonInput = _d[0], setReasonInput = _d[1];
    var _e = useState(''), labelInput = _e[0], setLabelInput = _e[1];
    var handleReasonChange = function (event) {
        setReasonInput(event.target.value);
    };
    var handleConfidenceChange = function (event, value) {
        setConfidenceInput(value);
    };
    var handleDataInputChange = function (event) {
        setDataInput(event.target.value);
    };
    var handleLabelInput = function (event) {
        setLabelInput(event.target.value);
    };
    var checkIfDisable = function () {
        if (isIncExc && labelInput.length > 0) {
            if (!data.map(function (d) { return d.label; }).includes(labelInput)) {
                return dataInput === '' || reasonInput.length === 0;
            }
            else {
                return reasonInput.length === 0;
            }
        }
        else {
            return dataInput === '' || reasonInput.length === 0;
        }
    };
    return _jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsxs(Grid, __assign({ container: true }, { children: [_jsx(Grid, __assign({ item: true, xs: 6 }, { children: _jsx(TextField, { required: true, onChange: handleLabelInput, label: "Label Input", variant: "outlined", size: "small", error: labelInput.length > 20, placeholder: "Suggest label to include/exclude", style: { display: isIncExc ? undefined : 'none', paddingBottom: '5px' } }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: isIncExc ? 6 : 12 }, { children: _jsx(TextField, { required: true, type: "number", style: { paddingBottom: '5px' }, onChange: handleDataInputChange, label: "Data Input", inputProps: { step: "0.1" }, variant: "outlined", size: "small", placeholder: "Suggest for ".concat(store.selectedDP) }, void 0) }), void 0)] }), void 0), _jsx(PreviewResetButtons, { disableButtons: checkIfDisable(), labelToPreview: store.selectedDP ? store.selectedDP : '', valueToPreview: dataInput === '' ? 0 : parseFloat(dataInput) }, void 0), _jsx(TextField, { style: { paddingTop: '5px' }, required: true, label: "Reason", multiline: true, rows: 3, size: "small", onChange: handleReasonChange, placeholder: "Enter reason for the data hunch", variant: "outlined" }, void 0), _jsxs("div", __assign({ style: { paddingLeft: '10px', paddingRight: '10px' } }, { children: [_jsx(Typography, __assign({ style: { textAlign: 'start' } }, { children: "Confidence" }), void 0), _jsx(Slider, { defaultValue: 3, "aria-labelledby": "discrete-slider", valueLabelDisplay: "auto", step: 1, "aria-label": "Confidence", onChangeCommitted: handleConfidenceChange, marks: true, min: 1, max: 5 }, void 0)] }), void 0), _jsx(SubmitCancelButtons, { disableSubmit: checkIfDisable(), dhToSubmit: {
                    type: 'annotation',
                    user: store.userName,
                    label: "".concat(store.selectedDP),
                    content: dataInput,
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0);
};
export default observer(DataSpaceForm);
