import { Container, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useState, useContext, useEffect } from "react";
import { DataContext } from "../..";
import { CategoricalColor, DataPreset } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";



const CategoricalForm: FC = () => {
    const styles = useStyles();
    const store = useContext(Store);
    const dataSet = useContext(DataContext);

    const [ratingValue, setRatingValue] = useState('');

    useEffect(() => {
        const DPinData = dataSet.filter(d => d.label === store.selectedDP)[0];
        setRatingValue(DPinData.categorical || 'a');
    }, [store.selectedDP]);

    const handleRadioChange = (event: any) => {
        setRatingValue(event.target.value);
    };

    const [reasonInput, setReasonInput] = useState('');

    const [confidenceInput, setConfidenceInput] = useState(3);

    const sendConfidenceReasonToParent = (confidenceValue: number, reason: string) => {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };

    return (
        <Container className={styles.foreignObjectContainer}>
            <RadioGroup name="Rating" onChange={handleRadioChange} value={ratingValue}>
                {DataPreset[store.dbTag].categories.map((d, i) => {
                    return <FormControlLabel
                        value={d}
                        key={`${d}-radio`}
                        control={<Radio style={{ paddingTop: '0px', paddingBottom: '0px' }} size="small" className={styles.radioStyle} />}
                        label={
                            <div className={styles.catText}>
                                <div className={styles.colorBox} style={{ backgroundColor: CategoricalColor[i] }} />
                                {d}
                            </div>} />;
                })}


            </RadioGroup>

            <ReasonConfidenceInput updateConfidenceReason={sendConfidenceReasonToParent} />

            <SubmitCancelButtons disableSubmit={
                !ratingValue || reasonInput.length === 0}
                dhToSubmit={{
                    type: 'categorical',
                    user: store.userName,
                    label: `${store.selectedDP === undefined ? 'all chart' : store.selectedDP}`,
                    content: ratingValue,
                    reasoning: reasonInput,
                    id: store.nextIndex,
                    confidenceLevel: confidenceInput,
                    upvotes: 0,
                    downvotes: 0
                }
                }
            />
        </Container>
    );
};

export default observer(CategoricalForm);