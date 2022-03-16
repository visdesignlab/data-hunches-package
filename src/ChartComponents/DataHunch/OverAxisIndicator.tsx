import { Tooltip } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { FC, useContext, useEffect, useState } from "react";
import { DataContext } from "../..";
import { handlePreviewOnClick, handleResetOnClick } from "../../HelperFunctions/PreviewReset";
import { makeBandScale, makeValueScale } from "../../HelperFunctions/ScaleGenerator";
import { margin, DarkGray, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { BarChartDataPoint, DataHunch } from "../../Interfaces/Types";
import * as rough from 'roughjs/bin/rough';
import SingleOverAxisIndicator from "./SingleOverAxisIndicator";
type Props = {
    dataHunchArray: DataHunch[];
    dataPoint: BarChartDataPoint;
};
const OverAxisIndicator: FC<Props> = ({ dataHunchArray, dataPoint }: Props) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const curveRef = useRef(null);


    const bandScale = makeBandScale(dataSet, store.svgHeight);
    const valueScale = makeValueScale(dataSet, store.svgWidth);

    return (
        <g>
            <text
                x={valueScale(dataPoint.value) + 7}
                y={(bandScale(dataPoint.label) || 0) + 0.75 * bandScale.bandwidth() - 2}
                textAnchor="middle"
                fontSize="smaller"
                alignmentBaseline="hanging"
            >
                {dataPoint.value}
            </text>
            <g ref={curveRef} />
            {dataHunchArray.map((dataHunch, i) => {
                const startingPoint = valueScale(dataPoint.value) + 10;
                return (<SingleOverAxisIndicator
                    dataHunch={dataHunch}
                    highlighted={store.highlightedDH === dataHunch.id}
                    selected={store.selectedDH.includes(dataHunch.id)}
                    curvePoints={JSON.stringify([
                        [startingPoint, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()],
                        [startingPoint + (i + 1) * 15, (bandScale(dataPoint.label) || 0)],
                        [startingPoint + (i + 1) * 30, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth()]])}
                    arrowPoints={JSON.stringify([
                        [startingPoint + (i + 1) * 30 - 8, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()],
                        [startingPoint + (i + 1) * 30 - 3, (bandScale(dataPoint.label) || 0) + 0.5 * bandScale.bandwidth() + 5],
                        [startingPoint + (i + 1) * 30 + 2, (bandScale(dataPoint.label) || 0) - 5 + 0.5 * bandScale.bandwidth()]])}
                    key={`overaxis${dataHunch.id}`}
                    textX={valueScale(dataPoint.value) + 7 + (i + 1) * 30}
                    textY={(bandScale(dataPoint.label) || 0) + 0.75 * bandScale.bandwidth()} />);
            })}
        </g>
    );
};

export default observer(OverAxisIndicator);
