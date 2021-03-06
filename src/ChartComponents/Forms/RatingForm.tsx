import { Container, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { FC } from "react";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import SubmitCancelButtons from "./SubmitCancelButtons";

const RatingForm: FC = () => {

    const styles = useStyles();
    const store = useContext(Store);

    const [ratingValue, setRatingValue] = useState('');

    const handleRadioChange = (event: any) => {
        setRatingValue(event.target.value);
    };

    const [reasonInput, setReasonInput] = useState('');
    const handleReasonChange = (event: any) => {
        setReasonInput(event.target.value);
    };

    return (<Container className={styles.foreignObjectContainer}>
        <RadioGroup name="Rating" onChange={handleRadioChange}>
            <FormControlLabel value="1" control={<Radio size="small" className={styles.radioStyle} />} label="★" />
            <FormControlLabel value="2" control={<Radio size="small" className={styles.radioStyle} />} label="★★" />
            <FormControlLabel value="3" control={<Radio size="small" className={styles.radioStyle} />} label="★★★" />
            <FormControlLabel value="4" control={<Radio size="small" className={styles.radioStyle} />} label="★★★★" />
            <FormControlLabel value="5" control={<Radio size="small" className={styles.radioStyle} />} label="★★★★★" />
        </RadioGroup>

        <TextField
            required
            label="Reason"
            multiline
            rows={3}
            size="small"
            onChange={handleReasonChange}
            placeholder="Enter reason for the data hunch"
            variant="outlined"
            style={{ paddingTop: '5px', paddingBottom: '5px' }}
        />
        <SubmitCancelButtons disableSubmit={
            !ratingValue || reasonInput.length === 0}
            dhToSubmit={{
                type: 'rating',
                user: store.userName,
                label: `${store.selectedDP === undefined ? 'all chart' : store.selectedDP}`,
                content: ratingValue,
                reasoning: reasonInput,
                id: store.nextIndex,
                // rating shouldn't have a confidence level?
                confidenceLevel: 5,
                upvotes: 0,
                downvotes: 0,
            }
            }
        />
    </Container>);
};

export default observer(RatingForm);