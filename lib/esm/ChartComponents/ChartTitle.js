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
import { Grid, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DataPreset } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
var ChartTitle = function () {
    var store = useContext(Store);
    return (_jsxs(Grid, __assign({ container: true }, { children: [_jsx(Grid, __assign({ item: true, xs: 4 }, { children: _jsx(Typography, __assign({ style: { fontSize: 'xxx-large' } }, { children: DataPreset[store.dbTag].name }), void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 8 }, { children: _jsx("div", { children: DataPreset[store.dbTag].explanation }, void 0) }), void 0)] }), void 0));
};
export default observer(ChartTitle);
