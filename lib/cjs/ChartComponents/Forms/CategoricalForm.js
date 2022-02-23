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
var __1 = require("../..");
var Constants_1 = require("../../Interfaces/Constants");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var StyledComponents_1 = require("../../Interfaces/StyledComponents");
var ReasonConfidenceInput_1 = __importDefault(require("./ReasonConfidenceInput"));
var SubmitCancelButtons_1 = __importDefault(require("./SubmitCancelButtons"));
var CategoricalForm = function () {
    var styles = (0, StyledComponents_1.useStyles)();
    var store = (0, react_1.useContext)(Store_1.default);
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var _a = (0, react_1.useState)(''), ratingValue = _a[0], setRatingValue = _a[1];
    var _b = (0, react_1.useState)(-1), catNum = _b[0], setCatNum = _b[1];
    (0, react_1.useEffect)(function () {
        var DPinData = dataSet.filter(function (d) { return d.label === store.selectedDP; })[0];
        var tempcatNum = store.containCategory.indexOf(DPinData.categorical || 'a');
        setRatingValue(DPinData.categorical || 'a');
        setCatNum(tempcatNum);
    }, [store.selectedDP]);
    var handleRadioChange = function (event) {
        setRatingValue(event.target.value);
    };
    var _c = (0, react_1.useState)(''), reasonInput = _c[0], setReasonInput = _c[1];
    var _d = (0, react_1.useState)(3), confidenceInput = _d[0], setConfidenceInput = _d[1];
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, __assign({ className: styles.foreignObjectContainer }, { children: [(0, jsx_runtime_1.jsx)(core_1.RadioGroup, __assign({ name: "Rating", onChange: handleRadioChange, value: ratingValue }, { children: store.containCategory.map(function (d, i) {
                    return (0, jsx_runtime_1.jsx)(core_1.FormControlLabel, { value: d, control: (0, jsx_runtime_1.jsx)(core_1.Radio, { size: "small", className: styles.radioStyle }, void 0), label: (0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.catText }, { children: [(0, jsx_runtime_1.jsx)("div", { className: styles.colorBox, style: { backgroundColor: Constants_1.CategoricalColor[i] } }, void 0), d, catNum === i ? '(Original category)' : ''] }), void 0) }, "".concat(d, "-radio"));
                }) }), void 0), (0, jsx_runtime_1.jsx)(ReasonConfidenceInput_1.default, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), (0, jsx_runtime_1.jsx)(SubmitCancelButtons_1.default, { disableSubmit: !ratingValue || reasonInput.length === 0, dhToSubmit: {
                    type: 'categorical',
                    user: store.userName,
                    label: "".concat(store.selectedDP === undefined ? 'all chart' : store.selectedDP),
                    content: ratingValue,
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(CategoricalForm);
