import { ButtonGroup } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth, } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { NonCapButton, } from "../Interfaces/StyledComponents";
import { InputMode } from "../Interfaces/Types";

const GeneralControl: FC = () => {
    const store = useContext(Store);

    const placeFormLowerRightCorner = () => {
        select('#form-component')
            .style('left', `${store.svgWidth - DefaultForeignObjectWidth}px`)
            .style('top', `${store.svgHeight - DefaultForeignObjectHeight}px`);
        store.setCurrentSelectedDP(undefined);
    };


    const dhButtonClickHandler = (inputMode: InputMode) => {
        store.setInputMode(inputMode);
        store.selectADataPointMode(false);
        placeFormLowerRightCorner();
    };

    return (
        < >
            <ButtonGroup color="primary" aria-label="outlined primary button group" disabled={!store.userName} size='small' style={{ marginLeft: '5px' }}>
                {/* <NonCapButton onClick={() => { dhButtonClickHandler('annotation'); }}>Annotations</NonCapButton> */}
                <NonCapButton onClick={() => { dhButtonClickHandler('data space'); }}>Add New Value (Inclusion)</NonCapButton>
                <NonCapButton onClick={() => { dhButtonClickHandler('model'); }}>Transform Data</NonCapButton>
                <NonCapButton onClick={() => { dhButtonClickHandler('sketch'); }}>Add Sketch</NonCapButton>
            </ButtonGroup>

        </>
    );
};

export default observer(GeneralControl);