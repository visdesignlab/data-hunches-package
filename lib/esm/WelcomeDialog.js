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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useTheme } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";
var WelcomeDialog = function () {
    var _a = useState(true), open = _a[0], setOpen = _a[1];
    var theme = useTheme();
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    var handleClose = function () {
        setOpen(false);
    };
    return (_jsxs(Dialog, __assign({ open: open }, { children: [_jsx(DialogTitle, { children: "Welcome to Data Hunch Demo" }, void 0), _jsx(DialogContent, { children: _jsxs(DialogContentText, { children: [_jsx("p", { children: "Welcome to the the demonstrator for the paper \"Data Hunches: Incorporating Personal Knowledge into Visualizations\"." }, void 0), _jsxs("p", { children: ["A ", _jsx("span", __assign({ style: { textDecoration: 'underline', fontWeight: 'bold' } }, { children: "data hunch" }), void 0), " is an analyst's knowledge about how and why the data is an imperfect and partial representation of the phenomena of interest."] }, void 0), _jsx("p", { children: "In this demonstrator, we show some ideas how data hunches could be recorded and visualized, on top of but distinct from data visualizations." }, void 0), _jsx("p", { children: "Browse through the different types of demonstration hunches we pre-recorded, or try recording some of your own by right-clicking a bar or using one of the buttons." }, void 0), _jsxs("p", { children: ["To record a data hunch, use the ", _jsx("span", __assign({ style: { color: theme.palette.primary.main } }, { children: "\"Continue as Guest\"" }), void 0), " feature on the top right."] }, void 0), _jsxs("p", { children: ["Note that ", _jsx("u", { children: "we do not track anything about visitors to this website" }, void 0), "!"] }, void 0)] }, void 0) }, void 0), _jsx(DialogActions, { children: _jsx(Button, __assign({ onClick: handleClose, variant: 'contained', color: "primary" }, { children: "Proceed" }), void 0) }, void 0)] }), void 0));
};
export default observer(WelcomeDialog);
