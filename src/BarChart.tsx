import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeValueScale } from "./HelperFunctions/ScaleGenerator";
import { DefaultBar, DefaultForeignObjectHeight, DefaultForeignObjectWidth, margin, SelectionColor } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisLeft, axisTop } from "d3-axis";
import { select } from "d3-selection";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import RangeLayer from "./ChartComponents/RangeLayer";
import { useEffect } from "react";
import DataHunchIndicator from "./ChartComponents/DataHunch/DataHunchIndicators";
import { DataHunch } from "./Interfaces/Types";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import { Grid } from "@material-ui/core";
import { DHIndicatorText, LightTooltip, useStyles } from "./Interfaces/StyledComponents";
import CategoricalIndicator from "./ChartComponents/DataHunch/CategoricalIndicator";
import ChartLegends from "./ChartComponents/ChartLegends";
import SketchLayer from "./ChartComponents/SketchLayer";
import ManipulationForm from "./ChartComponents/Forms/ManipulationForm";
import { format } from "d3-format";
import { textwrap } from 'd3-textwrap';
import ManipulationLayer from "./ChartComponents/ManipulationLayer";
import { useLayoutEffect } from "react";
import ChartTitle from "./ChartComponents/ChartTitle";

type Props = {
    dataHunchArray: DataHunch[];
};
const BarChart: FC<Props> = ({ dataHunchArray }: Props) => {

    const store = useContext(Store);
    const styles = useStyles();
    const dataSet = useContext(DataContext);

    const [manipulationResult, setManipulationResult] = useState('');

    const sendManipulationToParent = (manipulationResult: string) => {
        setManipulationResult(manipulationResult);
    };

    useEffect(() => {
        if (store.inputMode !== 'manipulations') {
            setManipulationResult('');
        }
    }, [store.inputMode]);

    const [allChartDHArray, setAllChartDHArray] = useState<DataHunch[]>([]);

    useEffect(() => {
        let tempArray = dataHunchArray.filter(d => d.label === 'all chart');
        stateUpdateWrapperUseJSON(allChartDHArray, tempArray, setAllChartDHArray);
    }, [dataHunchArray]);
    // if needed useCallback

    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);
    const categoricalColorScale = makeCategoricalScale(dataSet);

    const yAxis: any = axisTop(valueScale).tickFormat(format('.2s'));
    const xAxis: any = axisLeft(bandScale);


    select('#vertical-axis')
        .attr('transform', `translate(0,${margin.top})`)
        .call(yAxis);

    const wrap = textwrap().bounds({ width: 50, height: bandScale.bandwidth() }).method('tspans');

    select('#band-axis')
        .attr("transform", `translate(${margin.left},0)`)
        .call(xAxis)
        .selectAll(".tick text")
        .call(wrap);

    useLayoutEffect(() => {
        if (store.selectedDP) {
            select('#band-axis').selectAll(".tick text").attr('fill', d => d === store.selectedDP ? SelectionColor : 'black');
        } else {
            select('#band-axis').selectAll(".tick text").attr('fill', 'black');
        }
    }, [store.selectedDP]);

    return <div>
        <svg width={store.svgWidth} height={store.svgHeight} >
            {store.showCategory ? <ChartLegends /> : <></>}


            <g className='axis' id="band-axis" />

            <g id="rectangles-preview" display={store.needToShowPreview ? undefined : 'none'}>
                <g className='axis' id="axis-mask" transform={`translate(${margin.left},0)`} />
            </g>

            <g className='axis' id="vertical-axis" />

            <g id="rectangles" display={(!store.needToShowPreview) ? undefined : 'none'}>
                {
                    dataSet.map((d, i) => {
                        return <BarElement
                            key={`${i}-barelement`}
                            dataElement={d}
                            width={valueScale(d.value) - margin.left}
                            height={bandScale.bandwidth()}
                            xPos={margin.left}
                            yPos={bandScale(d.label) || 0}
                            fill={store.showCategory ? (categoricalColorScale(d.categorical || 'a') as string) : DefaultBar}
                        />;
                    })}
            </g>

            <g id='data-hunches-container'>

                {dataSet.map((barDP) => {
                    if (barDP.dataHunchArray) {
                        let catDH: DataHunch[] = [];
                        if (store.showCategory) {
                            catDH = barDP.dataHunchArray.filter(d => d.type === 'categorical');
                        }
                        return (<>
                            <DataHunchIndicator
                                dataPoint={barDP}
                                key={`${barDP.label}-dhindicator`}
                                dataHunchArray={barDP.dataHunchArray}
                            />
                            <CategoricalIndicator
                                dataHunchArrayString={JSON.stringify(catDH)}
                                barChartPoint={barDP}
                                key={`${barDP.label}-catindicator`} />
                        </>);
                    } else {
                        return <></>;
                    }
                })}
            </g>

            <RangeLayer sendManipulation={sendManipulationToParent} />

            <ManipulationLayer sendManipulation={sendManipulationToParent} />
            <SketchLayer sendManipulation={sendManipulationToParent} />

            <FormComponent />

            <SpecificControl />

        </svg>
        <Grid container>
            <Grid item xs={6}>{
                (store.inputMode === 'sketch' || store.inputMode === 'manipulations' || store.inputMode === 'range') ? <div style={{ width: DefaultForeignObjectWidth, height: DefaultForeignObjectHeight }}>
                    <ManipulationForm manipulationOutput={manipulationResult} type={store.inputMode} />
                </div> : <></>
            }

                <ChartTitle />
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'start' }}>
                <ul className={styles.noBulletsList}>
                    {allChartDHArray.map((d, i) => {
                        return (
                            <LightTooltip title={
                                <div>
                                    {d.type !== 'sketch' ? <div>
                                        Content: {d.content}
                                    </div> : <></>}

                                    <div>
                                        Reasoning: {d.reasoning}
                                    </div>
                                </div>}>
                                <li style={{ width: 'fit-content' }}>
                                    <DHIndicatorText
                                        isHighlighted={d.id === store.highlightedDH}
                                        isSelected={store.selectedDH.includes(d.id)}
                                        onClick={() => { store.setSelectedDH([d.id]); }}
                                        onMouseOver={() => { store.setHighlightedDH(d.id); }}
                                        onMouseOut={() => { store.setHighlightedDH(-1); }}
                                        key={`${d.id}-text`}
                                        fontSize='larger'
                                        needBold={true}
                                        style={{ textOverflow: 'ellipsis' }}
                                    >
                                        *{d.type === 'sketch' ? 'sketch' : d.content}
                                    </DHIndicatorText>
                                </li>
                            </LightTooltip>
                        );
                    })}
                </ul>
            </Grid>
        </Grid>

    </div >;
};

export default observer(BarChart);

