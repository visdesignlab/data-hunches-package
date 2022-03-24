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
import { Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DataPreset, DarkGray } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { ContainerDiv } from "../Interfaces/StyledComponents";
var ChartTitle = function () {
    var store = useContext(Store);
    return (_jsxs(ContainerDiv, { children: [_jsx(Typography, __assign({ style: { fontSize: 'xx-large', color: DarkGray } }, { children: DataPreset[store.dbTag].name }), void 0), _jsx("div", __assign({ style: { textAlign: 'start', color: DarkGray } }, { children: DataPreset[store.dbTag].explanation }), void 0)] }, void 0));
};
export default observer(ChartTitle);
