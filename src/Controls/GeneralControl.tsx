import { Button, ButtonGroup, Container, Menu, MenuItem } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";

import Store from "../Interfaces/Store";

const GeneralControl: FC = () => {
    const store = useContext(Store);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (e: any) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const placeFormLowerRightCorner = () => {
        select('#form-component')
            .attr('x', store.svgWidth - DefaultForeignObjectWidth)
            .attr('y', store.svgHeight - DefaultForeignObjectHeight);
        store.setCurrentSelectedDP(undefined);
    };
    const onClickSelectADataPoint = () => {
        handleClose();
        store.selectADataPointMode(true);
        store.setInputMode('none');
    };

    const onClickAnnotation = () => {
        handleClose();
        store.setInputMode('annotation');
        placeFormLowerRightCorner();
    };

    const onClickIncExc = () => {
        store.setInputMode('data space');
        handleClose();
        placeFormLowerRightCorner();
    };


    const onClickModelInput = () => {
        handleClose();
        store.setInputMode('model');
        placeFormLowerRightCorner();
    };

    const onClickGraphical = () => {
        handleClose();
        store.setInputMode('sketch');
        placeFormLowerRightCorner();
    };

    return (
        <Container style={{ paddingTop: '5px' }}>
            <ButtonGroup color="primary" aria-label="outlined primary button group" disabled={!store.userName}>
                <Button onClick={handleMenuClick}>Chart Input</Button>
                <Button onClick={onClickSelectADataPoint}>Select a Data Point</Button>
            </ButtonGroup>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onClickAnnotation}>Add Annotations</MenuItem>
                <MenuItem onClick={onClickIncExc}>Inclusion / Exclusion</MenuItem>
                <MenuItem onClick={onClickModelInput}>Model Input</MenuItem>
                <MenuItem onClick={onClickGraphical}>Graphical Annotations</MenuItem>
            </Menu>
        </Container>
    );
};

export default observer(GeneralControl);