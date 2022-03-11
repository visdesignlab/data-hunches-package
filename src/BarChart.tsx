import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeValueScale } from "./HelperFunctions/ScaleGenerator";
import { DarkBlue, DefaultForeignObjectHeight, DefaultForeignObjectWidth, IndicatorSize, IndicatorSpace, margin } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisLeft, axisTop } from "d3-axis";
import { select } from "d3-selection";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import RangeLayer from "./ChartComponents/RangeLayer";
import { useEffect } from "react";
import DataHunchIndicator from "./ChartComponents/DataHunch/DataHunchIndicators";
import { DHProps } from "./TableComponents/Table";
import { DataHunch } from "./Interfaces/Types";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import { Tooltip } from "@material-ui/core";
import { DHIndicatorText } from "./Interfaces/StyledComponents";
import CategoricalIndicator from "./ChartComponents/DataHunch/CategoricalIndicator";
import ChartLegends from "./ChartComponents/ChartLegends";
import SketchLayer from "./ChartComponents/SketchLayer";
import ManipulationForm from "./ChartComponents/Forms/ManipulationForm";


const BarChart: FC<DHProps> = ({ dataHunchArray }: DHProps) => {

    const store = useContext(Store);

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

    const yAxis: any = axisTop(valueScale);
    const xAxis: any = axisLeft(bandScale);

    select('#vertical-axis')
        .attr('transform', `translate(0,${margin.top})`)
        .call(yAxis);

    select('#band-axis')
        .attr("transform", `translate(${margin.left},0)`)
        .call(xAxis);


    return <div>


        <svg width={store.svgWidth} height={store.svgHeight} >
            <ChartLegends />
            <g id='chart-title'>
                <text
                    x={store.svgWidth * 0.5}
                    y={store.svgHeight - margin.bottom}
                    alignmentBaseline='hanging'
                    textAnchor="middle"
                    fontSize='large'
                >{store.datasetName}</text>
                {allChartDHArray.map((d, i) => {
                    return (
                        <Tooltip title={d.reasoning}>
                            <DHIndicatorText
                                isHighlighted={d.id === store.highlightedDH}
                                x={(store.svgWidth - margin.left - margin.right) / 2 * (i % 2)}
                                key={`${d.id}-text`}
                                y={store.svgHeight - margin.bottom + 30 + Math.floor(i / 2) * (IndicatorSpace + IndicatorSize)}
                                fontSize='larger'
                            >
                                {`* ${d.content.length > 25 ? `${d.content.slice(0, 25)}...` : d.content}`}
                            </DHIndicatorText>
                        </Tooltip>
                    );
                })}
            </g>

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
                            fill={store.containCategory.length > 0 ? (categoricalColorScale(d.categorical || 'a') as string) : DarkBlue}
                        />;
                    })}
            </g>




            <g id='data-hunches-container'>

                {/* TODO this part needs some redo depending on how alex wants the indicator/full bar look like */}

                {dataSet.map((barDP) => {
                    if (barDP.dataHunchArray) {
                        const catDH = barDP.dataHunchArray.filter(d => d.type === 'categorical');
                        return (<>
                            <DataHunchIndicator
                                key={`${barDP.label}-dhindicator`}
                                dataHunchArray={barDP.dataHunchArray}
                            />
                            <CategoricalIndicator dataHunchArrayString={JSON.stringify(catDH)} key={`${barDP.label}-catindicator`} />
                        </>);


                        // return (
                        //     <>
                        //         <DataHunchIndicator
                        //             key={`${barDP.label}-dhindicator`}
                        //             dataHunchArray={barDP.dataHunchArray.filter(d => ["annotation", 'exclusion', 'categorical'].includes(d.type) || store.selectedDH.includes(d.id))}
                        //         />
                        //         <CategoricalIndicator
                        //             dataHunchArrayString={JSON.stringify(catDH.filter(d => store.selectedDH.includes(d.id)))}
                        //             key={`${barDP.label}-catindicator`} />
                        //     </>);



                    } else {
                        return <></>;
                    }
                })}
            </g>

            {store.inputMode === 'manipulations' ? <RangeLayer sendManipulation={sendManipulationToParent} /> : <></>}

            {store.inputMode === 'sketch' ?
                <SketchLayer sendManipulation={sendManipulationToParent} /> : <></>
            }

            <FormComponent manipulationOutput={manipulationResult} />

            <SpecificControl />


        </svg>
        <div style={{ width: DefaultForeignObjectWidth, height: DefaultForeignObjectHeight }}>
            {(store.inputMode === 'sketch' || store.inputMode === 'manipulations') ?
                <ManipulationForm manipulationOutput={manipulationResult} type={store.inputMode} /> : <></>
            }
        </div>
    </div>;
};

export default observer(BarChart);