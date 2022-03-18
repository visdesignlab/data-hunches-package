import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import AnnotationForm from "./Forms/AnnotationForm";
import CategoricalForm from "./Forms/CategoricalForm";
import DataSpaceForm from "./Forms/DataSpaceForm";
import ManipulationForm from "./Forms/ManipulationForm";
import ModelInputForm from "./Forms/ModelInputForm";
import RatingForm from "./Forms/RatingForm";

const FormComponent: FC = () => {

    const store = useContext(Store);

    const formContent = {
        annotation:
            <AnnotationForm />,
        rating:
            <RatingForm />,
        'data space':
            <DataSpaceForm isInc={store.inputMode === 'inclusion'} />,
        categorical:
            <CategoricalForm />,
        model:
            <ModelInputForm />,
        exclusion:
            <ManipulationForm manipulationOutput={store.selectedDP ? store.selectedDP : ''} type='exclusion' />
    };

    return (
        <foreignObject id='form-component'
            display={!['none', 'manipulations', 'sketch', 'range'].includes(store.inputMode) ? undefined : 'none'}
            width={DefaultForeignObjectWidth}
            height={DefaultForeignObjectHeight}>
            {formContent[store.inputMode]}
        </foreignObject>
    );
};

export default observer(FormComponent);