import { max, min } from "d3-array";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale } from "../../HelperFunctions/ScaleGenerator";
import { IndicatorSize, IndicatorSpace, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import 'roughjs';
import { DataHunch } from "../../Interfaces/Types";
import SketchyBar from "./SketchyBar";
import { DHIndicatorText } from "../../Interfaces/StyledComponents";
import { Tooltip } from "@material-ui/core";
import OverAxisIndicator from "./OverAxisIndicator";
import { DHProps } from "../../TableComponents/Table";
import DHIndicatorRect from "./DHIndicatorRect";


const DataHunchIndicator: FC<DHProps> = ({ dataHunchArray }: DHProps) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);
    // const categoricalColorScale = makeCategoricalScale(dataSet);

    const [inVisDH, setInVisDH] = useState<DataHunch[]>([]);
    const [offVisDH, setOffVisDH] = useState<DataHunch[]>([]);
    const [exDH, setExDH] = useState<DataHunch[]>([]);

    useEffect(() => {
        let tempInVis: DataHunch[] = [];
        let tempOffVis: DataHunch[] = [];
        let tempExDH: DataHunch[] = [];
        dataHunchArray.forEach((d) => {
            if (['annotation', 'categorical'].includes(d.type)) {
                tempOffVis.push(d);
            } else if (d.type === 'exclusion') {
                tempExDH.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        stateUpdateWrapperUseJSON(inVisDH, tempInVis, setInVisDH);
        stateUpdateWrapperUseJSON(offVisDH, tempOffVis, setOffVisDH);
        stateUpdateWrapperUseJSON(exDH, tempExDH, setExDH);
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
                return valueScale(dp.value) + Math.floor(index / 2) * 20;
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
            return '* ...';
        }
        if (arrayLength <= 2) {
            return `* ${dataHunchText}`;
        }
        return `* ${dataHunchText.slice(0, 10)}${dataHunchText.length > 10 ? '...' : ''}`;
    };

    return (
        <g >
            {inVisDH.map((d, i) => {
                if (parseFloat(d.content) > valueScale.domain()[1]) {
                    return <OverAxisIndicator dataHunch={d} key={`${d.id}-overaxis`} />;
                }
                if (inVisDH.length > 3) {
                    return (
                        <DHIndicatorRect
                            key={`${d.id}-dhindicatorRect`}
                            dataHunch={d}
                            highlighted={d.id === store.highlightedDH || store.selectedDH.includes(d.id)}
                            xPos={calculateX(d, true)}
                            height={bandScale.bandwidth()}
                            yPos={bandScale(d.label) || 0}
                        />
                    );
                } else {
                    return (
                        <SketchyBar
                            dataHunch={d}
                            xPos={calculateX(d, false)}
                            key={`${d.id}-dhindicatorSketchy`}
                            yPos={(bandScale(d.label) || 0) + bandScale.bandwidth() / inVisDH.length * i}
                            highlighted={d.id === store.highlightedDH || store.selectedDH.includes(d.id)}
                            width={calculateWidth(d)}
                            height={bandScale.bandwidth() / inVisDH.length} />
                    );
                }
            })}

            {offVisDH.map((d, i) => {
                return (
                    <Tooltip title={d.reasoning}>
                        <DHIndicatorText
                            x={findXPos(d, i, offVisDH.length)}
                            y={(bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * IndicatorSize) * (i % 2 === 0 ? -1 : 1)}
                            fontSize='larger'
                            key={`${d.id}-text`}
                            isHighlighted={d.id === store.highlightedDH || store.selectedDH.includes(d.id)}
                            onClick={() => { store.setSelectedDH([d.id]); }}
                            onMouseOver={() => { store.setHighlightedDH(d.id); }}
                            onMouseOut={() => { store.setHighlightedDH(-1); }}>
                            {calculateText(d.content, findXPos(d, i, offVisDH.length), offVisDH.length)}
                        </DHIndicatorText>
                    </Tooltip>);
            })}

            {exDH.map((d, i) => {
                return (<Tooltip title={d.reasoning}>
                    <DHIndicatorText
                        isHighlighted={d.id === store.highlightedDH || store.selectedDH.includes(d.id)}
                        x={IndicatorSize * (Math.floor(i / 2) + 1)}
                        y={(bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * IndicatorSize) * (i % 2 === 0 ? -1 : 1)}
                        fontSize='small'
                        onClick={() => { store.setSelectedDH([d.id]); }}
                        key={`${d.id}-text`}>
                        x
                    </DHIndicatorText>
                </Tooltip>);
            })}
        </g>
    );
};

export default observer(DataHunchIndicator);