import { ButtonGroup, Container } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, } from "react";
import { FC } from "react";
import { ControlFOHeight, ControlFOWidth, WithoutCatControlFOHeight } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { NonCapButton, useStyles } from "../Interfaces/StyledComponents";
import { InputMode } from "../Interfaces/Types";
import styled from "styled-components";

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
            <Container className={styles.specificControlContainer} >
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group"
                >
                    <ContextButton onClick={() => { clickHandler('annotation'); }}>
                        Annotation
                    </ContextButton>
                    <ContextButton onClick={() => {
                        clickHandler('range');
                    }}>
                        Range
                    </ContextButton>
                    <ContextButton onClick={() => {
                        clickHandler('manipulations');
                    }}>
                        Manipulation
                    </ContextButton>
                    <ContextButton onClick={() => {
                        clickHandler('rating');
                    }}>
                        Rating
                    </ContextButton>
                    <ContextButton onClick={() => {
                        clickHandler('data space');
                    }}>
                        Data Space
                    </ContextButton>
                    <ContextButton onClick={() => {
                        clickHandler('exclusion');
                    }}>
                        Exclusion
                    </ContextButton>
                    {store.showCategory ? <ContextButton onClick={() => {
                        clickHandler('categorical');
                    }}>
                        Categorical
                    </ContextButton> : <></>}

                </ButtonGroup>
            </Container>
        </foreignObject>
    );
};

export default observer(SpecificControl);

const ContextButton = styled(NonCapButton)`
justify-content: flex-start
`;