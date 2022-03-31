import { observer } from "mobx-react-lite";
import { FC, useContext, useState, useRef } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeValueScale } from "./HelperFunctions/ScaleGenerator";
import { DefaultBar, DefaultForeignObjectHeight, DefaultForeignObjectWidth, margin, MaximumHeight, MaximumWidth, SelectionColor, UpDownVoteFOHeight, UpDownVoteFOWidth } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisLeft, axisTop } from "d3-axis";
import { pointer, select } from "d3-selection";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import RangeLayer from "./ChartComponents/RangeLayer";
import { useEffect } from "react";
import DataHunchIndicator from "./ChartComponents/DataHunch/DataHunchIndicators";
import { DataHunch } from "./Interfaces/Types";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import { ContainerDiv, DHIndicatorText, useStyles } from "./Interfaces/StyledComponents";
import CategoricalIndicator from "./ChartComponents/DataHunch/CategoricalIndicator";
import ChartLegends from "./ChartComponents/ChartLegends";
import SketchLayer from "./ChartComponents/SketchLayer";
import ManipulationForm from "./ChartComponents/Forms/ManipulationForm";
import { format } from "d3-format";
import { textwrap } from 'd3-textwrap';
import ManipulationLayer from "./ChartComponents/ManipulationLayer";
import { useLayoutEffect } from "react";
import ChartTitle from "./ChartComponents/ChartTitle";
import SketchyDrawings from "./ChartComponents/DataHunch/SketchyDrawings";
import StyledTooltip from "./ChartComponents/DataHunch/StyledTooltip";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import UpvotesDownvotes, { toVoteDH } from "./ChartComponents/DataHunch/UpvotesDownvotes";
import { DataPreset } from "./Interfaces/Datasets";



type Props = {
    dataHunchArray: DataHunch[];
    retrieveData: () => void;
    showTable: boolean;
};
const BarChart: FC<Props> = ({ dataHunchArray, retrieveData, showTable }: Props) => {

    const store = useContext(Store);
    const styles = useStyles();
    const dataSet = useContext(DataContext);

    const [manipulationResult, setManipulationResult] = useState('');


    const sendManipulationToParent = (manipulationResult: string) => {
        setManipulationResult(manipulationResult);
    };



    useEffect(() => {
        if (!(store.inputMode === 'sketch' ||
            store.inputMode === 'direction' ||
            store.inputMode === 'manipulations' ||
            store.inputMode === 'range')) {
            setManipulationResult('');
        }
    }, [store.inputMode]);

    const [allChartDHArray, setAllChartDHArray] = useState<DataHunch[]>([]);
    const [sketchArray, setSketchArray] = useState<DataHunch[]>([]);

    useEffect(() => {
        let tempArray = dataHunchArray.filter(d => d.label === 'all chart');
        let tempSketchArray = tempArray.filter(d => d.type === 'sketch');

        stateUpdateWrapperUseJSON(allChartDHArray, tempArray, setAllChartDHArray);

        stateUpdateWrapperUseJSON(sketchArray, tempSketchArray, setSketchArray);

    }, [dataHunchArray]);

    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);
    const categoricalColorScale = makeCategoricalScale(DataPreset[store.dbTag].categories);

    const yAxis: any = axisTop(valueScale).tickFormat(format('.2s'));
    const xAxis: any = axisLeft(bandScale);


    select('#vertical-axis')
        .attr('transform', `translate(0,${margin.top})`)
        .call(yAxis);

    const wrap = textwrap().bounds({ width: margin.left - 10, height: bandScale.bandwidth() }).method('tspans');

    select('#band-axis')
        .attr("transform", `translate(${margin.left},0)`)
        .call(xAxis)
        .selectAll(".tick text")
        .attr('font-size', 'small')
        .on('contextmenu', (e, d: any) => {
            e.preventDefault();
            if (store.userName && store.inputMode === 'none') {
                store.selectADataPointMode(true);
                store.setCurrentSelectedDP(d);
                // const xLoc = (pointer(e)[0] + ControlFOWidth) > store.svgWidth ? (pointer(e)[0] - ControlFOWidth) : pointer(e)[0];
                // const yLoc = (pointer(e)[1] + ControlFOHeight) > store.svgHeight ? (pointer(e)[1] - ControlFOHeight) : pointer(e)[1];

                // const formXLoc = (pointer(e)[0] + DefaultForeignObjectWidth) > store.svgWidth ? (pointer(e)[0] - DefaultForeignObjectWidth) : pointer(e)[0];

                // const formYLoc = (pointer(e)[1] + DefaultForeignObjectHeight) > store.svgHeight ? (pointer(e)[1] - DefaultForeignObjectHeight) : pointer(e)[1];

                const xLoc = pointer(e, select('#app-div').node())[0];
                const yLoc = pointer(e, select('#app-div').node())[1];


                select('#specific-control')
                    .style('display', null)
                    .style('left', `${xLoc}px`)
                    .style('top', `${yLoc}px`);
                select('#form-component')
                    .style('left', `${xLoc}px`)
                    .style('top', `${yLoc + bandScale.bandwidth()}px`);
                // .attr('x', formXLoc)
                // .attr('y', formYLoc);

            }
        })
        .call(wrap);

    useLayoutEffect(() => {
        if (store.selectedDP) {
            select('#band-axis').selectAll(".tick text").attr('fill', d => d === store.selectedDP ? SelectionColor : 'black');
        } else {
            select('#band-axis').selectAll(".tick text").attr('fill', 'black');
        }
    }, [store.selectedDP]);

    const svgRef = useRef(null);

    useLayoutEffect(() => {
        if (svgRef.current) {
            resizing();
        }
    }, [svgRef, showTable]);

    window.addEventListener("resize", () => {
        if (svgRef.current) {
            resizing();
        }
    });

    const resizing = () => {

        store.setWidth((svgRef.current as any).clientWidth);
        store.setHeight((svgRef.current as any).clientHeight);
    };

    return (
        <div style={{ height: '100%' }} onClick={() => {

            if (store.votingDH) {
                store.setVotingDH(undefined);
            }
            if (store.selectingADataPoint) {
                store.selectADataPointMode(false);
                store.setCurrentSelectedDP(undefined);
            }
        }}>
            <ChartSVG
                ref={svgRef}
            // onClick={() => {

            //     // if (store.votingDH) {
            //     //     store.setVotingDH(undefined);
            //     // }
            // }}
            >

                {store.showCategory ? <ChartLegends /> : <></>}

                <g id="rectangles-preview" display={store.needToShowPreview ? undefined : 'none'}>
                    <g className='axis' id="axis-mask" transform={`translate(${margin.left},0)`} />
                </g>

                <g className='axis' id="band-axis" />
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

                    {sketchArray.map((sketchDP) => {
                        return <SketchyDrawings dataHunch={sketchDP} key={`sketchy-${sketchDP.id}`}
                            highlighted={sketchDP.id === store.highlightedDH}
                            selected={store.selectedDH.includes(sketchDP.id)} />;
                    })}

                    {dataSet.map((barDP) => {
                        if (barDP.dataHunchArray) {

                            return <DataHunchIndicator
                                dataPoint={barDP}
                                key={`${barDP.label}-dhindicator`}
                                dataHunchArray={barDP.dataHunchArray}
                            />;

                        } else {
                            return <></>;
                        }
                    })}
                </g>
                {store.inputMode === 'range' ? <RangeLayer sendManipulation={sendManipulationToParent} /> : <></>}
                {store.inputMode === 'manipulations' ? <ManipulationLayer sendManipulation={sendManipulationToParent} /> : <></>}
                {store.inputMode === 'sketch' ? <SketchLayer sendManipulation={sendManipulationToParent} /> : <></>}

            </ChartSVG>


            {/* {
                (store.inputMode === 'sketch' ||
                    store.inputMode === 'direction' ||
                    store.inputMode === 'manipulations' ||
                    store.inputMode === 'range') ?
                    <div style={{ width: DefaultForeignObjectWidth, height: DefaultForeignObjectHeight }}>
                        <ManipulationForm manipulationOutput={manipulationResult} type={store.inputMode} />
                    </div> :
                    <></>
            } */}

            <ChartTitle />

            <ContainerDiv>
                <ul className={styles.noBulletsList}>
                    {allChartDHArray.map((d) => {
                        return (
                            <StyledTooltip dataHunch={d}
                                childrenComponent={
                                    <li style={{ width: 'fit-content' }} key={`${d.id}-text`}>
                                        <DHIndicatorText
                                            isHighlighted={d.id === store.highlightedDH}
                                            isSelected={store.selectedDH.includes(d.id)}
                                            onClick={() => { store.setSelectedDH([d.id]); }}
                                            onContextMenu={(e) => {
                                                toVoteDH(e, store.svgWidth, store.svgHeight);
                                                store.setVotingDH(d);
                                            }}
                                            onMouseOver={() => { store.setHighlightedDH(d.id); }}
                                            onMouseOut={() => { store.setHighlightedDH(-1); }}
                                            fontSize='larger'
                                            needBold={true}
                                            style={{ textOverflow: 'ellipsis' }}
                                        >
                                            *{d.type === 'sketch' ? 'sketch' : d.content}
                                        </DHIndicatorText>
                                    </li>} />
                        );
                    })}
                </ul>
            </ContainerDiv>
            <UpvotesDownvotes
                retrieveData={retrieveData} />

            <FormComponent manipulationOutput={manipulationResult} />

            <SpecificControl sendManipulation={sendManipulationToParent} />


        </div >
    );
};

export default observer(BarChart);


const ChartSVG = styled.svg`
  height: 70%;
  width: 100%;
  max-width:${MaximumWidth}px;
  max-height:${MaximumHeight}px
`;

