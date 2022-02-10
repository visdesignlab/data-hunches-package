import { Container, Slider, TextField, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import SubmitCancelButtons from "./SubmitCancelButtons";

const ManipulationForm: FC = () => {
    const styles = useStyles();
    const store = useContext(Store);

    const [reasonInput, setReasonInput] = useState('');
    const handleReasonChange = (event: any) => {
        setReasonInput(event.target.value);
    };

    const [manipulationOutput, setManipulationOutput] = useState<undefined | number>(undefined);

    const [confidenceInput, setConfidenceInput] = useState(3);
    const handleConfidenceChange = (event: any, value: any) => {
        setConfidenceInput(value);
    };

    return (
        <Container className={styles.foreignObjectContainer}>
            <TextField
                required
                label="Reason"
                multiline
                rows={3}
                size="small"
                onChange={handleReasonChange}
                placeholder="Enter reason for the data hunch"
                variant="outlined"
            />
            <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <Typography style={{ textAlign: 'start' }}>Confidence</Typography>
                <Slider
                    defaultValue={3}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    aria-label="Confidence"
                    onChangeCommitted={handleConfidenceChange}
                    marks
                    min={1}
                    max={5} />
            </div>
            <SubmitCancelButtons disableSubmit={
                reasonInput.length === 0 || manipulationOutput === undefined}
                dhToSubmit={{
                    type: 'annotation',
                    user: store.userName,
                    label: `${store.selectedDP === 'none' ? 'all chart' : store.selectedDP}`,
                    // Add Content
                    content: manipulationOutput === undefined ? '' : manipulationOutput.toString(),
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                }} />
        </Container>
    );
};

export default observer(ManipulationForm);