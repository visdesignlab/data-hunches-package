import { Container, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import AnnotationForm from "./AnnotationForm";
import DataSpaceForm from "./DataSpaceForm";
import ManipulationForm, { ManipulationProps } from "./ManipulationForm";
import RatingForm from "./RatingForm";

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
            <ManipulationForm manipulationOutput={manipulationOutput} />

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