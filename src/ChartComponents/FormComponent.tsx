import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import AnnotationForm from "./Forms/AnnotationForm";
import CategoricalForm from "./Forms/CategoricalForm";
import DataSpaceForm from "./Forms/DataSpaceForm";
import ModelInputForm from "./Forms/ModelInputForm";
import RatingForm from "./Forms/RatingForm";

type Props = {
    manipulationOutput: string;
};

const FormComponent: FC<Props> = ({ manipulationOutput }: Props) => {

    const store = useContext(Store);

    const formContent = {
        annotation:
            <AnnotationForm />,
        rating:
            <RatingForm />,
        'data space':
            <DataSpaceForm isIncExc={!store.selectedDP} />,
        // manipulations:
        //     <ManipulationForm manipulationOutput={manipulationOutput} type='manipulations' />,
        categorical:
            <CategoricalForm />,
        model:
            <ModelInputForm />
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