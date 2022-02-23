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
    type: 'manipulations' | 'sketch';
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

    const calculateType = () => {
        const parsedResult = JSON.parse('[' + manipulationOutput + ']');
        return parsedResult.length > 1 ? 'range' : 'manipulations';
    };

    return (
        <Container className={styles.foreignObjectContainer}>
            <ReasonConfidenceInput updateConfidenceReason={sendConfidenceReasonToParent} />
            <SubmitCancelButtons disableSubmit={
                reasonInput.length === 0 || manipulationOutput === ''}
                dhToSubmit={{
                    type: type === 'manipulations' ? calculateType() : type,
                    user: store.userName,
                    label: `${store.selectedDP === undefined ? 'all chart' : store.selectedDP}`,
                    // Add Content
                    content: manipulationOutput,
                    reasoning: reasonInput,
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                }} />
        </Container>
    );
};

export default observer(ManipulationForm);