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
import { Button, ButtonGroup, Container, } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, } from "react";
import { ControlFOHeight, ControlFOWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import CloseIcon from '@material-ui/icons/Close';
var SpecificControl = function () {
    var store = useContext(Store);
    var styles = useStyles();
    var annotationOnClickHandler = function () {
        store.selectADataPointMode(false);
        store.setInputMode('annotation');
    };
    return (_jsx("foreignObject", __assign({ id: 'specific-control', 
        // display={store.selectingADataPoint ? undefined : 'none'}
        display: 'none', width: ControlFOWidth, height: ControlFOHeight }, { children: _jsx(Container, __assign({ className: styles.foreignObjectContainer }, { children: _jsxs(ButtonGroup
            // ref={divRef}
            , __assign({ 
                // ref={divRef}
                orientation: "vertical", color: "primary", "aria-label": "vertical outlined primary button group" }, { children: [_jsx(Button, __assign({ onClick: annotationOnClickHandler }, { children: "Annotation" }), void 0), _jsx(Button, { children: "Direct Manipulation" }, void 0), _jsx(Button, { children: "Rating" }, void 0), _jsx(Button, { children: "Data Space" }, void 0), _jsx(Button, __assign({ size: "small", onClick: function () {
                            store.setCurrentSelectedDP(undefined);
                            store.selectADataPointMode(false);
                        } }, { children: _jsx(CloseIcon, {}, void 0) }), void 0)] }), void 0) }), void 0) }), void 0));
};
export default observer(SpecificControl);
