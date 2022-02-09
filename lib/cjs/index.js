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
var react_1 = require("react");
var mobx_react_1 = require("mobx-react");
var BarChart_1 = __importDefault(require("./BarChart"));
var Store_1 = __importDefault(require("./Interfaces/Store"));
var TopBar_1 = __importDefault(require("./Controls/TopBar"));
var core_1 = require("@material-ui/core");
var BarChartWithDH = function (_a) {
    var dataSet = _a.dataSet, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight;
    var store = (0, react_1.useContext)(Store_1.default);
    (0, react_1.useEffect)(function () {
        if (dataSet[0].categorical) {
            store.setContainCategory(true);
        }
    }, [dataSet]);
    store.setWidthHeight(svgWidth, svgHeight);
    return (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(TopBar_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 1 }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: (0, jsx_runtime_1.jsx)(BarChart_1.default, { dataSet: dataSet }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: "table" }), void 0)] }), void 0)] }, void 0);
};
exports.default = (0, mobx_react_1.observer)(BarChartWithDH);
