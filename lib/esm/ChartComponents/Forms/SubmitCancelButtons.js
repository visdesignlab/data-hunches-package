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
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DataPreset } from "../../Interfaces/Datasets";
import Store from "../../Interfaces/Store";
import { NonCapButton } from "../../Interfaces/StyledComponents";
var SubmitCancelButtons = function (_a) {
    var dhToSubmit = _a.dhToSubmit, disableSubmit = _a.disableSubmit;
    var store = useContext(Store);
    var cancelClickHandler = function () {
        store.setInputMode('none');
        store.setCurrentSelectedDP(undefined);
        store.setNeedToShowPreview(false);
        select('#categorical-preview').selectAll('*').remove();
    };
    var submitClickHandler = function () {
        store.submitDH(dhToSubmit);
        store.setInputMode('none');
        store.setCurrentSelectedDP(undefined);
        store.setNeedToShowPreview(false);
        select('#categorical-preview').selectAll('*').remove();
    };
    var checkIfLocked = function () {
        console.log(store.dbTag, DataPreset[store.dbTag].lock);
        console.log(typeof store.currentVol);
        console.log(DataPreset[store.dbTag].lock.includes(store.currentVol));
        return DataPreset[store.dbTag].lock.includes(store.currentVol);
    };
    return _jsxs(ButtonGroup, __assign({ style: { display: 'block' } }, { children: [_jsx(NonCapButton, __assign({ size: 'small', onClick: submitClickHandler, disabled: disableSubmit || checkIfLocked() }, { children: "Submit" }), void 0), _jsx(NonCapButton, __assign({ size: 'small', onClick: cancelClickHandler, variant: 'outlined' }, { children: "Cancel" }), void 0)] }), void 0);
};
export default observer(SubmitCancelButtons);
