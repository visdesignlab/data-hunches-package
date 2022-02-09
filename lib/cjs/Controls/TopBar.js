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
var AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var TopBar = function () {
    var styles = (0, StyledComponents_1.useStyles)();
    return (0, jsx_runtime_1.jsx)(core_1.AppBar, __assign({ position: "static", color: "transparent", elevation: 2, style: { zIndex: 3 } }, { children: (0, jsx_runtime_1.jsxs)(core_1.Toolbar, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ variant: "h6" }, { children: "Data Hunch Demo" }), void 0), (0, jsx_runtime_1.jsx)("section", __assign({ className: styles.rightToolbar }, { children: (0, jsx_runtime_1.jsx)(core_1.IconButton, { children: (0, jsx_runtime_1.jsx)(AccountCircle_1.default, {}, void 0) }, void 0) }), void 0)] }, void 0) }), void 0);
};
exports.default = (0, mobx_react_1.observer)(TopBar);
