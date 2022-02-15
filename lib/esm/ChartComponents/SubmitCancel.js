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
import { Button, ButtonGroup } from "@material-ui/core";
import { observer } from "mobx-react";
var SubmitCancel = function (_a) {
    var dhToSubmit = _a.dhToSubmit;
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, __assign({ size: 'small' }, { children: "Submit" }), void 0), _jsx(Button, __assign({ size: 'small' }, { children: "Cancel" }), void 0)] }, void 0));
};
export default observer(SubmitCancel);
