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
import { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import BarChart from "./BarChart";
import Store from "./Interfaces/Store";
import TopBar from "./Controls/TopBar";
import { Grid } from "@material-ui/core";
var BarChartWithDH = function (_a) {
    var dataSet = _a.dataSet, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight;
    var store = useContext(Store);
    useEffect(function () {
        if (dataSet[0].categorical) {
            store.setContainCategory(true);
        }
    }, [dataSet]);
    store.setWidthHeight(svgWidth, svgHeight);
    return _jsxs("div", { children: [_jsx(TopBar, {}, void 0), _jsxs(Grid, __assign({ container: true, spacing: 1 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: _jsx(BarChart, { dataSet: dataSet }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: "table" }), void 0)] }), void 0)] }, void 0);
};
export default observer(BarChartWithDH);
