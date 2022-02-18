import { Button, ButtonGroup, Container } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";

import Store from "../Interfaces/Store";

const GeneralControl: FC = () => {
    const store = useContext(Store);


    const placeFormLowerRightConor = () => {
        select('#form-component')
            .attr('x', store.svgWidth - DefaultForeignObjectWidth)
            .attr('y', store.svgHeight - DefaultForeignObjectHeight);
        store.setCurrentSelectedDP(undefined);
    };
    const onClickSelectADataPoint = () => {
        store.selectADataPointMode(true);
        store.setInputMode('none');
    };

    const onClickAnnotation = () => {
        store.setInputMode('annotation');
        placeFormLowerRightConor();
    };

    const onClickIncExc = () => {
        store.setInputMode('dataSpace');

        placeFormLowerRightConor();
    };


    const onClickModelInput = () => {
        store.setInputMode('model');
        placeFormLowerRightConor();
    };


    return (
        <Container style={{ paddingTop: '5px' }}>
            <ButtonGroup color="primary" aria-label="outlined primary button group" disabled={!store.userName}>
                <Button onClick={onClickAnnotation}>Add Annotations</Button>
                <Button onClick={onClickIncExc}>Inclusion / Exclusion</Button>
                <Button onClick={onClickModelInput}>Model Input</Button>
                <Button onClick={onClickSelectADataPoint}>Select a Data Point</Button>
            </ButtonGroup>
        </Container>
    );
};

export default observer(GeneralControl);