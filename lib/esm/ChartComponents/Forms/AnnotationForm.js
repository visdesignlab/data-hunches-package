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
import { Container, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";
var AnnotationForm = function () {
    var styles = useStyles();
    var store = useContext(Store);
    var _a = useState(3), confidenceInput = _a[0], setConfidenceInput = _a[1];
    var _b = useState(''), reasonInput = _b[0], setReasonInput = _b[1];
    var _c = useState(''), annotationInput = _c[0], setAnnotationInput = _c[1];
    var handleAnnotationChange = function (event) {
        setAnnotationInput(event.target.value);
    };
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    return (_jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsx(TextField, { style: { paddingBottom: '10px' }, required: true, label: "Annotation Input", variant: "outlined", multiline: true, size: "small", onChange: handleAnnotationChange, rows: 2, placeholder: "Annotate on ".concat(store.selectedDP ? store.selectedDP : 'chart') }, void 0), _jsx(ReasonConfidenceInput, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), _jsx(SubmitCancelButtons, { disableSubmit: annotationInput.length === 0 || reasonInput.length === 0, dhToSubmit: {
                    type: 'annotation',
                    user: store.userName,
                    label: "".concat(store.selectedDP === undefined ? 'all chart' : store.selectedDP),
                    content: annotationInput,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0));
};
export default observer(AnnotationForm);
