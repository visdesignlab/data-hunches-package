import { max, min } from "d3-array";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale } from "../../HelperFunctions/ScaleGenerator";
import { IndicatorSize, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import 'roughjs';
import { BarChartDataPoint, DataHunch } from "../../Interfaces/Types";
import SketchyBar from "./SketchyBar";
import { DHIndicatorText } from "../../Interfaces/StyledComponents";
import SingleOverAxisIndicator from "./SingleOverAxisIndicator";
import ExclusionIndicator from "./ExclusionIndicator";
import StyledTooltip from "./StyledTooltip";

type Props = {
    dataHunchArray: DataHunch[],
    dataPoint: BarChartDataPoint;
};

const DataHunchIndicator: FC<Props> = ({ dataHunchArray, dataPoint }: Props) => {

    const store = useContext(Store);
    const dataSet = useContext(DataContext);

    //   const caseScale = useCallback(() => {
    // return CaseScaleGenerator(caseMax);
    // }, [caseMax]);
    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);

    const [inVisDH, setInVisDH] = useState<DataHunch[]>([]);
    const [offVisDH, setOffVisDH] = useState<DataHunch[]>([]);
    const [exDH, setExDH] = useState<DataHunch[]>([]);
    const [aboveAxisDH, setAboveAxisDH] = useState<DataHunch[]>([]);

    useEffect(() => {
        let tempInVis: DataHunch[] = [];
        let tempOffVis: DataHunch[] = [];
        let tempExDH: DataHunch[] = [];
        let tempAboveAxisDH: DataHunch[] = [];
        dataHunchArray.forEach((d) => {
            if (['annotation', 'categorical', 'direction'].includes(d.type)) {
                tempOffVis.push(d);
            } else if (d.type === 'exclusion') {
                tempExDH.push(d);
            } else if (d.type === 'data space' && parseFloat(d.content) > valueScale.domain()[1]) {
                tempAboveAxisDH.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        stateUpdateWrapperUseJSON(inVisDH, tempInVis, setInVisDH);
        stateUpdateWrapperUseJSON(offVisDH, tempOffVis, setOffVisDH);
        stateUpdateWrapperUseJSON(exDH, tempExDH, setExDH);
        stateUpdateWrapperUseJSON(aboveAxisDH, tempAboveAxisDH, setAboveAxisDH);
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
        const findDP = dataSet.filter(d => d.label === dataHunch.label);
        if (findDP.length > 0) {
            const dp = findDP[0];
            if (valueScale(dp.value) >= (store.svgWidth - margin.right - margin.left)) {
                return valueScale(dp.value) + Math.floor(index / 2) * 40;
            }
            return valueScale(dp.value) + Math.floor(index / 2) * 90;
        }
        return 0;
    };

    const calculateText = (dataHunchText: string, placement: number, arrayLength: number) => {
        if (placement >= (store.svgWidth - margin.right - margin.left)) {
            if (arrayLength <= 2) {
                return `* ${dataHunchText.slice(0, 15)}${dataHunchText.length > 15 ? '...' : ''}`;
            }
            return `* ${dataHunchText.slice(0, 3)}...`;
        }
        if (arrayLength <= 2) {
            return `* ${dataHunchText}`;
        }
        return `* ${dataHunchText.slice(0, 10)}${dataHunchText.length > 10 ? '...' : ''}`;
    };

    return (
        <g >
            {inVisDH.map((d, i) => {
                return (
                    <SketchyBar
                        valueScaleDomain={JSON.stringify(valueScale.domain())}
                        valueScaleRange={JSON.stringify(valueScale.range())}
                        dataHunch={d}
                        xPos={calculateX(d, d.type === 'range' || inVisDH.length > 3)}
                        key={`${d.id}-dhindicatorSketchy`}
                        yPos={(bandScale(d.label) || 0) + (inVisDH.length > 3 ? 0 : (bandScale.bandwidth() / inVisDH.length * i))}
                        highlighted={d.id === store.highlightedDH}
                        selected={store.selectedDH.includes(d.id)}
                        width={(d.type === 'range' || inVisDH.length > 3) ? 4 : calculateWidth(d)}
                        height={bandScale.bandwidth() / (inVisDH.length > 3 ? 1 : inVisDH.length)} />
                );
            })}

            {aboveAxisDH.length > 0 ?
                <g>
                    <text
                        x={valueScale(dataPoint.value) + 15}
                        y={(bandScale(dataPoint.label) || 0) + 0.6 * bandScale.bandwidth()}
                        textAnchor="middle"
                        fontSize="medium"
                        alignmentBaseline="middle"
                    >
                        {dataPoint.value}
                    </text>
                    {aboveAxisDH.map((dataHunch, i) => {
                        const startingPoint = valueScale(dataPoint.value);
                        return (<SingleOverAxisIndicator
                            dataHunch={dataHunch}
                            highlighted={store.highlightedDH === dataHunch.id}
                            selected={store.selectedDH.includes(dataHunch.id)}
                            curvePoints={JSON.stringify([
                                [startingPoint, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()],
                                [startingPoint + (i + 1) * 16, (bandScale(dataPoint.label) || 0)],
                                [startingPoint + (i + 1) * 32, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]])}
                            arrowPoints={JSON.stringify([
                                [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()],
                                [startingPoint + (i + 1) * 32 - 2, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + 5],
                                [startingPoint + (i + 1) * 32 + 8, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]])}
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


            {offVisDH.map((d, i) => {
                return (
                    <StyledTooltip
                        childrenComponent={<DHIndicatorText
                            x={findXPos(d, i, offVisDH.length)}
                            y={(bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * IndicatorSize) * (i % 2 === 0 ? -1 : 1)}
                            fontSize='larger'
                            needBold={false}
                            isHighlighted={d.id === store.highlightedDH}
                            isSelected={store.selectedDH.includes(d.id)}
                            onClick={() => { store.setSelectedDH([d.id]); }}
                            onMouseOver={() => { store.setHighlightedDH(d.id); }}
                            onMouseOut={() => { store.setHighlightedDH(-1); }}>
                            {calculateText(d.content, findXPos(d, i, offVisDH.length), offVisDH.length)}
                        </DHIndicatorText>}
                        dataHunch={d}
                        key={`${d.id}-text`}
                    />
                );
            })
            }

            {exDH.map((d, i) => {
                return (
                    <ExclusionIndicator
                        dataPoint={dataPoint}
                        highlighted={store.highlightedDH === d.id}
                        selected={store.selectedDH.includes(d.id)}
                        dataHunch={d}
                        centerX={valueScale(dataPoint.value) - 20 - i * 10}
                        centerY={(bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()}
                        bandWidth={bandScale.bandwidth()}
                    />
                );
            })
            }
        </g >
    );
};

export default observer(DataHunchIndicator);