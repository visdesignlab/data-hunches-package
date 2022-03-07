import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeVerticalScale } from "./HelperFunctions/ScaleGenerator";
import { DarkBlue, DarkGray, DefaultForeignObjectHeight, DefaultForeignObjectWidth, IndicatorSize, IndicatorSpace, margin } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import GeneralControl from "./Controls/GeneralControl";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import ManipulationLayer from "./ChartComponents/ManipulationLayer";
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

    const verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    const honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    const categoricalColorScale = makeCategoricalScale(dataSet);

    const yAxis: any = axisLeft(verticalValueScale);
    const xAxis: any = axisBottom(honrizontalBandScale);

    select('#vertical-axis')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);

    select('#band-axis')
        .attr("transform", `translate(0,${store.svgHeight - margin.bottom})`)
        .call(xAxis);

    const findStart = () => {

        return store.svgWidth * 0.5 - IndicatorSpace * (allChartDHArray.length - 1) * 0.5 - (allChartDHArray.length - 1) * IndicatorSize;
    };

    return <div>


        <svg width={store.svgWidth} height={store.svgHeight} >
            <ChartLegends />
            <g id='chart-title'>
                <text
                    x={store.svgWidth * 0.5}
                    y={5}
                    alignmentBaseline='hanging'
                    textAnchor="middle"
                    fontSize='large'
                >{store.datasetName}</text>
                {allChartDHArray.map((d, i) => {
                    return (
                        <Tooltip title={d.content}>
                            <DHIndicatorText
                                isHighlighted={d.id === store.highlightedDH}
                                x={findStart() + IndicatorSize * (i) * 2 + IndicatorSpace * i}
                                key={`${d.id}-text`}
                                y={34}
                                fontSize='large'
                            >
                                *
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
                            height={store.svgHeight - margin.bottom - verticalValueScale(d.value)}
                            width={honrizontalBandScale.bandwidth()}
                            xPos={honrizontalBandScale(d.label) || 0}
                            yPos={verticalValueScale(d.value)}
                            fill={store.containCategory.length > 0 ? (categoricalColorScale(d.categorical || 'a') as string) : DarkBlue}
                        />;
                    })}
            </g>


            <g id='data-hunches-container'>
                {dataSet.map((barDP) => {
                    if (barDP.dataHunchArray) {
                        const catDH = barDP.dataHunchArray.filter(d => d.type === 'categorical');
                        if (store.selectedDH.length === 0) {

                            return (<>
                                <DataHunchIndicator
                                    key={`${barDP.label}-dhindicator`}
                                    dataHunchArray={barDP.dataHunchArray}
                                />
                                <CategoricalIndicator dataHunchArrayString={JSON.stringify(catDH)} key={`${barDP.label}-catindicator`} />
                            </>);

                        } else {
                            return (
                                <>
                                    <DataHunchIndicator
                                        key={`${barDP.label}-dhindicator`}
                                        dataHunchArray={barDP.dataHunchArray.filter(d => ["annotation", 'exclusion', 'categorical'].includes(d.type) || store.selectedDH.includes(d.id))}
                                    />
                                    <CategoricalIndicator
                                        dataHunchArrayString={JSON.stringify(catDH.filter(d => store.selectedDH.includes(d.id)))}
                                        key={`${barDP.label}-catindicator`} />
                                </>);
                        }


                    } else {
                        return <></>;
                    }
                })}
            </g>

            {store.inputMode === 'manipulations' ? <ManipulationLayer sendManipulation={sendManipulationToParent} /> : <></>}


            {store.inputMode === 'sketch' ?
                <SketchLayer sendManipulation={sendManipulationToParent} /> : <></>
            }

            <FormComponent manipulationOutput={manipulationResult} />

            <SpecificControl />


        </svg>
        <div style={{ width: DefaultForeignObjectWidth, height: DefaultForeignObjectHeight }}>
            {store.inputMode === 'sketch' ?
                <ManipulationForm manipulationOutput={manipulationResult} type='sketch' /> : <></>
            }
        </div>
    </div>;
};

export default observer(BarChart);