var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonGroup, Container } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, } from "react";
import { ControlFOHeight, ControlFOWidth, WithoutCatControlFOHeight } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { NonCapButton, useStyles } from "../Interfaces/StyledComponents";
import styled from "styled-components";
var SpecificControl = function () {
    var store = useContext(Store);
    var styles = useStyles();
    var clickHandler = function (inputMode) {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
    };
    return (_jsx("foreignObject", __assign({ id: 'specific-control', 
        // display={store.selectingADataPoint ? undefined : 'none'}
        display: 'none', width: ControlFOWidth, height: store.showCategory ? ControlFOHeight : WithoutCatControlFOHeight }, { children: _jsx(Container, __assign({ className: styles.specificControlContainer }, { children: _jsxs(ButtonGroup, __assign({ orientation: "vertical", color: "primary", "aria-label": "vertical outlined primary button group" }, { children: [_jsx(ContextButton, __assign({ onClick: function () { clickHandler('annotation'); } }, { children: "Annotation" }), void 0), _jsx(ContextButton, __assign({ onClick: function () {
                            clickHandler('range');
                        } }, { children: "Range" }), void 0), _jsx(ContextButton, __assign({ onClick: function () {
                            clickHandler('manipulations');
                        } }, { children: "Manipulation" }), void 0), _jsx(ContextButton, __assign({ onClick: function () {
                            clickHandler('rating');
                        } }, { children: "Rating" }), void 0), _jsx(ContextButton, __assign({ onClick: function () {
                            clickHandler('data space');
                        } }, { children: "Data Space" }), void 0), _jsx(ContextButton, __assign({ onClick: function () {
                            clickHandler('exclusion');
                        } }, { children: "Exclusion" }), void 0), store.showCategory ? _jsx(ContextButton, __assign({ onClick: function () {
                            clickHandler('categorical');
                        } }, { children: "Categorical" }), void 0) : _jsx(_Fragment, {}, void 0)] }), void 0) }), void 0) }), void 0));
};
export default observer(SpecificControl);
var ContextButton = styled(NonCapButton)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\njustify-content: flex-start\n"], ["\njustify-content: flex-start\n"])));
var templateObject_1;
