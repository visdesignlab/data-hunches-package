import { Button, ButtonGroup, Container, IconButton, } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, } from "react";
import { FC } from "react";
import { ControlFOHeight, ControlFOWidth, WithoutCatControlFOHeight } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { NonCapButton, useStyles } from "../Interfaces/StyledComponents";
import CloseIcon from '@material-ui/icons/Close';
import { InputMode } from "../Interfaces/Types";

const SpecificControl: FC = () => {
    const store = useContext(Store);
    const styles = useStyles();

    const clickHandler = (inputMode: InputMode) => {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
    };



    return (
        <foreignObject id='specific-control'
            // display={store.selectingADataPoint ? undefined : 'none'}
            display='none'
            width={ControlFOWidth} height={store.showCategory ? ControlFOHeight : WithoutCatControlFOHeight}>
            <Container className={styles.foreignObjectContainer} >
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group"
                >
                    <NonCapButton onClick={() => { clickHandler('annotation'); }}>
                        Annotation
                    </NonCapButton>
                    <NonCapButton onClick={() => {
                        clickHandler('range');
                    }}>
                        Range
                    </NonCapButton>
                    <NonCapButton onClick={() => {
                        clickHandler('manipulations');
                    }}>
                        Manipulation
                    </NonCapButton>
                    <NonCapButton onClick={() => {
                        clickHandler('rating');
                    }}>
                        Rating
                    </NonCapButton>
                    <NonCapButton onClick={() => {
                        clickHandler('data space');
                    }}>
                        Data Space
                    </NonCapButton>
                    <NonCapButton onClick={() => {
                        clickHandler('exclusion');
                    }}>
                        Exclusion
                    </NonCapButton>
                    {store.showCategory ? <NonCapButton onClick={() => {
                        clickHandler('categorical');
                    }}>
                        Categorical
                    </NonCapButton> : <></>}

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