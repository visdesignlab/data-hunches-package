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
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var GeneralControl = function () {
    var store = (0, react_1.useContext)(Store_1.default);
    var placeFormLowerRightCorner = function () {
        (0, d3_selection_1.select)('#form-component')
            .attr('x', store.svgWidth - Constants_1.DefaultForeignObjectWidth)
            .attr('y', store.svgHeight - Constants_1.DefaultForeignObjectHeight);
        store.setCurrentSelectedDP(undefined);
    };
    var dhButtonClickHandler = function (inputMode) {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
        placeFormLowerRightCorner();
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, __assign({ color: "primary", "aria-label": "outlined primary button group", disabled: !store.userName, size: 'small' }, { children: [(0, jsx_runtime_1.jsx)(StyledComponents_1.NonCapButton, __assign({ onClick: function () { dhButtonClickHandler('data space'); } }, { children: "Add New Value (Inclusion)" }), void 0), (0, jsx_runtime_1.jsx)(StyledComponents_1.NonCapButton, __assign({ onClick: function () { dhButtonClickHandler('model'); } }, { children: "Transform Data" }), void 0), (0, jsx_runtime_1.jsx)(StyledComponents_1.NonCapButton, __assign({ onClick: function () { dhButtonClickHandler('sketch'); } }, { children: "Add Sketch" }), void 0)] }), void 0) }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(GeneralControl);
