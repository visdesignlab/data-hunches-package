import { Button, ButtonGroup, Container, IconButton, } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, } from "react";
import { FC } from "react";
import { ControlFOHeight, ControlFOWidth, WithoutCatControlFOHeight } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import CloseIcon from '@material-ui/icons/Close';

const SpecificControl: FC = () => {
    const store = useContext(Store);
    const styles = useStyles();

    const annotationOnClickHandler = () => {
        store.selectADataPointMode(false);
        store.setInputMode('annotation');
    };

    const ratingClickHandler = () => {
        store.selectADataPointMode(false);
        store.setInputMode('rating');
    };

    const dataSpaceClickHandler = () => {
        store.setInputMode('data space');
        store.selectADataPointMode(false);
    };

    const manipulationOnClickHandler = () => {
        store.setInputMode('manipulations');
        store.selectADataPointMode(false);
    };

    const categoricalClickHandler = () => {
        store.setInputMode('categorical');
        store.selectADataPointMode(false);
    };


    return (
        <foreignObject id='specific-control'
            // display={store.selectingADataPoint ? undefined : 'none'}
            display='none'
            width={ControlFOWidth} height={store.containCategory ? ControlFOHeight : WithoutCatControlFOHeight}>
            <Container className={styles.foreignObjectContainer} >
                <ButtonGroup
                    // ref={divRef}
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group"
                >
                    <Button onClick={annotationOnClickHandler}>
                        Annotation
                    </Button>
                    <Button onClick={manipulationOnClickHandler}>
                        Direct Manipulation
                    </Button>
                    <Button onClick={ratingClickHandler}>
                        Rating
                    </Button>
                    <Button onClick={dataSpaceClickHandler}>
                        Data Space
                    </Button>
                    {store.containCategory ? <Button onClick={categoricalClickHandler}>
                        Categorical
                    </Button> : <></>}

                </ButtonGroup>
                <IconButton size="small" onClick={() => {
                    store.setCurrentSelectedDP(undefined);
                    store.selectADataPointMode(false);
                }}>
                    <CloseIcon />
                </IconButton>
            </Container>
        </foreignObject>
    );
};

export default observer(SpecificControl);