"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var styled_components_1 = __importDefault(require("styled-components"));
var SpecificControl = function (_a) {
    var sendManipulation = _a.sendManipulation;
    var store = (0, react_1.useContext)(Store_1.default);
    var styles = (0, StyledComponents_1.useStyles)();
    var clickHandler = function (inputMode) {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
    };
    return ((0, jsx_runtime_1.jsx)("foreignObject", __assign({ id: 'specific-control', 
        // display={store.selectingADataPoint ? undefined : 'none'}
        display: 'none', width: Constants_1.ControlFOWidth, height: store.showCategory ? Constants_1.ControlFOHeight : Constants_1.WithoutCatControlFOHeight }, { children: (0, jsx_runtime_1.jsx)(core_1.Container, __assign({ className: styles.specificControlContainer }, { children: (0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, __assign({ orientation: "vertical", color: "primary", "aria-label": "vertical outlined primary button group" }, { children: [(0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () {
                            clickHandler('manipulations');
                        } }, { children: "Change Size (Manipulation)" }), void 0), (0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () {
                            clickHandler('range');
                        } }, { children: "Specify Range" }), void 0), store.showCategory ? (0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () {
                            clickHandler('categorical');
                        } }, { children: "Categorical" }), void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), (0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () {
                            clickHandler('exclusion');
                        } }, { children: "Remove (Exclusion)" }), void 0), (0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () {
                            clickHandler('data space');
                        } }, { children: "Change Value (Data Space)" }), void 0), (0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () { clickHandler('annotation'); } }, { children: "Annotation" }), void 0), (0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () {
                            clickHandler('rating');
                        } }, { children: "Rating" }), void 0), (0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () {
                            clickHandler('direction');
                            sendManipulation('higher');
                        } }, { children: "Value should be higher." }), void 0), (0, jsx_runtime_1.jsx)(ContextButton, __assign({ onClick: function () {
                            clickHandler('direction');
                            sendManipulation('lower');
                        } }, { children: "Value should be lower." }), void 0)] }), void 0) }), void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(SpecificControl);
var ContextButton = (0, styled_components_1.default)(StyledComponents_1.NonCapButton)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    justify-content: flex-start;\n    font-size:9pt;\n    text-align:start;\n"], ["\n    justify-content: flex-start;\n    font-size:9pt;\n    text-align:start;\n"])));
var templateObject_1;
