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
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale, makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { CategoricalColor, margin } from "../../Interfaces/Constants";
import { DataPreset } from "../../Interfaces/Datasets";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";
import * as rough from 'roughjs/bin/rough';
var CategoricalForm = function () {
    var styles = useStyles();
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var valueScale = makeValueScale(dataSet, store.svgWidth);
    var bandScale = makeBandScale(dataSet, store.svgHeight);
    var categoricalScale = makeCategoricalScale(DataPreset[store.dbTag].categories);
    var _a = useState(undefined), dataPoint = _a[0], setDataPoint = _a[1];
    var _b = useState(''), ratingValue = _b[0], setRatingValue = _b[1];
    useEffect(function () {
        var DPinData = dataSet.filter(function (d) { return d.label === store.selectedDP; })[0];
        setDataPoint(DPinData);
        setRatingValue(DPinData.categorical || 'a');
    }, [store.selectedDP]);
    var handleRadioChange = function (event) {
        setRatingValue(event.target.value);
        if (dataPoint && dataPoint.dataHunchArray) {
            select('#categorical-preview').selectAll('*').remove();
            var drawingG = select('#categorical-preview').node();
            var rc = rough.default.svg(drawingG);
            var catWidth = (valueScale(dataPoint.value) - margin.left - 40) / DataPreset[store.dbTag].categories.length;
            var existingCatHunch = dataPoint.dataHunchArray.filter(function (d) { return d.type === 'categorical'; }).length;
            var xPos = valueScale(dataPoint.value) - 40 - (existingCatHunch + 1) * catWidth;
            var yPos = (bandScale(dataPoint.label) || 0) + 3;
            var sketchyDH = rc.rectangle(xPos, yPos, catWidth, bandScale.bandwidth() - 6, {
                fillStyle: 'zigzag',
                fill: categoricalScale(event.target.value),
                stroke: 'none',
                fillWeight: 10,
                hachureAngle: 20,
                hachureGap: 18,
                roughness: 3,
                strokeWidth: 2
            });
            drawingG.appendChild(sketchyDH);
        }
    };
    var _c = useState(''), reasonInput = _c[0], setReasonInput = _c[1];
    var _d = useState(3), confidenceInput = _d[0], setConfidenceInput = _d[1];
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
