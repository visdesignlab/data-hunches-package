import { FC, useContext, useLayoutEffect, useRef } from "react";
import { DataHunch } from "../../Interfaces/Types";
import { observer } from "mobx-react-lite";
import Store from "../../Interfaces/Store";
import { select } from "d3-selection";
import * as rough from 'roughjs/bin/rough';
import { DataHunchColor, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import { line } from "d3-shape";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";

type Props = {
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
};

const SketchyDrawings: FC<Props> = ({ dataHunch, highlighted, selected }: Props) => {
    const store = useContext(Store);
    const dhRef = useRef(null);



    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            select(dhRef.current).select('*').remove();

            const drawingG = dhRef.current as any;
            const rc = rough.default.svg(drawingG);

            const decodeSketch = JSON.parse(dataHunch.content).sketch as [number, number][][];
            const originalWidth = JSON.parse(dataHunch.content).width as number;
            const originalHeight = JSON.parse(dataHunch.content).height as number;

            decodeSketch.forEach((path) => {
                const sketchyPath = rc.path(line()(path) || '', {
                    ...DefaultSketchyOptions,
                    fillStyle: 'hachure',
                    fill: 'none'
                });
                drawingG.appendChild(sketchyPath);
            });
        }
    }, [dataHunch]);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll('path').attr('stroke', HighlightColor);
            } else if (selected) {
                select(dhRef.current).selectAll('path').attr('stroke', SelectionColor);
            } else {
                select(dhRef.current).selectAll('path').attr('stroke', DataHunchColor);
            }
        }
    }, [highlighted, selected]);

    return (
        <StyledTooltip dataHunch={dataHunch}
            childrenComponent={
                <g ref={dhRef}
                    transform={`scale ( ${store.svgWidth / JSON.parse(dataHunch.content).width},${store.svgHeight / JSON.parse(dataHunch.content).height})`}
                    onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
                    onMouseOut={() => {
                        store.setHighlightedDH(-1);
                    }}
                    onContextMenu={(e) => {
                        toVoteDH(e, store.svgWidth, store.svgHeight);
                        store.setVotingDH(dataHunch);
                    }}
                    onClick={() => { store.setSelectedDH([dataHunch.id]); }}
                    cursor='pointer' />} />
    );
};

export default observer(SketchyDrawings);