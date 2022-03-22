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
import { ButtonGroup } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DataContext } from "../..";
import 'd3-transition';
import Store from "../../Interfaces/Store";
import { handlePreviewOnClick, handleResetOnClick } from "../../HelperFunctions/PreviewReset";
import { NonCapButton } from "../../Interfaces/StyledComponents";
var PreviewResetButtons = function (_a) {
    var labelToPreview = _a.labelToPreview, valueToPreview = _a.valueToPreview, disableButtons = _a.disableButtons, modelInput = _a.modelInput;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var previewHandler = function () {
        store.setNeedToShowPreview(true);
        handlePreviewOnClick(dataSet, labelToPreview, valueToPreview, store.svgHeight, store.svgWidth, store.showCategory, modelInput);
    };
    var resetHandler = function () {
        store.setNeedToShowPreview(false);
        handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.showCategory, store.selectedDP);
    };
    return (_jsxs(ButtonGroup, { children: [_jsx(NonCapButton, __assign({ size: 'small', disabled: disableButtons, onClick: previewHandler }, { children: "Preview" }), void 0), _jsx(NonCapButton, __assign({ size: 'small', disabled: disableButtons, onClick: resetHandler }, { children: "Reset" }), void 0)] }, void 0));
};
export default observer(PreviewResetButtons);
