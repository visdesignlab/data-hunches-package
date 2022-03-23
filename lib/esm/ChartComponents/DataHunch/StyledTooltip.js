import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Tooltip, withStyles } from "@material-ui/core";
import { generateHunchText } from "../../HelperFunctions/GenerateHunchText";
var StyledTooltip = function (_a) {
    var dataHunch = _a.dataHunch, childrenComponent = _a.childrenComponent;
    return (_jsx(LightTooltip, { children: childrenComponent, title: _jsxs("div", { children: [_jsxs("div", { children: ["Content: ", generateHunchText(dataHunch.type, dataHunch.content, dataHunch.label)] }, void 0), _jsxs("div", { children: ["Reasoning: ", dataHunch.reasoning] }, void 0), _jsxs("div", { children: ["Confidence:", dataHunch.confidenceLevel] }, void 0), _jsxs("div", { children: ["Author:", dataHunch.user] }, void 0)] }, void 0) }, void 0));
};
export default StyledTooltip;
var LightTooltip = withStyles(function (theme) { return ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: '#0c0c0c',
        boxShadow: theme.shadows[1],
        fontSize: 20,
        fontFamily: "'Nanum Brush Script', cursive",
        fontWeight: 'bold'
    },
}); })(Tooltip);
