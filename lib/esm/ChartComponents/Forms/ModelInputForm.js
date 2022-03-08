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
import { parse } from "mathjs";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import PreviewResetButtons from "./PreviewResetButtons";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";
var ModelInputForm = function () {
    var styles = useStyles();
    var store = useContext(Store);
    var _a = useState(3), confidenceInput = _a[0], setConfidenceInput = _a[1];
    var _b = useState(''), reasonInput = _b[0], setReasonInput = _b[1];
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    var _c = useState(''), modelInput = _c[0], setModelInput = _c[1];
    var checkIfDisable = function () {
        try {
            var parseResult = parse(modelInput);
            return false;
        }
        catch (error) {
            return true;
        }
    };
    return (_jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsx(TextField, { required: true, style: { paddingBottom: '5px' }, onChange: function (e) { setModelInput(e.target.value); }, value: modelInput, label: "Model Input with x", inputProps: { step: "0.1" }, variant: "outlined", size: "small", placeholder: "i.e., x+1" }, void 0), _jsx(PreviewResetButtons, { disableButtons: checkIfDisable(), modelInput: modelInput, labelToPreview: undefined, valueToPreview: undefined }, void 0), _jsx(ReasonConfidenceInput, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), _jsx(SubmitCancelButtons, { disableSubmit: reasonInput.length === 0 || modelInput === '', dhToSubmit: {
                    type: 'model',
                    user: store.userName,
                    label: 'all chart',
                    // Add Content
                    content: modelInput,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0));
};
export default observer(ModelInputForm);
