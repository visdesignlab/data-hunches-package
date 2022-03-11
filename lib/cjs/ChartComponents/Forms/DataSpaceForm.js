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
var d3_selection_1 = require("d3-selection");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var react_2 = require("react");
var __1 = require("../..");
var ScaleGenerator_1 = require("../../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../../Interfaces/Constants");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var StyledComponents_1 = require("../../Interfaces/StyledComponents");
var PreviewResetButtons_1 = __importDefault(require("./PreviewResetButtons"));
var ReasonConfidenceInput_1 = __importDefault(require("./ReasonConfidenceInput"));
var SubmitCancelButtons_1 = __importDefault(require("./SubmitCancelButtons"));
var DataSpaceForm = function (_a) {
    var isIncExc = _a.isIncExc;
    var store = (0, react_1.useContext)(Store_1.default);
    var styles = (0, StyledComponents_1.useStyles)();
    var data = (0, react_1.useContext)(__1.DataContext);
    var _b = (0, react_2.useState)(''), dataInput = _b[0], setDataInput = _b[1];
    var _c = (0, react_2.useState)(3), confidenceInput = _c[0], setConfidenceInput = _c[1];
    var _d = (0, react_2.useState)(''), reasonInput = _d[0], setReasonInput = _d[1];
    var _e = (0, react_2.useState)(''), labelInput = _e[0], setLabelInput = _e[1];
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    var handleDataInputChange = function (event) {
        setDataInput(event.target.value);
    };
    var handleLabelInput = function (event) {
        setLabelInput(event.target.value);
    };
    (0, react_1.useEffect)(function () {
        var verticalScale = (0, ScaleGenerator_1.makeValueScale)(data, store.svgHeight);
        var bandScale = (0, ScaleGenerator_1.makeBandScale)(data, store.svgWidth);
        var categoricalScale = (0, ScaleGenerator_1.makeCategoricalScale)(data);
        (0, d3_selection_1.select)('#axis-mask')
            .selectAll('*')
            .remove();
        (0, d3_selection_1.select)('#rectangles-preview')
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr('x', function (d) { return bandScale(d.label) || 0; })
            .attr('width', bandScale.bandwidth())
            .attr("y", function (d) { return verticalScale(d.value); })
            .attr("height", function (d) { return store.svgHeight - Constants_1.margin.bottom - verticalScale(d.value); })
            .attr("fill", function (d) { return (0, ScaleGenerator_1.getRectFill)(d, store.containCategory.length > 0, store.selectedDP, categoricalScale); });
    }, []);
    var checkIfDisable = function () {
        if (isIncExc && labelInput.length > 0) {
            if (!data.map(function (d) { return d.label; }).includes(labelInput)) {
                return dataInput === '';
            }
            else {
                return false;
            }
        }
        else {
            return dataInput === '';
        }
    };
    var makeDHContent = function () {
        if (isIncExc) {
            if (data.map(function (d) { return d.label; }).includes(labelInput)) {
                return 'ignore';
            }
            else {
                return dataInput;
            }
        }
        else {
            return dataInput;
        }
    };
    var determineDHType = function () {
        if (isIncExc) {
            if (data.map(function (d) { return d.label; }).includes(labelInput)) {
                return 'exclusion';
            }
            else {
                return 'inclusion';
            }
        }
        return 'data space';
    };
    return (0, jsx_runtime_1.jsxs)(core_1.Container, __assign({ className: styles.foreignObjectContainer }, { children: [(0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 6 }, { children: (0, jsx_runtime_1.jsx)(core_1.TextField, { required: true, onChange: handleLabelInput, label: "Label Input", variant: "outlined", size: "small", error: labelInput.length > 20, value: labelInput, placeholder: "Suggest label to include/exclude", style: { display: isIncExc ? undefined : 'none', paddingBottom: '5px' } }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: isIncExc ? 6 : 12 }, { children: (0, jsx_runtime_1.jsx)(core_1.TextField, { required: true, type: "number", style: { paddingBottom: '5px' }, onChange: handleDataInputChange, value: dataInput, label: "Data Input", inputProps: { step: "0.1" }, variant: "outlined", size: "small", placeholder: "Suggest for ".concat(store.selectedDP) }, void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(PreviewResetButtons_1.default, { disableButtons: checkIfDisable(), modelInput: undefined, labelToPreview: store.selectedDP ? store.selectedDP : labelInput, valueToPreview: dataInput === '' ? undefined : parseFloat(dataInput) }, void 0), (0, jsx_runtime_1.jsx)(ReasonConfidenceInput_1.default, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), (0, jsx_runtime_1.jsx)(SubmitCancelButtons_1.default, { disableSubmit: checkIfDisable() || reasonInput.length === 0, dhToSubmit: {
                    type: determineDHType(),
                    user: store.userName,
                    label: isIncExc ? labelInput : (store.selectedDP ? store.selectedDP : ''),
                    content: makeDHContent(),
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0);
};
exports.default = (0, mobx_react_lite_1.observer)(DataSpaceForm);
