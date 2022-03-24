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
var GenerateHunchText_1 = require("../../HelperFunctions/GenerateHunchText");
var Constants_1 = require("../../Interfaces/Constants");
var StyledTooltip = function (_a) {
    var dataHunch = _a.dataHunch, childrenComponent = _a.childrenComponent;
    return ((0, jsx_runtime_1.jsx)(LightTooltip, { children: childrenComponent, title: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Content: ", (0, GenerateHunchText_1.generateHunchText)(dataHunch.type, dataHunch.content, dataHunch.label)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Reasoning: ", dataHunch.reasoning] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Confidence:", dataHunch.confidenceLevel] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Author:", dataHunch.user] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Upvotes: ", (0, jsx_runtime_1.jsx)("span", __assign({ style: { textDecoration: 'underline' } }, { children: dataHunch.upvotes }), void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Downvotes: ", (0, jsx_runtime_1.jsx)("span", __assign({ style: { textDecoration: 'underline' } }, { children: dataHunch.downvotes }), void 0)] }, void 0)] }, void 0) }, void 0));
};
exports.default = StyledTooltip;
var LightTooltip = (0, core_1.withStyles)(function (theme) { return ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: Constants_1.DarkGray,
        boxShadow: theme.shadows[1],
        fontSize: 20,
        fontFamily: "'Nanum Brush Script', cursive",
        fontWeight: 'bold'
    },
}); })(core_1.Tooltip);
