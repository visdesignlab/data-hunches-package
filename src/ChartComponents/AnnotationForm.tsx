import { Container, Slider, TextField, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import SubmitCancelButtons from "./SubmitCancelButtons";

const AnnotationForm: FC = () => {

    const styles = useStyles();
    const store = useContext(Store);



    const [confidenceInput, setConfidenceInput] = useState(3);
    const [reasonInput, setReasonInput] = useState('');
    const [annotationInput, setAnnotationInput] = useState('');

    const handleReasonChange = (event: any) => {
        setReasonInput(event.target.value);
    };
    const handleAnnotationChange = (event: any) => {
        setAnnotationInput(event.target.value);
    };
    const handleConfidenceChange = (event: any, value: any) => {
        setConfidenceInput(value);
    };

    return (<Container className={styles.foreignObjectContainer}>
        <TextField
            style={{ paddingBottom: '10px' }}
            required
            label="Annotation Input"
            variant="outlined"
            multiline
            size="small"
            onChange={handleAnnotationChange}
            rows={2}
            placeholder={`Annotate on ${store.selectedDP ? store.selectedDP : 'chart'}`} />
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
            annotationInput.length === 0 || reasonInput.length === 0}
            dhToSubmit={{
                type: 'annotation',
                user: store.userName,
                label: `${store.selectedDP === 'none' ? 'all chart' : store.selectedDP}`,
                content: annotationInput,
                reasoning: reasonInput,
                id: store.nextDHIndex,
                confidenceLevel: confidenceInput
            }} />

    </Container>);
};

export default observer(AnnotationForm);

