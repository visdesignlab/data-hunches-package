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
var ReasonConfidenceInput_1 = __importDefault(require("./ReasonConfidenceInput"));
var SubmitCancelButtons_1 = __importDefault(require("./SubmitCancelButtons"));
var ManipulationForm = function (_a) {
    var manipulationOutput = _a.manipulationOutput;
    var styles = (0, StyledComponents_1.useStyles)();
    var store = (0, react_1.useContext)(Store_1.default);
    var _b = (0, react_1.useState)(3), confidenceInput = _b[0], setConfidenceInput = _b[1];
    var _c = (0, react_1.useState)(''), reasonInput = _c[0], setReasonInput = _c[1];
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    var calculateType = function () {
        var parsedResult = JSON.parse('[' + manipulationOutput + ']');
        return parsedResult.length > 1 ? 'range' : 'manipulations';
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, __assign({ className: styles.foreignObjectContainer }, { children: [(0, jsx_runtime_1.jsx)(ReasonConfidenceInput_1.default, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), (0, jsx_runtime_1.jsx)(SubmitCancelButtons_1.default, { disableSubmit: reasonInput.length === 0 || manipulationOutput === '', dhToSubmit: {
                    type: calculateType(),
                    user: store.userName,
                    label: "".concat(store.selectedDP === undefined ? 'all chart' : store.selectedDP),
                    // Add Content
                    content: manipulationOutput,
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(ManipulationForm);
