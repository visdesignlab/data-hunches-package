import { Container, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useState, useContext, useEffect } from "react";
import { DataContext } from "../..";
import { CategoricalColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";



const CategoricalForm: FC = () => {
    const styles = useStyles();
    const store = useContext(Store);
    const dataSet = useContext(DataContext);

    const [ratingValue, setRatingValue] = useState('');
    const [catNum, setCatNum] = useState(-1);

    useEffect(() => {
        const DPinData = dataSet.filter(d => d.label === store.selectedDP)[0];
        const tempcatNum = store.containCategory.indexOf(DPinData.categorical || 'a');
        setRatingValue(DPinData.categorical || 'a');
        setCatNum(tempcatNum);
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
                {store.containCategory.map((d, i) => {
                    return <FormControlLabel
                        value={d}
                        key={`${d}-radio`}
                        control={<Radio size="small" className={styles.radioStyle} />}
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
                    id: store.nextDHIndex,
                    confidenceLevel: confidenceInput
                }
                }
            />
        </Container>
    );
};

export default observer(CategoricalForm);