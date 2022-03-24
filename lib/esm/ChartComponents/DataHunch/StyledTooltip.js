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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Tooltip, withStyles } from "@material-ui/core";
import { generateHunchText } from "../../HelperFunctions/GenerateHunchText";
import { DarkGray } from "../../Interfaces/Constants";
var StyledTooltip = function (_a) {
    var dataHunch = _a.dataHunch, childrenComponent = _a.childrenComponent;
    return (_jsx(LightTooltip, { children: childrenComponent, title: _jsxs("div", { children: [_jsxs("div", { children: ["Content: ", generateHunchText(dataHunch.type, dataHunch.content, dataHunch.label)] }, void 0), _jsxs("div", { children: ["Reasoning: ", dataHunch.reasoning] }, void 0), _jsxs("div", { children: ["Confidence:", dataHunch.confidenceLevel] }, void 0), _jsxs("div", { children: ["Author:", dataHunch.user] }, void 0), _jsxs("div", { children: ["Upvotes: ", _jsx("span", __assign({ style: { textDecoration: 'underline' } }, { children: dataHunch.upvotes }), void 0)] }, void 0), _jsxs("div", { children: ["Downvotes: ", _jsx("span", __assign({ style: { textDecoration: 'underline' } }, { children: dataHunch.downvotes }), void 0)] }, void 0)] }, void 0) }, void 0));
};
export default StyledTooltip;
var LightTooltip = withStyles(function (theme) { return ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: DarkGray,
        boxShadow: theme.shadows[1],
        fontSize: 20,
        fontFamily: "'Nanum Brush Script', cursive",
        fontWeight: 'bold'
    },
}); })(Tooltip);
