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
import { Button, ButtonGroup, Container, Menu, MenuItem } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
var GeneralControl = function () {
    var store = useContext(Store);
    var _a = useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var handleMenuClick = function (e) {
        setAnchorEl(e.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var placeFormLowerRightCorner = function () {
        select('#form-component')
            .attr('x', store.svgWidth - DefaultForeignObjectWidth)
            .attr('y', store.svgHeight - DefaultForeignObjectHeight);
        store.setCurrentSelectedDP(undefined);
    };
    var onClickSelectADataPoint = function () {
        handleClose();
        store.selectADataPointMode(true);
        store.setInputMode('none');
    };
    var onClickAnnotation = function () {
        handleClose();
        store.setInputMode('annotation');
        placeFormLowerRightCorner();
    };
    var onClickIncExc = function () {
        store.setInputMode('data space');
        handleClose();
        placeFormLowerRightCorner();
    };
    var onClickModelInput = function () {
        handleClose();
        store.setInputMode('model');
        placeFormLowerRightCorner();
    };
    var onClickGraphical = function () {
        handleClose();
        store.setInputMode('sketch');
        placeFormLowerRightCorner();
    };
    return (_jsxs(Container, __assign({ style: { paddingTop: '5px' } }, { children: [_jsxs(ButtonGroup, __assign({ color: "primary", "aria-label": "outlined primary button group", disabled: !store.userName }, { children: [_jsx(Button, __assign({ onClick: handleMenuClick }, { children: "Chart Input" }), void 0), _jsx(Button, __assign({ onClick: onClickSelectADataPoint }, { children: "Select a Data Point" }), void 0)] }), void 0), _jsxs(Menu, __assign({ id: "simple-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, { children: [_jsx(MenuItem, __assign({ onClick: onClickAnnotation }, { children: "Add Annotations" }), void 0), _jsx(MenuItem, __assign({ onClick: onClickIncExc }, { children: "Inclusion / Exclusion" }), void 0), _jsx(MenuItem, __assign({ onClick: onClickModelInput }, { children: "Model Input" }), void 0), _jsx(MenuItem, __assign({ onClick: onClickGraphical }, { children: "Graphical Annotations" }), void 0)] }), void 0)] }), void 0));
};
export default observer(GeneralControl);
