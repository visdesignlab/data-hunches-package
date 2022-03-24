import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import { DataHunchColor, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";
import * as rough from 'roughjs/bin/rough';
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";

type Props = {
    curvePoints: string;
    arrowPoints: string;
    textX: number;
    textY: number;
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
    rotateX: number;
    rotateY: number;
};
const SingleOverAxisIndicator: FC<Props> = ({ textX, textY, dataHunch, curvePoints, highlighted, selected, arrowPoints, rotateX, rotateY }: Props) => {

    const curveRef = useRef(null);
    const arrowRef = useRef(null);

    const store = useContext(Store);

    useLayoutEffect(() => {
        if (curveRef.current !== null && arrowRef.current !== null) {
            select(curveRef.current).selectAll('*').remove();
            select(arrowRef.current).selectAll('*').remove();
            const drawingG = curveRef.current as any;
            const arrowG = arrowRef.current as any;
            const rc = rough.default.svg(drawingG);
            const arrowRC = rough.default.svg(arrowG);
            const roughCurve = rc.curve(JSON.parse(curvePoints),
                {
                    ...DefaultSketchyOptions,
                    fillStyle: 'hachure',
                    fill: 'none'
                });

            const roughArrow = arrowRC.polygon(JSON.parse(arrowPoints), {
                ...DefaultSketchyOptions,
                fillStyle: 'solid',
            });

            drawingG.appendChild(roughCurve);
            arrowG.appendChild(roughArrow);
        }
    }, [arrowPoints, curvePoints]);


    useLayoutEffect(() => {
        if (curveRef.current !== null && arrowRef.current !== null) {
            if (highlighted) {
                select(curveRef.current).selectAll('path').attr('stroke', HighlightColor);
                select(arrowRef.current).selectAll('path').attr('stroke', HighlightColor).attr('fill', HighlightColor);
            } else if (selected) {
                select(curveRef.current).selectAll('path').attr('stroke', SelectionColor);
                select(arrowRef.current).selectAll('path').attr('stroke', SelectionColor).attr('fill', SelectionColor);
            } else {
                select(curveRef.current).selectAll('path').attr('stroke', DataHunchColor);
                select(arrowRef.current).selectAll('path').attr('stroke', DataHunchColor).attr('fill', DataHunchColor);
            }
        }
    }, [highlighted, selected]);


    return (
        <StyledTooltip
            childrenComponent={<g cursor="pointer"
                onClick={() => { store.setSelectedDH([dataHunch.id]); }}
                onContextMenu={(e) => {
                    toVoteDH(e, store.svgWidth, store.svgHeight, true);
                    store.setVotingDH(dataHunch);
                }}
                onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
                onMouseOut={() => { store.setHighlightedDH(-1); }}>
                <g ref={curveRef} />
                <g ref={arrowRef} transform={`rotate(45,${rotateX},${rotateY})`} />
                <text
                    textAnchor="start"
                    alignmentBaseline="hanging"
                    fill={highlighted ? HighlightColor : (selected ? SelectionColor : DataHunchColor)}
                    x={textX}
                    y={textY}
                    fontFamily="'Nanum Brush Script', cursive"
                    fontWeight="bold"
                >
                    {dataHunch.content}
                </text>
            </g>}
            dataHunch={dataHunch}
        />

    );
};

export default observer(SingleOverAxisIndicator);