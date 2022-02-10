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
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useStyles } from "../Interfaces/StyledComponents";
var TopBar = function () {
    var styles = useStyles();
    return _jsx(AppBar, __assign({ position: "static", color: "transparent", elevation: 2, style: { zIndex: 3 } }, { children: _jsxs(Toolbar, { children: [_jsx(Typography, __assign({ variant: "h6" }, { children: "Data Hunch Demo" }), void 0), _jsx("section", __assign({ className: styles.rightToolbar }, { children: _jsx(IconButton, { children: _jsx(AccountCircle, {}, void 0) }, void 0) }), void 0)] }, void 0) }), void 0);
};
export default observer(TopBar);
