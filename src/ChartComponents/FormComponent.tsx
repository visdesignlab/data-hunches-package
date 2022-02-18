import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import AnnotationForm from "./Forms/AnnotationForm";
import CategoricalForm from "./Forms/CategoricalForm";
import DataSpaceForm from "./Forms/DataSpaceForm";
import ManipulationForm, { ManipulationProps } from "./Forms/ManipulationForm";
import ModelInputForm from "./Forms/ModelInputForm";
import RatingForm from "./Forms/RatingForm";

const FormComponent: FC<ManipulationProps> = ({ manipulationOutput }: ManipulationProps) => {

    const store = useContext(Store);

    const formContent = {
        annotation:
            <AnnotationForm />,
        rating:
            <RatingForm />,
        dataSpace:
            <DataSpaceForm isIncExc={!store.selectedDP} />,
        manipulation:
            <ManipulationForm manipulationOutput={manipulationOutput} />,
        categorical:
            <CategoricalForm />,
        model:
            <ModelInputForm />
    };

    return (
        <foreignObject id='form-component'
            display={store.inputMode !== 'none' ? undefined : 'none'}
            width={DefaultForeignObjectWidth}
            height={DefaultForeignObjectHeight}>
            {formContent[store.inputMode]}
        </foreignObject>
    );
};

export default observer(FormComponent);