import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import { DataHunch } from "../../Interfaces/Types";
import Store from "../../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import StyledTooltip from "./StyledTooltip";
import { select } from "d3-selection";
import { HighlightColor, SelectionColor, DataHunchColor, DefaultSketchyOptions } from "../../Interfaces/Constants";
import { toVoteDH } from "./UpvotesDownvotes";
import ShowUpvotesDownvotes from "./ShowUpvotesDownvotes";

type Props = {
    xPos: number;
    yPos: number;
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
};

const SketchyDirection: FC<Props> = ({ dataHunch, xPos, yPos, highlighted, selected }: Props) => {

    const store = useContext(Store);
    const dhRef = useRef(null);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {

            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;
            const rc = rough.default.svg(drawingG);

            const sketchyLine = rc.line(xPos, yPos, dataHunch.content === 'higher' ? xPos + 14 : xPos - 14, yPos, DefaultSketchyOptions);
            drawingG.appendChild(sketchyLine);
            const sketchyArrow = rc.polygon([
                [dataHunch.content === 'higher' ? xPos + 14 : xPos - 14, yPos - 7],
                [dataHunch.content === 'higher' ? xPos + 14 : xPos - 14, yPos + 7],
                [dataHunch.content === 'higher' ? xPos + 21 : xPos - 21, yPos]
            ], { ...DefaultSketchyOptions, fillStyle: 'solid' });
            drawingG.appendChild(sketchyArrow);
        }
    }, [xPos, yPos]);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll('path').attr('stroke', HighlightColor).attr('fill', HighlightColor);
            } else if (selected) {
                select(dhRef.current).selectAll('path').attr('stroke', SelectionColor).attr('fill', SelectionColor);
            } else {
                select(dhRef.current).selectAll('path').attr('stroke', DataHunchColor).attr('fill', DataHunchColor);
            }
        }
    }, [highlighted, selected]);

    return (
        <StyledTooltip dataHunch={dataHunch} childrenComponent={
            <g display={store.needToShowPreview ? 'none' : undefined}>
                {dataHunch.upvotes + dataHunch.downvotes > 0 ? <ShowUpvotesDownvotes xPos={xPos + 16} yPos={yPos - 7} dataHunch={dataHunch} /> : <></>}

                <g
                    ref={dhRef}
                    cursor='pointer'
                    onContextMenu={(e) => {
                        toVoteDH(e, store.svgWidth, store.svgHeight);
                        store.setVotingDH(dataHunch);
                    }}
                    onClick={() => { store.setSelectedDH([dataHunch.id]); }}
                    onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
                    onMouseOut={() => { store.setHighlightedDH(-1); }}
                />

            </g>} />
    );
};

export default observer(SketchyDirection);