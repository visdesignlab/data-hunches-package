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
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import AnnotationForm from "./Forms/AnnotationForm";
import CategoricalForm from "./Forms/CategoricalForm";
import DataSpaceForm from "./Forms/DataSpaceForm";
import ManipulationForm from "./Forms/ManipulationForm";
import ModelInputForm from "./Forms/ModelInputForm";
import RatingForm from "./Forms/RatingForm";
var FormComponent = function (_a) {
    var manipulationOutput = _a.manipulationOutput;
    var store = useContext(Store);
    var formContent = {
        annotation: _jsx(AnnotationForm, {}, void 0),
        rating: _jsx(RatingForm, {}, void 0),
        'data space': _jsx(DataSpaceForm, { isIncExc: !store.selectedDP }, void 0),
        manipulations: _jsx(ManipulationForm, { manipulationOutput: manipulationOutput, type: 'manipulations' }, void 0),
        categorical: _jsx(CategoricalForm, {}, void 0),
        model: _jsx(ModelInputForm, {}, void 0)
    };
    return (_jsx("foreignObject", __assign({ id: 'form-component', display: store.inputMode !== 'none' ? undefined : 'none', width: DefaultForeignObjectWidth, height: DefaultForeignObjectHeight }, { children: formContent[store.inputMode] }), void 0));
};
export default observer(FormComponent);
