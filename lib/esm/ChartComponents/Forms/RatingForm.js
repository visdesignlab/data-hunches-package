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
import { Container, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import SubmitCancelButtons from "./SubmitCancelButtons";
var RatingForm = function () {
    var styles = useStyles();
    var store = useContext(Store);
    var _a = useState(''), ratingValue = _a[0], setRatingValue = _a[1];
    var handleRadioChange = function (event) {
        setRatingValue(event.target.value);
    };
    var _b = useState(''), reasonInput = _b[0], setReasonInput = _b[1];
    var handleReasonChange = function (event) {
        setReasonInput(event.target.value);
    };
    return (_jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsxs(RadioGroup, __assign({ name: "Rating", onChange: handleRadioChange }, { children: [_jsx(FormControlLabel, { value: "1star", control: _jsx(Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605" }, void 0), _jsx(FormControlLabel, { value: "2star", control: _jsx(Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605\u2605" }, void 0), _jsx(FormControlLabel, { value: "3star", control: _jsx(Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605\u2605\u2605" }, void 0), _jsx(FormControlLabel, { value: "4star", control: _jsx(Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605\u2605\u2605\u2605" }, void 0), _jsx(FormControlLabel, { value: "5star", control: _jsx(Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605\u2605\u2605\u2605\u2605" }, void 0)] }), void 0), _jsx(TextField, { required: true, label: "Reason", multiline: true, rows: 3, size: "small", onChange: handleReasonChange, placeholder: "Enter reason for the data hunch", variant: "outlined", style: { paddingTop: '5px', paddingBottom: '5px' } }, void 0), _jsx(SubmitCancelButtons, { disableSubmit: !ratingValue || reasonInput.length === 0, dhToSubmit: {
                    type: 'annotation',
                    user: store.userName,
                    label: "".concat(store.selectedDP === undefined ? 'all chart' : store.selectedDP),
                    content: ratingValue,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    // rating shouldn't have a confidence level?
                    confidenceLevel: 5,
                    upvotes: 0,
                    downvotes: 0,
                } }, void 0)] }), void 0));
};
export default observer(RatingForm);
