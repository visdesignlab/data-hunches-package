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
var Store_1 = __importDefault(require("../Interfaces/Store"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var SubmitCancelButtons_1 = __importDefault(require("./SubmitCancelButtons"));
var RatingForm = function () {
    var styles = (0, StyledComponents_1.useStyles)();
    var store = (0, react_1.useContext)(Store_1.default);
    var _a = (0, react_1.useState)(''), ratingValue = _a[0], setRatingValue = _a[1];
    var handleRadioChange = function (event) {
        setRatingValue(event.target.value);
    };
    var _b = (0, react_1.useState)(''), reasonInput = _b[0], setReasonInput = _b[1];
    var handleReasonChange = function (event) {
        setReasonInput(event.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, __assign({ className: styles.foreignObjectContainer }, { children: [(0, jsx_runtime_1.jsxs)(core_1.RadioGroup, __assign({ name: "Rating", onChange: handleRadioChange }, { children: [(0, jsx_runtime_1.jsx)(core_1.FormControlLabel, { value: "1star", control: (0, jsx_runtime_1.jsx)(core_1.Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605" }, void 0), (0, jsx_runtime_1.jsx)(core_1.FormControlLabel, { value: "2star", control: (0, jsx_runtime_1.jsx)(core_1.Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605\u2605" }, void 0), (0, jsx_runtime_1.jsx)(core_1.FormControlLabel, { value: "3star", control: (0, jsx_runtime_1.jsx)(core_1.Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605\u2605\u2605" }, void 0), (0, jsx_runtime_1.jsx)(core_1.FormControlLabel, { value: "4star", control: (0, jsx_runtime_1.jsx)(core_1.Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605\u2605\u2605\u2605" }, void 0), (0, jsx_runtime_1.jsx)(core_1.FormControlLabel, { value: "5star", control: (0, jsx_runtime_1.jsx)(core_1.Radio, { size: "small", className: styles.radioStyle }, void 0), label: "\u2605\u2605\u2605\u2605\u2605" }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(core_1.TextField, { required: true, label: "Reason", multiline: true, rows: 3, size: "small", onChange: handleReasonChange, placeholder: "Enter reason for the data hunch", variant: "outlined", style: { paddingTop: '5px', paddingBottom: '5px' } }, void 0), (0, jsx_runtime_1.jsx)(SubmitCancelButtons_1.default, { disableSubmit: !ratingValue || reasonInput.length === 0, dhToSubmit: {
                    type: 'annotation',
                    user: store.userName,
                    label: "".concat(store.selectedDP === undefined ? 'all chart' : store.selectedDP),
                    content: ratingValue,
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    // rating shouldn't have a confidence level?
                    confidenceLevel: 5
                } }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(RatingForm);
