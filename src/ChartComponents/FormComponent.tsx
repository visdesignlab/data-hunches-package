import { Container, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import AnnotationForm from "./AnnotationForm";

const FormComponent: FC = () => {

    const store = useContext(Store);
    const styles = useStyles();


    const formContent = {
        annotation:
            <AnnotationForm />,

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