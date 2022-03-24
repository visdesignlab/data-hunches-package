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
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var StyledComponents_1 = require("../../Interfaces/StyledComponents");
var ReasonConfidenceInput_1 = __importDefault(require("./ReasonConfidenceInput"));
var SubmitCancelButtons_1 = __importDefault(require("./SubmitCancelButtons"));
var AnnotationForm = function () {
    var styles = (0, StyledComponents_1.useStyles)();
    var store = (0, react_1.useContext)(Store_1.default);
    var _a = (0, react_1.useState)(3), confidenceInput = _a[0], setConfidenceInput = _a[1];
    var _b = (0, react_1.useState)(''), reasonInput = _b[0], setReasonInput = _b[1];
    var _c = (0, react_1.useState)(''), annotationInput = _c[0], setAnnotationInput = _c[1];
    var handleAnnotationChange = function (event) {
        setAnnotationInput(event.target.value);
    };
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, __assign({ className: styles.foreignObjectContainer }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextField, { style: { paddingBottom: '10px' }, required: true, label: "Annotation Input", variant: "outlined", multiline: true, size: "small", onChange: handleAnnotationChange, rows: 2, placeholder: "Annotate on ".concat(store.selectedDP ? store.selectedDP : 'chart') }, void 0), (0, jsx_runtime_1.jsx)(ReasonConfidenceInput_1.default, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), (0, jsx_runtime_1.jsx)(SubmitCancelButtons_1.default, { disableSubmit: annotationInput.length === 0 || reasonInput.length === 0, dhToSubmit: {
                    type: 'annotation',
                    user: store.userName,
                    label: "".concat(store.selectedDP === undefined ? 'all chart' : store.selectedDP),
                    content: annotationInput,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput,
                    upvotes: 0,
                    downvotes: 0
                } }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(AnnotationForm);
