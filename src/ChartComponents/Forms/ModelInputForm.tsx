import { Container, TextField } from "@material-ui/core";
import { parse, parser } from "mathjs";

import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import PreviewResetButtons from "./PreviewResetButtons";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";

const ModelInputForm: FC = () => {
    const styles = useStyles();
    const store = useContext(Store);


    const [confidenceInput, setConfidenceInput] = useState(3);
    const [reasonInput, setReasonInput] = useState('');

    const sendConfidenceReasonToParent = (confidenceValue: number, reason: string) => {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };

    const [modelInput, setModelInput] = useState('');

    const checkIfDisable = () => {
        try {
            const parseResult = parse(modelInput);
            return false;
        } catch (error) {
            return true;
        }
    };


    return (
        <Container className={styles.foreignObjectContainer}>
            <TextField
                required
                style={{ paddingBottom: '5px' }}
                onChange={(e) => { setModelInput(e.target.value); }}
                value={modelInput}
                label="Model Input with x"
                inputProps={{ step: "0.1" }}
                variant="outlined"
                size="small"
                placeholder={`i.e., x+1`}
            />
            <PreviewResetButtons
                disableButtons={checkIfDisable()}
                modelInput={modelInput}
                labelToPreview={undefined}
                valueToPreview={undefined} />
            <ReasonConfidenceInput updateConfidenceReason={sendConfidenceReasonToParent} />
            <SubmitCancelButtons disableSubmit={
                reasonInput.length === 0 || modelInput === ''}
                dhToSubmit={{
                    type: 'model',
                    user: store.userName,
                    label: 'all chart',
                    // Add Content
                    content: modelInput,
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                }} />
        </Container>
    );
};

export default observer(ModelInputForm);