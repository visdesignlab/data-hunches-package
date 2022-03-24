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
var mathjs_1 = require("mathjs");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var StyledComponents_1 = require("../../Interfaces/StyledComponents");
var PreviewResetButtons_1 = __importDefault(require("./PreviewResetButtons"));
var ReasonConfidenceInput_1 = __importDefault(require("./ReasonConfidenceInput"));
var SubmitCancelButtons_1 = __importDefault(require("./SubmitCancelButtons"));
var ModelInputForm = function () {
    var styles = (0, StyledComponents_1.useStyles)();
    var store = (0, react_1.useContext)(Store_1.default);
    var _a = (0, react_1.useState)(3), confidenceInput = _a[0], setConfidenceInput = _a[1];
    var _b = (0, react_1.useState)(''), reasonInput = _b[0], setReasonInput = _b[1];
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    var _c = (0, react_1.useState)(''), modelInput = _c[0], setModelInput = _c[1];
    var checkIfDisable = function () {
        try {
            var parseResult = (0, mathjs_1.parse)(modelInput);
            return false;
        }
        catch (error) {
            return true;
        }
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, __assign({ className: styles.foreignObjectContainer }, { children: [(0, jsx_runtime_1.jsx)(core_1.TextField, { required: true, style: { paddingBottom: '5px' }, onChange: function (e) { setModelInput(e.target.value); }, value: modelInput, label: "Model Input with x", inputProps: { step: "0.1" }, variant: "outlined", size: "small", placeholder: "i.e., x+1" }, void 0), (0, jsx_runtime_1.jsx)(PreviewResetButtons_1.default, { disableButtons: checkIfDisable(), modelInput: modelInput, labelToPreview: undefined, valueToPreview: undefined }, void 0), (0, jsx_runtime_1.jsx)(ReasonConfidenceInput_1.default, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), (0, jsx_runtime_1.jsx)(SubmitCancelButtons_1.default, { disableSubmit: reasonInput.length === 0 || modelInput === '', dhToSubmit: {
                    type: 'model',
                    user: store.userName,
                    label: 'all chart',
                    // Add Content
                    content: modelInput,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput,
                    upvotes: 0,
                    downvotes: 0
                } }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(ModelInputForm);
