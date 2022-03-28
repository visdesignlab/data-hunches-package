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
import { jsx as _jsx } from "react/jsx-runtime";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useLayoutEffect } from "react";
import Store from "../Interfaces/Store";
import AnnotationForm from "./Forms/AnnotationForm";
import CategoricalForm from "./Forms/CategoricalForm";
import DataSpaceForm from "./Forms/DataSpaceForm";
import ManipulationForm from "./Forms/ManipulationForm";
import ModelInputForm from "./Forms/ModelInputForm";
import RatingForm from "./Forms/RatingForm";
var FormComponent = function () {
    var store = useContext(Store);
    var decide = function () {
        switch (store.inputMode) {
            case 'categorical':
                return _jsx(CategoricalForm, {}, void 0);
            case 'model':
                return _jsx(ModelInputForm, {}, void 0);
            case 'rating':
                return _jsx(RatingForm, {}, void 0);
            case 'data space':
            case 'inclusion':
                return _jsx(DataSpaceForm, { isInc: store.inputMode === 'inclusion' }, void 0);
            case 'annotation':
                return _jsx(AnnotationForm, {}, void 0);
            default:
                return _jsx(ManipulationForm, { manipulationOutput: store.selectedDP ? store.selectedDP : '', type: 'exclusion' }, void 0);
        }
    };
    useLayoutEffect(function () {
        if (store.inputMode === 'none') {
            select('#form-component')
                .style('display', 'none');
        }
        else {
            select('#form-component')
                .style('display', null);
        }
    }, [store.inputMode]);
    return (_jsx("div", __assign({ id: 'form-component', style: {
            textAlign: 'start',
            zIndex: 1000,
            position: 'absolute',
            display: 'none',
            // width: UpDownVoteFOWidth,
            backgroundColor: 'rgb(238, 238, 238, 0.8)'
        } }, { children: decide() }), void 0));
};
export default observer(FormComponent);
