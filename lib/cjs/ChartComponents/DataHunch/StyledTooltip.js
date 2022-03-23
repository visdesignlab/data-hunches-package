"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var GenerateHunchText_1 = require("../../HelperFunctions/GenerateHunchText");
var StyledTooltip = function (_a) {
    var dataHunch = _a.dataHunch, childrenComponent = _a.childrenComponent;
    return ((0, jsx_runtime_1.jsx)(LightTooltip, { children: childrenComponent, title: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Content: ", (0, GenerateHunchText_1.generateHunchText)(dataHunch.type, dataHunch.content, dataHunch.label)] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Reasoning: ", dataHunch.reasoning] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Confidence:", dataHunch.confidenceLevel] }, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Author:", dataHunch.user] }, void 0)] }, void 0) }, void 0));
};
exports.default = StyledTooltip;
var LightTooltip = (0, core_1.withStyles)(function (theme) { return ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: '#0c0c0c',
        boxShadow: theme.shadows[1],
        fontSize: 20,
        fontFamily: "'Nanum Brush Script', cursive",
        fontWeight: 'bold'
    },
}); })(core_1.Tooltip);
