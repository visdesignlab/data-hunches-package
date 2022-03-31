import { Container, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useState, useContext, useEffect } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale, makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { CategoricalColor, margin } from "../../Interfaces/Constants";
import { DataPreset } from "../../Interfaces/Datasets";
import Store from "../../Interfaces/Store";
import { useStyles } from "../../Interfaces/StyledComponents";
import { BarChartDataPoint } from "../../Interfaces/Types";
import ReasonConfidenceInput from "./ReasonConfidenceInput";
import SubmitCancelButtons from "./SubmitCancelButtons";
import * as rough from 'roughjs/bin/rough';


const CategoricalForm: FC = () => {
    const styles = useStyles();
    const store = useContext(Store);

    const dataSet = useContext(DataContext);
    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);
    const categoricalScale = makeCategoricalScale(DataPreset[store.dbTag].categories);

    const [dataPoint, setDataPoint] = useState<BarChartDataPoint | undefined>(undefined);

    const [ratingValue, setRatingValue] = useState('');

    useEffect(() => {
        const DPinData = dataSet.filter(d => d.label === store.selectedDP)[0];
        setDataPoint(DPinData);
        setRatingValue(DPinData.categorical || 'a');
    }, [store.selectedDP]);

    const handleRadioChange = (event: any) => {
        setRatingValue(event.target.value);
        if (dataPoint && dataPoint.dataHunchArray) {
            select('#categorical-preview').selectAll('*').remove();
            const drawingG = select('#categorical-preview').node() as any;
            const rc = rough.default.svg(drawingG);

            const catWidth = (valueScale(dataPoint.value) - margin.left - 40) / DataPreset[store.dbTag].categories.length;

            const existingCatHunch = dataPoint.dataHunchArray.filter(d => d.type === 'categorical').length;

            const xPos = valueScale(dataPoint.value) - 40 - (existingCatHunch + 1) * catWidth;
            const yPos = (bandScale(dataPoint.label) || 0) + 3;

            const sketchyDH = rc.rectangle(xPos, yPos, catWidth, bandScale.bandwidth() - 6, {
                fillStyle: 'zigzag',
                fill: categoricalScale(event.target.value) as string,
                stroke: 'none',
                fillWeight: 10,
                hachureAngle: 20,
                hachureGap: 18,
                roughness: 3,
                strokeWidth: 2
            });
            drawingG.appendChild(sketchyDH);
        }

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