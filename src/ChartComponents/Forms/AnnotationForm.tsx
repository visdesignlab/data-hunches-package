import { Container, Slider, TextField, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";

const AnnotationForm: FC = () => {

    const styles = useStyles();
    const store = useContext(Store);

    const [confidenceInput, setConfidenceInput] = useState(3);
    const [reasonInput, setReasonInput] = useState('');
    const [annotationInput, setAnnotationInput] = useState('');


    const handleAnnotationChange = (event: any) => {
        setAnnotationInput(event.target.value);
    };

    const sendConfidenceReasonToParent = (confidenceValue: number, reason: string) => {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
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
        <ReasonConfidenceInput updateConfidenceReason={sendConfidenceReasonToParent} />
        <SubmitCancelButtons disableSubmit={
            annotationInput.length === 0 || reasonInput.length === 0}
            dhToSubmit={{
                type: 'annotation',
                user: store.userName,
                label: `${store.selectedDP === undefined ? 'all chart' : store.selectedDP}`,
                content: annotationInput,
                reasoning: reasonInput,
                id: store.nextDHIndex,
                confidenceLevel: confidenceInput
            }} />

    </Container>);
};

export default observer(AnnotationForm);

