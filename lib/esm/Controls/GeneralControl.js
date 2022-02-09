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
import { Button, ButtonGroup, Container } from "@material-ui/core";
import { observer } from "mobx-react";
import { useContext } from "react";
import Store from "../Interfaces/Store";
var GeneralControl = function () {
    var store = useContext(Store);
    var onClickSelectADataPoint = function () {
        store.selectADataPointMode(true);
    };
    return (_jsx(Container, __assign({ style: { paddingTop: '5px' } }, { children: _jsxs(ButtonGroup, __assign({ color: "primary", "aria-label": "outlined primary button group" }, { children: [_jsx(Button, { children: "Add Annotations" }, void 0), _jsx(Button, { children: "Inclusion/Exclusion" }, void 0), _jsx(Button, __assign({ onClick: onClickSelectADataPoint }, { children: "Select a Data Point" }), void 0)] }), void 0) }), void 0));
};
export default observer(GeneralControl);
