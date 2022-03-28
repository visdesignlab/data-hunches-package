import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef, useEffect } from "react";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";
import * as rough from 'roughjs/bin/rough';
import { HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";

type Props = {
    dataHunch: DataHunch;
    points: [number, number][];
    fill: string;
    opacity: number;
    highlighted: boolean;
    selected: boolean;
};
const SketchyPolygon: FC<Props> = ({ dataHunch, points, fill, opacity, highlighted, selected }: Props) => {

    const dhRef = useRef(null);
    const store = useContext(Store);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;
            const rc = rough.default.svg(drawingG);

            const sketchyDH = rc.polygon((points), {
                fill: fill,
                stroke: 'white',
                fillStyle: 'zigzag',
                roughness: 2,
                hachureAngle: 5,
                hachureGap: 5,
                fillWeight: 2,
                strokeWidth: 1,
            });
            drawingG.appendChild(sketchyDH);

            //Add a polygon for mouse interaction
            select(dhRef.current).append('polygon')
                .attr('points', points.toString())
                .attr('opacity', 0)
                .attr('fill', 'white')
                .attr('cursor', 'pointer')
                .on('mouseover', () => { store.setHighlightedDH(dataHunch.id); })
                .on('mouseout', () => { store.setHighlightedDH(-1); })
                .on('click', () => { store.setSelectedDH([dataHunch.id]); });
        }
    }, [points, fill]);


    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll(`path[stroke='white'],path[stroke='${SelectionColor}']`).attr('stroke', HighlightColor);
            } else if (selected) {
                select(dhRef.current).selectAll(`path[stroke='white'],path[stroke='${HighlightColor}']`).attr('stroke', SelectionColor);
            } else {
                select(dhRef.current).selectAll(`path[stroke='${HighlightColor}'],path[stroke='${SelectionColor}']`).attr('stroke', "white");
            }
        }
    }, [highlighted, selected]);

    return (<StyledTooltip dataHunch={dataHunch}
        childrenComponent={
            <g ref={dhRef}
                opacity={opacity}
                onContextMenu={(e) => {
                    toVoteDH(e, store.svgWidth, store.svgHeight);
                    store.setVotingDH(dataHunch);
                }}
            />} />
    );
};

export default observer(SketchyPolygon);