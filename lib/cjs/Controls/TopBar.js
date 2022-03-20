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
var AccountCircle_1 = __importDefault(require("@material-ui/icons/AccountCircle"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var react_google_login_1 = require("react-google-login");
var react_2 = require("react");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var GeneralControl_1 = __importDefault(require("./GeneralControl"));
var DemoOptionButtons_1 = __importDefault(require("./DemoOptionButtons"));
var TopBar = function () {
    var styles = (0, StyledComponents_1.useStyles)();
    var store = (0, react_2.useContext)(Store_1.default);
    var _a = (0, react_1.useState)(null), anchorEl = _a[0], setAnchorEl = _a[1];
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
    return (0, jsx_runtime_1.jsx)(core_1.AppBar, __assign({ position: "static", color: "transparent", elevation: 2, style: { zIndex: 3 } }, { children: (0, jsx_runtime_1.jsxs)(core_1.Toolbar, { children: [(0, jsx_runtime_1.jsx)(core_1.Typography, __assign({ variant: "h6", style: { paddingRight: '5px' } }, { children: "Data Hunch Demo" }), void 0), (0, jsx_runtime_1.jsx)(GeneralControl_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)("div", __assign({ className: styles.rightToolbar }, { children: [store.userName ?
                            (0, jsx_runtime_1.jsx)(DemoOptionButtons_1.default, {}, void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), store.userName ?
                            (0, jsx_runtime_1.jsxs)(core_1.Button, __assign({ onClick: handleMenu, size: 'small', variant: "outlined", color: "primary" }, { children: ["Signed in as ".concat(store.userName), (0, jsx_runtime_1.jsx)(AccountCircle_1.default, {}, void 0)] }), void 0) :
                            (0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, __assign({ size: 'small', variant: 'outlined', onClick: function () { store.setUserName('Guest'); }, color: 'primary' }, { children: "Continue as Guest" }), void 0), (0, jsx_runtime_1.jsx)(react_google_login_1.GoogleLogin, { clientId: "565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com", render: function (renderProps) { return ((0, jsx_runtime_1.jsxs)(core_1.Button, __assign({ onClick: renderProps.onClick, size: 'small', variant: "outlined", color: "primary", disabled: renderProps.disabled }, { children: ["Sign in with Google", (0, jsx_runtime_1.jsx)(AccountCircle_1.default, {}, void 0)] }), void 0)); }, buttonText: "Login", onSuccess: responseGoogle, onFailure: function () { console.log('failed'); }, cookiePolicy: 'single_host_origin', isSignedIn: true }, void 0)] }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(core_1.Menu, __assign({ id: "menu-appbar", anchorEl: anchorEl, keepMounted: true, open: open, onClose: handleClose }, { children: [(0, jsx_runtime_1.jsx)(react_google_login_1.GoogleLogin, { clientId: "565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com", render: function (renderProps) { return ((0, jsx_runtime_1.jsx)(core_1.MenuItem, __assign({ onClick: function () {
                                    handleClose();
                                    renderProps.onClick();
                                } }, { children: "Change Account" }), 'change-account')); }, buttonText: "Login", onSuccess: responseGoogle, onFailure: function () { console.log('failed'); }, cookiePolicy: 'single_host_origin', isSignedIn: true }, void 0), (0, jsx_runtime_1.jsx)(react_google_login_1.GoogleLogout, { clientId: "565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com", onLogoutSuccess: function () { store.setUserName(''); }, onFailure: function () { console.log('failed'); }, render: function (renderProps) { return ((0, jsx_runtime_1.jsx)(core_1.MenuItem, __assign({ onClick: function () { handleClose(); renderProps.onClick(); } }, { children: "Log Out" }), 'log-out')); } }, void 0)] }), void 0)] }, void 0) }), void 0);
};
exports.default = (0, mobx_react_lite_1.observer)(TopBar);
