import { Container, Slider, TextField, Typography, Grid } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { FC } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale, makeCategoricalScale, getRectFill } from "../../HelperFunctions/ScaleGenerator";
import { margin } from "../../Interfaces/Constants";
import { DataPreset } from "../../Interfaces/Datasets";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import PreviewResetButtons from "./PreviewResetButtons";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";


type Props = {
    isInc: boolean;

};

const DataSpaceForm: FC<Props> = ({ isInc }: Props) => {

    const store = useContext(Store);
    const styles = useStyles();
    const data = useContext(DataContext);

    const [dataInput, setDataInput] = useState<string>('');
    const [confidenceInput, setConfidenceInput] = useState(3);
    const [reasonInput, setReasonInput] = useState('');
    const [labelInput, setLabelInput] = useState('');


    const sendConfidenceReasonToParent = (confidenceValue: number, reason: string) => {
        setReasonInput(reason);
        setConfidenceInput(confidenceValue);
    };

    const handleDataInputChange = (event: any) => {
        setDataInput(event.target.value);
    };

    const handleLabelInput = (event: any) => {
        setLabelInput(event.target.value);
    };

    useEffect(() => {

        const verticalScale = makeValueScale(data, store.svgHeight);
        const bandScale = makeBandScale(data, store.svgWidth);
        const categoricalScale = makeCategoricalScale(DataPreset[store.dbTag].categories);

        select('#axis-mask')
            .selectAll('*')
            .remove();

        select('#rectangles-preview')
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr('x', d => bandScale(d.label) || 0)
            .attr('width', bandScale.bandwidth())
            .attr("y", d => verticalScale(d.value))
            .attr("height", d => store.svgHeight - margin.bottom - verticalScale(d.value))
            .attr("fill", d => getRectFill(d, store.showCategory, store.selectedDP, categoricalScale));
    }, []);

    const checkIfDisable = () => {
        if (isInc && labelInput.length > 0) {
            if (!data.map(d => d.label).includes(labelInput)) {
                return dataInput === '';
            } else {
                return false;
            }
        } else {
            return dataInput === '';
        }
    };

    const makeDHContent = () => {
        if (isInc) {
            if (data.map(d => d.label).includes(labelInput)) {
                return 'ignore';
            } else {
                return dataInput;
            }
        } else {
            return dataInput;
        }
    };

    const determineDHType = () => {
        if (isInc) {
            if (data.map(d => d.label).includes(labelInput)) {
                return 'exclusion';
            } else {
                return 'inclusion';
            }
        }
        return 'data space';
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
                    value={labelInput}
                    placeholder={`Suggest label to include/exclude`}
                    style={{ display: isInc ? undefined : 'none', paddingBottom: '5px' }}
                />
            </Grid>
            <Grid item xs={isInc ? 6 : 12}>
                <TextField
                    required
                    type="number"
                    style={{ paddingBottom: '5px' }}
                    onChange={handleDataInputChange}
                    value={dataInput}
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
            modelInput={undefined}
            labelToPreview={store.selectedDP ? store.selectedDP : labelInput}
            valueToPreview={dataInput === '' ? undefined : parseFloat(dataInput)} />

        <ReasonConfidenceInput updateConfidenceReason={sendConfidenceReasonToParent} />

        <SubmitCancelButtons disableSubmit={checkIfDisable() || reasonInput.length === 0}
            dhToSubmit={{
                type: determineDHType(),
                user: store.userName,
                label: isInc ? labelInput : (store.selectedDP ? store.selectedDP : ''),
                content: makeDHContent(),
                reasoning: reasonInput,
                id: store.nextIndex,
                confidenceLevel: confidenceInput,
                upvotes: 0,
                downvotes: 0
            }} />
    </Container>;
};

export default observer(DataSpaceForm);