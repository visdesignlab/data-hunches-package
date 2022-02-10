import { Container, Slider, TextField, Typography, Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useState } from "react";
import { FC } from "react";
import { DataContext } from "..";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";
import PreviewResetButtons from "./PreviewResetButtons";
import SubmitCancelButtons from "./SubmitCancelButtons";


type Props = {
    isIncExc: boolean;

};

const DataSpaceForm: FC<Props> = ({ isIncExc }: Props) => {

    const store = useContext(Store);
    const styles = useStyles();
    const data = useContext(DataContext);

    const [dataInput, setDataInput] = useState<string>('');
    const [confidenceInput, setConfidenceInput] = useState(3);
    const [reasonInput, setReasonInput] = useState('');
    const [labelInput, setLabelInput] = useState('');

    const handleReasonChange = (event: any) => {
        setReasonInput(event.target.value);
    };

    const handleConfidenceChange = (event: any, value: any) => {
        setConfidenceInput(value);
    };

    const handleDataInputChange = (event: any) => {
        setDataInput(event.target.value);
    };

    const handleLabelInput = (event: any) => {
        setLabelInput(event.target.value);
    };


    const checkIfDisable = () => {
        if (isIncExc && labelInput.length > 0) {
            if (!data.map(d => d.label).includes(labelInput)) {
                return dataInput === '' || reasonInput.length === 0;
            } else {
                return reasonInput.length === 0;
            }
        } else {
            return dataInput === '' || reasonInput.length === 0;
        }
    };

    return <Container className={styles.foreignObjectContainer}>
        <Grid container>
            <Grid item xs={6}>
                <TextField
                    required
                    onChange={handleLabelInput}
                    label="Label Input"
                    variant="outlined"
                    size="small"
                    error={labelInput.length > 20}
                    placeholder={`Suggest label to include/exclude`}
                    style={{ display: isIncExc ? undefined : 'none', paddingBottom: '5px' }}
                />
            </Grid>
            <Grid item xs={isIncExc ? 6 : 12}>
                <TextField
                    required
                    type="number"
                    style={{ paddingBottom: '5px' }}
                    onChange={handleDataInputChange}
                    label="Data Input"
                    inputProps={{ step: "0.1" }}
                    variant="outlined"
                    size="small"
                    placeholder={`Suggest for ${store.selectedDP}`}
                />
            </Grid>

        </Grid>

        <PreviewResetButtons
            disableButtons={checkIfDisable()}
            labelToPreview={store.selectedDP ? store.selectedDP : ''}
            valueToPreview={dataInput === '' ? 0 : parseFloat(dataInput)} />
        <TextField
            style={{ paddingTop: '5px' }}
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
        <SubmitCancelButtons disableSubmit={checkIfDisable()}
            dhToSubmit={{
                type: 'annotation',
                user: store.userName,
                label: `${store.selectedDP}`,
                content: dataInput,
                reasoning: reasonInput,
                id: store.nextDHIndex,
                confidenceLevel: confidenceInput
            }} />
    </Container>;
};

export default observer(DataSpaceForm);