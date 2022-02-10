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
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import Store from "../Interfaces/Store";
var SubmitCancelButtons = function (_a) {
    var dhToSubmit = _a.dhToSubmit, disableSubmit = _a.disableSubmit;
    var store = useContext(Store);
    var cancelClickHandler = function () {
        store.setInputMode('none');
        store.setCurrentSelectedDP(undefined);
    };
    var submitClickHandler = function () {
        console.log(dhToSubmit);
        store.submitDH(dhToSubmit);
        store.setInputMode('none');
        store.setCurrentSelectedDP(undefined);
    };
    return _jsxs(ButtonGroup, { children: [_jsx(Button, __assign({ size: 'small', onClick: submitClickHandler, disabled: disableSubmit }, { children: "Submit" }), void 0), _jsx(Button, __assign({ size: 'small', onClick: cancelClickHandler, variant: 'outlined' }, { children: "Cancel" }), void 0)] }, void 0);
};
export default observer(SubmitCancelButtons);
