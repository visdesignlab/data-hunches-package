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
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var ChartTitle = function () {
    var store = (0, react_1.useContext)(Store_1.default);
    return ((0, jsx_runtime_1.jsxs)(core_1.Container, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ style: { fontSize: 'xx-large', color: Constants_1.DarkGray } }, { children: Constants_1.DataPreset[store.dbTag].name }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ style: { textAlign: 'start', color: Constants_1.DarkGray } }, { children: Constants_1.DataPreset[store.dbTag].explanation }), void 0)] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(ChartTitle);
