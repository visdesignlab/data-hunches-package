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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Button, ButtonGroup, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useStyles } from "../Interfaces/StyledComponents";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useContext } from "react";
import Store from "../Interfaces/Store";
import GeneralControl from "./GeneralControl";
import DemoOptionButtons from "./DemoOptionButtons";
var TopBar = function () {
    var styles = useStyles();
    var store = useContext(Store);
    var _a = useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var handleMenu = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var responseGoogle = function (response) {
        store.setUserName(response.profileObj.name);
    };
    return _jsx(AppBar, __assign({ position: "static", color: "transparent", elevation: 2, style: { zIndex: 3 } }, { children: _jsxs(Toolbar, { children: [_jsx(Typography, __assign({ variant: "h6", style: { paddingRight: '5px' } }, { children: "Data Hunch Demo" }), void 0), _jsx(GeneralControl, {}, void 0), _jsxs("div", __assign({ className: styles.rightToolbar }, { children: [store.userName ?
                            _jsx(DemoOptionButtons, {}, void 0) : _jsx(_Fragment, {}, void 0), store.userName ?
                            _jsxs(Button, __assign({ onClick: handleMenu, size: 'small', variant: "outlined", color: "primary" }, { children: ["Signed in as ".concat(store.userName), _jsx(AccountCircle, {}, void 0)] }), void 0) :
                            _jsxs(ButtonGroup, { children: [_jsx(Button, __assign({ size: 'small', variant: 'outlined', onClick: function () { store.setUserName('Guest'); }, color: 'primary' }, { children: "Continue as Guest" }), void 0), _jsx(GoogleLogin, { clientId: "565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com", render: function (renderProps) { return (_jsxs(Button, __assign({ onClick: renderProps.onClick, size: 'small', variant: "outlined", color: "primary", disabled: renderProps.disabled }, { children: ["Sign in with Google", _jsx(AccountCircle, {}, void 0)] }), void 0)); }, buttonText: "Login", onSuccess: responseGoogle, onFailure: function () { console.log('failed'); }, cookiePolicy: 'single_host_origin', isSignedIn: true }, void 0)] }, void 0)] }), void 0), _jsxs(Menu, __assign({ id: "menu-appbar", anchorEl: anchorEl, keepMounted: true, open: open, onClose: handleClose }, { children: [_jsx(GoogleLogin, { clientId: "565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com", render: function (renderProps) { return (_jsx(MenuItem, __assign({ onClick: function () {
                                    handleClose();
                                    renderProps.onClick();
                                } }, { children: "Change Account" }), 'change-account')); }, buttonText: "Login", onSuccess: responseGoogle, onFailure: function () { console.log('failed'); }, cookiePolicy: 'single_host_origin', isSignedIn: true }, void 0), _jsx(GoogleLogout, { clientId: "565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com", onLogoutSuccess: function () { store.setUserName(''); }, onFailure: function () { console.log('failed'); }, render: function (renderProps) { return (_jsx(MenuItem, __assign({ onClick: function () { handleClose(); renderProps.onClick(); } }, { children: "Log Out" }), 'log-out')); } }, void 0)] }), void 0)] }, void 0) }), void 0);
};
export default observer(TopBar);
