import { ButtonGroup, Container } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, } from "react";
import { FC } from "react";
import { ControlFOHeight, ControlFOWidth, WithoutCatControlFOHeight } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { NonCapButton, useStyles } from "../Interfaces/StyledComponents";
import { InputMode } from "../Interfaces/Types";
import styled from "styled-components";
import { SendManiProps } from "../ChartComponents/ManipulationLayer";


const SpecificControl: FC<SendManiProps> = ({ sendManipulation }: SendManiProps) => {

    const store = useContext(Store);
    const styles = useStyles();

    const clickHandler = (inputMode: InputMode) => {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
    };



    return (
        // <foreignObject
        //     // display={store.selectingADataPoint ? undefined : 'none'}
        //     display='none'
        //     width={ControlFOWidth}
        //     height={store.showCategory ? ControlFOHeight : WithoutCatControlFOHeight}>
        <Container
            id='specific-control'
            style={{ display: 'none' }}
            className={styles.specificControlContainer} >
            <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical outlined primary button group"
            >
                <ContextButton onClick={() => {
                    clickHandler('manipulations');
                }}>
                    Change Size (Manipulation)
                </ContextButton>
                <ContextButton onClick={() => {
                    clickHandler('range');
                }}>
                    Specify Range
                </ContextButton>
                {store.showCategory ? <ContextButton onClick={() => {
                    clickHandler('categorical');
                }}>
                    Categorical
                </ContextButton> : <></>}

                <ContextButton onClick={() => {
                    clickHandler('exclusion');
                }}>
                    Remove (Exclusion)
                </ContextButton>
                <ContextButton onClick={() => {
                    clickHandler('data space');
                }}>
                    Change Value (Data Space)
                </ContextButton>
                <ContextButton onClick={() => { clickHandler('annotation'); }}>
                    Annotation
                </ContextButton>
                <ContextButton onClick={() => {
                    clickHandler('rating');
                }}>
                    Rating
                </ContextButton>
                <ContextButton onClick={() => {
                    clickHandler('direction');
                    sendManipulation('higher');
                }}>
                    Value should be higher
                </ContextButton>
                <ContextButton onClick={() => {
                    clickHandler('direction');
                    sendManipulation('lower');
                }}>
                    Value should be lower
                </ContextButton>
            </ButtonGroup>
        </Container>
    );
};

export default observer(SpecificControl);

const ContextButton = styled(NonCapButton)`
    justify-content: flex-start;
    font-size:9pt;
    text-align:start;
`;