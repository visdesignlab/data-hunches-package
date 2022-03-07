import { Button, ButtonGroup, Container, Menu, MenuItem } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";

import Store from "../Interfaces/Store";

const GeneralControl: FC = () => {
    const store = useContext(Store);

    const placeFormLowerRightCorner = () => {
        select('#form-component')
            .attr('x', store.svgWidth - DefaultForeignObjectWidth)
            .attr('y', store.svgHeight - DefaultForeignObjectHeight);
        store.setCurrentSelectedDP(undefined);
    };
    const onClickSelectADataPoint = () => {
        // handleClose();
        store.selectADataPointMode(true);
        store.setInputMode('none');
    };

    const onClickAnnotation = () => {
        // handleClose();
        store.setInputMode('annotation');
        placeFormLowerRightCorner();
    };

    const onClickIncExc = () => {
        store.setInputMode('data space');
        // handleClose();
        placeFormLowerRightCorner();
    };


    const onClickModelInput = () => {
        // handleClose();
        store.setInputMode('model');
        placeFormLowerRightCorner();
    };

    const onClickGraphical = () => {
        // handleClose();
        store.setInputMode('sketch');
        placeFormLowerRightCorner();
    };

    return (
        < >
            <ButtonGroup color="primary" aria-label="outlined primary button group" disabled={!store.userName} size='small'>
                <Button onClick={onClickSelectADataPoint}>Select a Data Point</Button>
                <Button onClick={onClickAnnotation}>Add Annotations</Button>
                <Button onClick={onClickIncExc}>Inclusion / Exclusion</Button>
                <Button onClick={onClickModelInput}>Model Input</Button>
                <Button onClick={onClickGraphical}>Graphical Annotations</Button>
            </ButtonGroup>

        </>
    );
};

export default observer(GeneralControl);