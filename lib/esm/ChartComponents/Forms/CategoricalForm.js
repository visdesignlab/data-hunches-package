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
import { Container, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../..";
import { CategoricalColor, DataPreset } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";
var CategoricalForm = function () {
    var styles = useStyles();
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var _a = useState(''), ratingValue = _a[0], setRatingValue = _a[1];
    useEffect(function () {
        var DPinData = dataSet.filter(function (d) { return d.label === store.selectedDP; })[0];
        setRatingValue(DPinData.categorical || 'a');
    }, [store.selectedDP]);
    var handleRadioChange = function (event) {
        setRatingValue(event.target.value);
    };
    var _b = useState(''), reasonInput = _b[0], setReasonInput = _b[1];
    var _c = useState(3), confidenceInput = _c[0], setConfidenceInput = _c[1];
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    return (_jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsx(RadioGroup, __assign({ name: "Rating", onChange: handleRadioChange, value: ratingValue }, { children: DataPreset[store.dbTag].categories.map(function (d, i) {
                    return _jsx(FormControlLabel, { value: d, control: _jsx(Radio, { style: { paddingTop: '0px', paddingBottom: '0px' }, size: "small", className: styles.radioStyle }, void 0), label: _jsxs("div", __assign({ className: styles.catText }, { children: [_jsx("div", { className: styles.colorBox, style: { backgroundColor: CategoricalColor[i] } }, void 0), d] }), void 0) }, "".concat(d, "-radio"));
                }) }), void 0), _jsx(ReasonConfidenceInput, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), _jsx(SubmitCancelButtons, { disableSubmit: !ratingValue || reasonInput.length === 0, dhToSubmit: {
                    type: 'categorical',
                    user: store.userName,
                    label: "".concat(store.selectedDP === undefined ? 'all chart' : store.selectedDP),
                    content: ratingValue,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput,
                    upvotes: 0,
                    downvotes: 0
                } }, void 0)] }), void 0));
};
export default observer(CategoricalForm);
