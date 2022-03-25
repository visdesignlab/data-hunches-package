import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useContext, useLayoutEffect, useRef } from "react";
import * as rough from 'roughjs/bin/rough';
import { SelectionColor, DefaultSketchyOptions, HighlightColor, DataHunchColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";

type Props = {
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
    valueScaleDomain: string;
    valueScaleRange: string;
};

const SketchyBar: FC<Props> = ({ xPos, yPos, width, height, dataHunch, highlighted, selected, valueScaleDomain, valueScaleRange }: Props) => {

    const store = useContext(Store);
    const dhRef = useRef(null);

    const valueScale = useCallback(() => {
        return scaleLinear()
            .domain(JSON.parse(valueScaleDomain))
            .range(JSON.parse(valueScaleRange));
    }, [valueScaleDomain, valueScaleRange]);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {

            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;
            const rc = rough.default.svg(drawingG);

            if (dataHunch.type === 'range') {
                const parsedRange = JSON.parse('[' + dataHunch.content + ']');
                const sketchyDH = rc.rectangle(xPos, yPos, width, height, DefaultSketchyOptions
                );
                const rangePoly = rc.polygon(([
                    [valueScale()(parsedRange[0]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height - 4],
                    [valueScale()(parsedRange[1]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height + 4]
                ]), DefaultSketchyOptions);

                drawingG.appendChild(sketchyDH);
                drawingG.appendChild(rangePoly);

                select(dhRef.current).append('polygon')
                    .attr('points', ([
                        [valueScale()(parsedRange[0]), yPos + 0.5 * height],
                        [xPos, yPos + 0.5 * height - 4],
                        [valueScale()(parsedRange[1]), yPos + 0.5 * height],
                        [xPos, yPos + 0.5 * height + 4]
                    ]).toString())
                    .attr('opacity', 0)
                    .attr('fill', 'white')
                    .attr('cursor', 'pointer')
                    .on('mouseover', () => { store.setHighlightedDH(dataHunch.id); })
                    .on('mouseout', () => { store.setHighlightedDH(-1); })
                    .on('click', () => { store.setSelectedDH([dataHunch.id]); });

            } else {
                const sketchyDH = rc.rectangle(xPos, yPos, width, height, DefaultSketchyOptions
                );
                drawingG.appendChild(sketchyDH);
            }

            select(dhRef.current).append('rect')
                .attr('x', xPos)
                .attr('y', yPos)
                .attr('width', width)
                .attr('height', height)
                .attr('opacity', 0)
                .attr('fill', 'white')
                .attr('cursor', 'pointer')
                .on('mouseover', () => { store.setHighlightedDH(dataHunch.id); })
                .on('mouseout', () => { store.setHighlightedDH(-1); })
                .on('click', () => { store.setSelectedDH([dataHunch.id]); });
        };
    }, [xPos, yPos, width, height]);

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
        <StyledTooltip dataHunch={dataHunch} childrenComponent={
            <g display={store.needToShowPreview ? 'none' : undefined}
                ref={dhRef}
                onContextMenu={(e) => {
                    toVoteDH(e, store.svgWidth, store.svgHeight);
                    store.setVotingDH(dataHunch);
                }}
            />} />
    );
};

export default observer(SketchyBar);