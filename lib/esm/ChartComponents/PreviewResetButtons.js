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
import { ButtonGroup, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
var PreviewResetButtons = function (_a) {
    var labelToPreview = _a.labelToPreview, valueToPreview = _a.valueToPreview, disableButtons = _a.disableButtons;
    var handlePreviewOnClick = function () {
    };
    var handleResetOnClick = function () {
    };
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, __assign({ size: 'small', disabled: disableButtons, onClick: handlePreviewOnClick }, { children: "Preview" }), void 0), _jsx(Button, __assign({ size: 'small', disabled: disableButtons, onClick: handleResetOnClick }, { children: "Reset" }), void 0)] }, void 0));
};
export default observer(PreviewResetButtons);
