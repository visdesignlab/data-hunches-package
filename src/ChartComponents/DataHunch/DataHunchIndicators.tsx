import { max, min } from "d3-array";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale, makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { IndicatorSize, LightGray, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import 'roughjs';
import { BarChartDataPoint, DataHunch, InputMode } from "../../Interfaces/Types";
import SketchyBar from "./SketchyBar";
import { DHIndicatorText } from "../../Interfaces/StyledComponents";
import SingleOverAxisIndicator from "./SingleOverAxisIndicator";
import ExclusionIndicator from "./ExclusionIndicator";
import StyledTooltip from "./StyledTooltip";
import SketchyDirection from "./SketchyDirection";
import { toVoteDH } from "./UpvotesDownvotes";
import CategoricalIndicator from "./CategoricalIndicator";
import { DataPreset } from "../../Interfaces/Datasets";
import ShowUpvotesDownvotes from "./ShowUpvotesDownvotes";
import styled from "styled-components";

type Props = {
    dataHunchArray: DataHunch[],
    dataPoint: BarChartDataPoint;
};

const DataHunchIndicator: FC<Props> = ({ dataHunchArray, dataPoint }: Props) => {

    const store = useContext(Store);
    const dataSet = useContext(DataContext);

    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);
    const categoricalScale = makeCategoricalScale(DataPreset[store.dbTag].categories);

    // const [inVisDH, setInVisDH] = useState<DataHunch[]>([]);
    // const [offVisDH, setOffVisDH] = useState<DataHunch[]>([]);
    // const [exDH, setExDH] = useState<DataHunch[]>([]);
    // const [aboveAxisDH, setAboveAxisDH] = useState<DataHunch[]>([]);
    // const [directionDH, setDirectionDH] = useState<DataHunch[]>([]);

    const [dataHunchDictionary, setDataHunchDictionary] = useState<{
        dataSpace: DataHunch[],
        offVis: DataHunch[],
        exclude: DataHunch[],
        aboveAxis: DataHunch[],
        direction: DataHunch[],
        cat: DataHunch[];
    }>({
        dataSpace: [],
        offVis: [],
        exclude: [],
        aboveAxis: [],
        direction: [],
        cat: [],
    });

    useEffect(() => {

        const tempInVis: DataHunch[] = [];
        const tempOffVis: DataHunch[] = [];
        const tempExDH: DataHunch[] = [];
        const tempDirectionDH: DataHunch[] = [];
        const tempAboveAxisDH: DataHunch[] = [];
        const tempCatDH: DataHunch[] = [];

        dataHunchArray.forEach((d) => {
            switch (d.type) {
                case 'exclusion':
                    tempExDH.push(d);
                    break;
                case 'data space':
                    if (parseFloat(d.content) > valueScale.domain()[1]) {
                        tempAboveAxisDH.push(d);
                    } else {
                        tempInVis.push(d);
                    }
                    break;
                case 'direction':
                    tempDirectionDH.push(d);
                    break;
                case 'annotation':
                case 'rating':
                    tempOffVis.push(d);
                    break;
                case 'categorical':
                    tempCatDH.push(d);
                    break;
                default:
                    tempInVis.push(d);
            }

        });

        const assemble = {
            dataSpace: tempInVis,
            offVis: tempOffVis,
            exclude: tempExDH,
            aboveAxis: tempAboveAxisDH,
            direction: tempDirectionDH,
            cat: tempCatDH,
        };

        stateUpdateWrapperUseJSON(dataHunchDictionary, assemble, setDataHunchDictionary);

    }, [dataHunchArray]);

    const calculateX = (dataHunch: DataHunch, condensed: boolean) => {
        if (dataHunch.type === 'range') {
            const parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (condensed) {
                const center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return valueScale(center) - 2;
            }
            else {
                return valueScale(min(parsedRange) as any);
            }
        }
        if (condensed) {
            return valueScale(parseFloat(dataHunch.content));
        }
        return margin.left;
    };

    const calculateWidth = (dataHunch: DataHunch) => {
        if (dataHunch.type === 'range') {
            const parsedRange = JSON.parse('[' + dataHunch.content + ']');
            return Math.abs(valueScale(parsedRange[0]) - valueScale(parsedRange[1]));
        } else {
            return valueScale(parseFloat(dataHunch.content)) - margin.left;
        }
    };

    const findXPos = (dataHunch: DataHunch, index: number, arrayLength: number) => {
        if (valueScale(dataPoint.value) >= (store.svgWidth - margin.right - margin.left)) {
            return valueScale(dataPoint.value) + 10 + Math.floor((bandScale.bandwidth() < 40) ? index : (index / 2)) * 65;
        }
        return valueScale(dataPoint.value) + 10 + Math.floor((bandScale.bandwidth() < 40) ? index : (index / 2)) * 115;
    };

    const findYPos = (index: number) => {
        return (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + (bandScale.bandwidth() < 40 ? 0 : (2 * IndicatorSize) * (index % 2 === 0 ? -1 : 1));
    };

    const calculateText = (dataHunchText: string, placement: number, arrayLength: number, type: InputMode) => {
        if (type === 'rating') {
            const starAmount = parseInt(dataHunchText);
            return (<tspan>
                * <tspan fontSize='medium'>{'★'.repeat(starAmount)}</tspan>
                <tspan fontSize='medium' fill={LightGray} stroke={LightGray}>{'★'.repeat(5 - starAmount)}</tspan>
            </tspan >);
        }
        if (placement >= (store.svgWidth - margin.right - margin.left)) {
            if (arrayLength <= 2) {
                return `* ${dataHunchText.slice(0, 15)}${dataHunchText.length > 15 ? '...' : ''}`;
            }
            return `* ${dataHunchText.slice(0, 3)}...`;
        }
        if ((arrayLength <= 2 && bandScale.bandwidth() > 40) || arrayLength === 1) {
            return `* ${dataHunchText}`;
        }
        return `* ${dataHunchText.slice(0, 10)}${dataHunchText.length > 10 ? '...' : ''}`;
    };

    const calculateCurvePoints = (startingPoint: number, i: number) => {
        return [
            [startingPoint, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()],
            [startingPoint + (i + 1) * 16, (bandScale(dataPoint.label) || 0)],
            [startingPoint + (i + 1) * 32, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]];
    };

    const calculateArrowPoints = (startingPoint: number, i: number) => {
        return [
            [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()],
            [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + 5],
            [startingPoint + (i + 1) * 32 + 8, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]];
    };

    return (
        <g >

            {dataHunchDictionary.dataSpace.map((d, i) => {
                const arrayLength = dataHunchDictionary.dataSpace.length;
                return (
                    <SketchyBar
                        valueScaleDomain={JSON.stringify(valueScale.domain())}
                        valueScaleRange={JSON.stringify(valueScale.range())}
                        dataHunch={d}
                        xPos={calculateX(d, d.type === 'range' || arrayLength > 3)}
                        key={`${d.id}-dhindicatorSketchy`}
                        yPos={(bandScale(d.label) || 0) + (arrayLength > 3 ? 0 : (bandScale.bandwidth() / arrayLength * i))}
                        highlighted={d.id === store.highlightedDH}
                        selected={store.selectedDH.includes(d.id)}
                        width={(d.type === 'range' || arrayLength > 3) ? 4 : calculateWidth(d)}
                        height={bandScale.bandwidth() / (arrayLength > 3 ? 1 : arrayLength)} />
                );
            })}

            {dataHunchDictionary.direction.map((d, i) => {
                return (
                    <SketchyDirection
                        key={`sketchy-${d.id}`}
                        dataHunch={d}
                        highlighted={d.id === store.highlightedDH}
                        selected={store.selectedDH.includes(d.id)}
                        xPos={valueScale(dataPoint.value)}
                        yPos={(bandScale(dataPoint.label) || 0) + bandScale.bandwidth() / dataHunchDictionary.direction.length * (i + 0.5)}
                    />
                );
            })}

            {dataHunchDictionary.aboveAxis.length > 0 ?
                <g>
                    <text
                        x={valueScale(dataPoint.value) + 13}
                        y={(bandScale(dataPoint.label) || 0) + 0.6 * bandScale.bandwidth()}
                        textAnchor="middle"
                        fontSize="small"
                        alignmentBaseline="middle"
                    >
                        {dataPoint.value.toFixed(0)}
                    </text>
                    {dataHunchDictionary.aboveAxis.map((dataHunch, i) => {
                        const startingPoint = valueScale(dataPoint.value);
                        return (<SingleOverAxisIndicator
                            dataHunch={dataHunch}
                            highlighted={store.highlightedDH === dataHunch.id}
                            selected={store.selectedDH.includes(dataHunch.id)}

                            curvePoints={JSON.stringify(calculateCurvePoints(valueScale(dataPoint.value), i))}

                            arrowPoints={JSON.stringify(calculateArrowPoints(valueScale(dataPoint.value), i))}

                            rotateX={startingPoint + (i + 1) * 32 - 2}
                            rotateY={(bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()}
                            key={`overaxis${dataHunch.id}`}
                            textX={valueScale(dataPoint.value) + 10 + (i + 1) * 32}
                            textY={(bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()
                            } />);
                    })}
                </g>
                :
                <></>}


            {dataHunchDictionary.offVis.map((d, i) => {
                const arrayLength = dataHunchDictionary.offVis.length;
                return (
                    <StyledTooltip
                        childrenComponent={
                            <g>
                                <DHIndicatorText
                                    x={findXPos(d, i, arrayLength)}
                                    y={findYPos(i)}
                                    fontSize='larger'
                                    needBold={false}
                                    isHighlighted={d.id === store.highlightedDH}
                                    isSelected={store.selectedDH.includes(d.id)}
                                    onClick={() => { store.setSelectedDH([d.id]); }}
                                    onMouseOver={() => { store.setHighlightedDH(d.id); }}
                                    onContextMenu={(e) => {
                                        toVoteDH(e, store.svgWidth, store.svgHeight);
                                        store.setVotingDH(d);
                                    }}
                                    onMouseOut={() => { store.setHighlightedDH(-1); }}>
                                    {calculateText(d.content, findXPos(d, i, arrayLength), arrayLength, d.type)}
                                    {d.upvotes > 0 ? <><tspan className="fa-solid" fontSize='small'> &#xf164;</tspan>{d.upvotes}</> : ''}
                                    {d.downvotes > 0 ? <><tspan className="fa-solid" fontSize='small'> &#xf165;</tspan>{d.downvotes}</> : ''}
                                </DHIndicatorText>

                            </g>}
                        dataHunch={d}
                        key={`${d.id}-text`}
                    />
                );
            })
            }

            {dataHunchDictionary.exclude.map((d, i) => {
                return (
                    <ExclusionIndicator
                        dataPoint={dataPoint}
                        highlighted={store.highlightedDH === d.id}
                        selected={store.selectedDH.includes(d.id)}
                        key={`exclusion-${d.id}`}
                        dataHunch={d}
                        centerX={valueScale(dataPoint.value) - 20 - i * 10}
                        centerY={(bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()}
                        bandWidth={bandScale.bandwidth()}
                    />
                );
            })
            }

            {store.showCategory ? dataHunchDictionary.cat.map((d, i) => {
                const catWidth = (valueScale(dataPoint.value) - margin.left - 40) / DataPreset[store.dbTag].categories.length;
                return (
                    <CategoricalIndicator
                        highlighted={store.highlightedDH === d.id}
                        selected={store.selectedDH.includes(d.id)}
                        key={`cat-${d.id}`}
                        xPos={valueScale(dataPoint.value) - 40 - (i + 1) * catWidth}
                        yPos={(bandScale(dataPoint.label) || 0) + 3}
                        width={catWidth}
                        height={bandScale.bandwidth() - 6}
                        fillColor={categoricalScale(d.content) as string}
                        dataHunch={d} />
                );
            }) : <></>
            }
        </g >
    );
};

export default observer(DataHunchIndicator);
