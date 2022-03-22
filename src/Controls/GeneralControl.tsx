import { Button, ButtonGroup, Container, Menu, MenuItem } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";

import Store from "../Interfaces/Store";
import { NonCapButton, useStyles } from "../Interfaces/StyledComponents";
import { InputMode } from "../Interfaces/Types";

const GeneralControl: FC = () => {
    const store = useContext(Store);
    const styles = useStyles();

    const placeFormLowerRightCorner = () => {
        select('#form-component')
            .attr('x', store.svgWidth - DefaultForeignObjectWidth)
            .attr('y', store.svgHeight - DefaultForeignObjectHeight);
        store.setCurrentSelectedDP(undefined);
    };


    const dhButtonClickHandler = (inputMode: InputMode) => {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
        placeFormLowerRightCorner();
    };

    return (
        < >
            <ButtonGroup color="primary" aria-label="outlined primary button group" disabled={!store.userName} size='small' >
                <NonCapButton onClick={() => { dhButtonClickHandler('annotation'); }}>Add Annotations</NonCapButton>
                <NonCapButton onClick={() => { dhButtonClickHandler('data space'); }}>Inclusion</NonCapButton>
                <NonCapButton onClick={() => { dhButtonClickHandler('model'); }}>Model Input</NonCapButton>
                <NonCapButton onClick={() => { dhButtonClickHandler('sketch'); }}>Graphical Annotations</NonCapButton>
            </ButtonGroup>

        </>
    );
};

export default observer(GeneralControl);