import { Button, ButtonGroup, Container, Menu, MenuItem } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";

import Store from "../Interfaces/Store";
import { InputMode } from "../Interfaces/Types";

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


    const dhButtonClickHandler = (inputMode: InputMode) => {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
        placeFormLowerRightCorner();
    };

    return (
        < >
            <ButtonGroup color="primary" aria-label="outlined primary button group" disabled={!store.userName} size='small'>
                <Button onClick={onClickSelectADataPoint}>Select a Data Point</Button>
                <Button onClick={() => { dhButtonClickHandler('annotation'); }}>Add Annotations</Button>
                <Button onClick={() => { dhButtonClickHandler('data space'); }}>Inclusion</Button>
                <Button onClick={() => { dhButtonClickHandler('model'); }}>Model Input</Button>
                <Button onClick={() => { dhButtonClickHandler('sketch'); }}>Graphical Annotations</Button>
            </ButtonGroup>

        </>
    );
};

export default observer(GeneralControl);