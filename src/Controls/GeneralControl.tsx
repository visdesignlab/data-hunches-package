import { Button, ButtonGroup, Container } from "@material-ui/core";
import { pointer, select } from "d3-selection";
import { observer } from "mobx-react";
import { useContext } from "react";
import { FC } from "react";

import Store from "../Interfaces/Store";

const GeneralControl: FC = () => {
    const store = useContext(Store);


    const onClickSelectADataPoint = () => {
        store.selectADataPointMode(true);
    };


    return (
        <Container style={{ paddingTop: '5px' }}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>Add Annotations</Button>
                <Button>Inclusion/Exclusion</Button>
                <Button onClick={onClickSelectADataPoint}>Select a Data Point</Button>
            </ButtonGroup>
        </Container>
    );
};

export default observer(GeneralControl);