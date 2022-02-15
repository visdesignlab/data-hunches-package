import { TextField, Typography, Slider } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";

type Props = {
    updateConfidenceReason: (confidenceValue: number, reason: string) => void;
};

const ReasonConfidenceInput: FC<Props> = ({ updateConfidenceReason }: Props) => {

    const [confidenceInput, setConfidenceInput] = useState(3);
    const [reasonInput, setReasonInput] = useState('');

    const handleReasonChange = (event: any) => {
        setReasonInput(event.target.value);
        updateConfidenceReason(confidenceInput, event.target.value);
    };

    const handleConfidenceChange = (event: any, value: any) => {
        setConfidenceInput(value);
        updateConfidenceReason(value, reasonInput);
    };



    return (
        <div>
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
            <TextField
                style={{ paddingTop: '5px' }}
                required
                label="Reason"
                multiline
                rows={3}
                size="small"
                onChange={handleReasonChange}
                value={reasonInput}
                placeholder="Enter reason for the data hunch"
                variant="outlined"
            />
        </div>
    );
};

export default observer(ReasonConfidenceInput);