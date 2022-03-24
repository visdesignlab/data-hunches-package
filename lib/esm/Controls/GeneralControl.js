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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ButtonGroup } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth, } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { NonCapButton, } from "../Interfaces/StyledComponents";
var GeneralControl = function () {
    var store = useContext(Store);
    var placeFormLowerRightCorner = function () {
        select('#form-component')
            .attr('x', store.svgWidth - DefaultForeignObjectWidth)
            .attr('y', store.svgHeight - DefaultForeignObjectHeight);
        store.setCurrentSelectedDP(undefined);
    };
    var dhButtonClickHandler = function (inputMode) {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
        placeFormLowerRightCorner();
    };
    return (_jsx(_Fragment, { children: _jsxs(ButtonGroup, __assign({ color: "primary", "aria-label": "outlined primary button group", disabled: !store.userName, size: 'small' }, { children: [_jsx(NonCapButton, __assign({ onClick: function () { dhButtonClickHandler('data space'); } }, { children: "Add New Value (Inclusion)" }), void 0), _jsx(NonCapButton, __assign({ onClick: function () { dhButtonClickHandler('model'); } }, { children: "Transform Data" }), void 0), _jsx(NonCapButton, __assign({ onClick: function () { dhButtonClickHandler('sketch'); } }, { children: "Add Sketch" }), void 0)] }), void 0) }, void 0));
};
export default observer(GeneralControl);
