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
var mobx_react_1 = require("mobx-react");
var react_1 = require("react");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var GeneralControl = function () {
    var store = (0, react_1.useContext)(Store_1.default);
    var onClickSelectADataPoint = function () {
        store.selectADataPointMode(true);
    };
    return ((0, jsx_runtime_1.jsx)(core_1.Container, __assign({ style: { paddingTop: '5px' } }, { children: (0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, __assign({ color: "primary", "aria-label": "outlined primary button group" }, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, { children: "Add Annotations" }, void 0), (0, jsx_runtime_1.jsx)(core_1.Button, { children: "Inclusion/Exclusion" }, void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ onClick: onClickSelectADataPoint }, { children: "Select a Data Point" }), void 0)] }), void 0) }), void 0));
};
exports.default = (0, mobx_react_1.observer)(GeneralControl);
