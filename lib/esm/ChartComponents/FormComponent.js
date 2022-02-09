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
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import AnnotationForm from "./AnnotationForm";
var FormComponent = function () {
    var store = useContext(Store);
    var styles = useStyles();
    var formContent = {
        annotation: _jsx(AnnotationForm, {}, void 0),
    };
    return (_jsx("foreignObject", __assign({ id: 'form-component', display: store.inputMode !== 'none' ? undefined : 'none', width: DefaultForeignObjectWidth, height: DefaultForeignObjectHeight }, { children: formContent[store.inputMode] }), void 0));
};
export default observer(FormComponent);
