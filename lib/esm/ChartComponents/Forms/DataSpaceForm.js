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
import { Container, TextField, Grid } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale, makeCategoricalScale, getRectFill } from "../../HelperFunctions/ScaleGenerator";
import { margin } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import PreviewResetButtons from "./PreviewResetButtons";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";
var DataSpaceForm = function (_a) {
    var isInc = _a.isInc;
    var store = useContext(Store);
    var styles = useStyles();
    var data = useContext(DataContext);
    var _b = useState(''), dataInput = _b[0], setDataInput = _b[1];
    var _c = useState(3), confidenceInput = _c[0], setConfidenceInput = _c[1];
    var _d = useState(''), reasonInput = _d[0], setReasonInput = _d[1];
    var _e = useState(''), labelInput = _e[0], setLabelInput = _e[1];
    var sendConfidenceReasonToParent = function (confidenceValue, reason) {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };
    var handleDataInputChange = function (event) {
        setDataInput(event.target.value);
    };
    var handleLabelInput = function (event) {
        setLabelInput(event.target.value);
    };
    useEffect(function () {
        var verticalScale = makeValueScale(data, store.svgHeight);
        var bandScale = makeBandScale(data, store.svgWidth);
        var categoricalScale = makeCategoricalScale(data);
        select('#axis-mask')
            .selectAll('*')
            .remove();
        select('#rectangles-preview')
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr('x', function (d) { return bandScale(d.label) || 0; })
            .attr('width', bandScale.bandwidth())
            .attr("y", function (d) { return verticalScale(d.value); })
            .attr("height", function (d) { return store.svgHeight - margin.bottom - verticalScale(d.value); })
            .attr("fill", function (d) { return getRectFill(d, store.containCategory.length > 0, store.selectedDP, categoricalScale); });
    }, []);
    var checkIfDisable = function () {
        if (isInc && labelInput.length > 0) {
            if (!data.map(function (d) { return d.label; }).includes(labelInput)) {
                return dataInput === '';
            }
            else {
                return false;
            }
        }
        else {
            return dataInput === '';
        }
    };
    var makeDHContent = function () {
        if (isInc) {
            if (data.map(function (d) { return d.label; }).includes(labelInput)) {
                return 'ignore';
            }
            else {
                return dataInput;
            }
        }
        else {
            return dataInput;
        }
    };
    var determineDHType = function () {
        if (isInc) {
            if (data.map(function (d) { return d.label; }).includes(labelInput)) {
                return 'exclusion';
            }
            else {
                return 'inclusion';
            }
        }
        return 'data space';
    };
    return _jsxs(Container, __assign({ className: styles.foreignObjectContainer }, { children: [_jsxs(Grid, __assign({ container: true }, { children: [_jsx(Grid, __assign({ item: true, xs: 6 }, { children: _jsx(TextField, { required: true, onChange: handleLabelInput, label: "Label Input", variant: "outlined", size: "small", error: labelInput.length > 20, value: labelInput, placeholder: "Suggest label to include/exclude", style: { display: isInc ? undefined : 'none', paddingBottom: '5px' } }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: isInc ? 6 : 12 }, { children: _jsx(TextField, { required: true, type: "number", style: { paddingBottom: '5px' }, onChange: handleDataInputChange, value: dataInput, label: "Data Input", inputProps: { step: "0.1" }, variant: "outlined", size: "small", placeholder: "Suggest for ".concat(store.selectedDP) }, void 0) }), void 0)] }), void 0), _jsx(PreviewResetButtons, { disableButtons: checkIfDisable(), modelInput: undefined, labelToPreview: store.selectedDP ? store.selectedDP : labelInput, valueToPreview: dataInput === '' ? undefined : parseFloat(dataInput) }, void 0), _jsx(ReasonConfidenceInput, { updateConfidenceReason: sendConfidenceReasonToParent }, void 0), _jsx(SubmitCancelButtons, { disableSubmit: checkIfDisable() || reasonInput.length === 0, dhToSubmit: {
                    type: determineDHType(),
                    user: store.userName,
                    label: isInc ? labelInput : (store.selectedDP ? store.selectedDP : ''),
                    content: makeDHContent(),
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput
                } }, void 0)] }), void 0);
};
export default observer(DataSpaceForm);
