import { Container, Slider, TextField, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";

type Props = {
    manipulationOutput: string;
    type: 'manipulations' | 'sketch' | 'range' | 'exclusion';
};

const ManipulationForm: FC<Props> = ({ manipulationOutput, type }: Props) => {
    const styles = useStyles();
    const store = useContext(Store);


    const [confidenceInput, setConfidenceInput] = useState(3);
    const [reasonInput, setReasonInput] = useState('');

    const sendConfidenceReasonToParent = (confidenceValue: number, reason: string) => {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };

    return (
        <Container className={styles.foreignObjectContainer}>
            <ReasonConfidenceInput updateConfidenceReason={sendConfidenceReasonToParent} />
            <SubmitCancelButtons disableSubmit={
                reasonInput.length === 0 || manipulationOutput === ''}
                dhToSubmit={{
                    type: type,
                    user: store.userName,
                    label: `${store.selectedDP === undefined ? 'all chart' : store.selectedDP}`,
                    content: manipulationOutput,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput
                }} />
        </Container>
    );
};

export default observer(ManipulationForm);