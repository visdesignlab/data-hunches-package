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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var WelcomeDialog = function () {
    var _a = (0, react_1.useState)(true), open = _a[0], setOpen = _a[1];
    var theme = (0, core_1.useTheme)();
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    var handleClose = function () {
        setOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Dialog, __assign({ open: open }, { children: [(0, jsx_runtime_1.jsx)(core_1.DialogTitle, { children: "Welcome to Data Hunch Demo" }, void 0), (0, jsx_runtime_1.jsx)(core_1.DialogContent, { children: (0, jsx_runtime_1.jsxs)(core_1.DialogContentText, { children: [(0, jsx_runtime_1.jsx)("p", { children: "Welcome to the the demonstrator for the paper \"Data Hunches: Incorporating Personal Knowledge into Visualizations\"." }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["A ", (0, jsx_runtime_1.jsx)("span", __assign({ style: { textDecoration: 'underline', fontWeight: 'bold' } }, { children: "data hunch" }), void 0), " is an analyst's knowledge about how and why the data is an imperfect and partial representation of the phenomena of interest."] }, void 0), (0, jsx_runtime_1.jsx)("p", { children: "In this demonstrator, we show some ideas how data hunches could be recorded and visualized, on top of but distinct from data visualizations." }, void 0), (0, jsx_runtime_1.jsx)("p", { children: "Browse through the different types of demonstration hunches we pre-recorded, or try recording some of your own by right-clicking a bar or using one of the buttons." }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["To record a data hunch, use the ", (0, jsx_runtime_1.jsx)("span", __assign({ style: { color: theme.palette.primary.main } }, { children: "\"Continue as Guest\"" }), void 0), " feature on the top right."] }, void 0), (0, jsx_runtime_1.jsxs)("p", { children: ["Note that ", (0, jsx_runtime_1.jsx)("u", { children: "we do not track anything about visitors to this website" }, void 0), "!"] }, void 0)] }, void 0) }, void 0), (0, jsx_runtime_1.jsx)(core_1.DialogActions, { children: (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ onClick: handleClose, variant: 'contained', color: "primary" }, { children: "Proceed" }), void 0) }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(WelcomeDialog);
