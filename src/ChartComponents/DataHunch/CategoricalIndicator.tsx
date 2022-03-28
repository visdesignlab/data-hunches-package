import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { DataPreset } from "../../Interfaces/Datasets";
import * as rough from 'roughjs/bin/rough';
import Store from "../../Interfaces/Store";
import { BarChartDataPoint, DataHunch } from "../../Interfaces/Types";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";
import { HighlightColor, SelectionColor } from "../../Interfaces/Constants";

type Props = {
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
    fillColor: string;
};

const CategoricalIndicator: FC<Props> = ({ dataHunch, xPos, yPos, width, height, highlighted, selected, fillColor }: Props) => {

    const store = useContext(Store);
    const dhRef = useRef(null);

    const categoricalScale = makeCategoricalScale(DataPreset[store.dbTag].categories);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {

            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;
            const rc = rough.default.svg(drawingG);
            const sketchyDH = rc.rectangle(xPos, yPos, width, height, {
                fillStyle: 'zigzag',
                fill: fillColor,
                stroke: 'white',
                fillWeight: 10,
                hachureAngle: 20,
                hachureGap: 18,
                roughness: 3,
                strokeWidth: 2
            });
            drawingG.appendChild(sketchyDH);

            select(dhRef.current).selectAll(`path[stroke='white']`).attr('opacity', 0);
        }
    }, [xPos, yPos, width, height, fillColor]);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll(`path[stroke='white'],path[stroke='${SelectionColor}']`)
                    .attr('stroke', HighlightColor)
                    .attr('opacity', 1);
            } else if (selected) {
                select(dhRef.current).selectAll(`path[stroke='white'],path[stroke='${HighlightColor}']`)
                    .attr('stroke', SelectionColor)
                    .attr('opacity', 1);
            } else {
                select(dhRef.current)
                    .selectAll(`path[stroke='${HighlightColor}'],path[stroke='${SelectionColor}']`)
                    .attr('stroke', 'white')
                    .attr('opacity', 0);
            }
        }
    }, [highlighted, selected]);

    return (<StyledTooltip
        dataHunch={dataHunch}
        childrenComponent={
            <g display={store.needToShowPreview ? 'none' : undefined}>
                <g ref={dhRef} />
                <rect
                    x={xPos}
                    y={yPos}
                    width={width}
                    height={height}
                    opacity={0}
                    fill='white'
                    cursor='pointer'
                    onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
                    onMouseOut={
                        () => { store.setHighlightedDH(-1); }
                    }
                    onClick={
                        () => { store.setSelectedDH([dataHunch.id]); }
                    }
                    onContextMenu={(e) => {
                        toVoteDH(e, store.svgWidth, store.svgHeight);
                        store.setVotingDH(dataHunch);
                    }}
                />
            </g>} />);
};

export default observer(CategoricalIndicator);