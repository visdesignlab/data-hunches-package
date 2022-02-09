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
import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@material-ui/core";
import { observer } from "mobx-react";
import { useContext } from "react";
import Store from "../Interfaces/Store";
var CancelButton = function () {
    var store = useContext(Store);
    var cancelClickHandler = function () {
        store.setInputMode('none');
    };
    return _jsx(Button, __assign({ size: 'small', onClick: cancelClickHandler, variant: 'outlined' }, { children: "Cancel" }), void 0);
};
export default observer(CancelButton);
