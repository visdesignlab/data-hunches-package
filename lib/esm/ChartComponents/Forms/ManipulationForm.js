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
import { Container } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";
var ManipulationForm = function (_a) {
    var manipulationOutput = _a.manipulationOutput, type = _a.type;
    var styles = useStyles();
    var store = useContext(Store);
    var _b = useState(3), confidenceInput = _b[0], setConfidenceInput = _b[1];
    var _c = useState(''), reasonInput = _c[0], setReasonInput = _c[1];
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    return (_jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsx(ReasonConfidenceInput, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), _jsx(SubmitCancelButtons, { disableSubmit: reasonInput.length === 0 || manipulationOutput === '', dhToSubmit: {
                    type: type,
                    user: store.userName,
                    label: "".concat(store.selectedDP === undefined ? 'all chart' : store.selectedDP),
                    content: manipulationOutput,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput,
                    upvotes: 0,
                    downvotes: 0
                } }, void 0)] }), void 0));
};
export default observer(ManipulationForm);
