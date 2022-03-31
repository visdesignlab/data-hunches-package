import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import { useLayoutEffect } from "react";
import { FC } from "react";
import { DataContext } from "../..";
import Store from "../../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { BarChartDataPoint, DataHunch } from "../../Interfaces/Types";
import { select } from "d3-selection";
import { DataHunchColor, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";
import ShowUpvotesDownvotes from "./ShowUpvotesDownvotes";

type Props = {
    dataPoint: BarChartDataPoint;
    dataHunch: DataHunch;
    centerX: number;
    centerY: number;
    highlighted: boolean;
    selected: boolean;
    bandWidth: number;
};

const ExclusionIndicator: FC<Props> = ({ dataHunch, dataPoint, centerX, centerY, bandWidth, highlighted, selected }: Props) => {

    const dhRef = useRef(null);
    const store = useContext(Store);
    const dataSet = useContext(DataContext);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;
            const rc = rough.default.svg(drawingG);

            const firstLine = rc.line(centerX - 20, centerY - 0.5 * bandWidth, centerX + 20, centerY + 0.5 * bandWidth, DefaultSketchyOptions);
            const secondLine = rc.line(centerX - 20, centerY + 0.5 * bandWidth, centerX + 20, centerY - 0.5 * bandWidth, DefaultSketchyOptions);

            drawingG.appendChild(firstLine);
            drawingG.appendChild(secondLine);
        }
    }, [centerX, centerY]);

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
        <StyledTooltip
            dataHunch={dataHunch}
            childrenComponent={
                <g>
                    {dataHunch.upvotes + dataHunch.downvotes > 0 ? <ShowUpvotesDownvotes xPos={centerX + 20} yPos={centerY - 20} dataHunch={dataHunch} /> : <></>}<g ref={dhRef}
                        onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
                        onMouseOut={() => {
                            store.setHighlightedDH(-1);
                        }}
                        onContextMenu={(e) => {
                            toVoteDH(e, store.svgWidth, store.svgHeight);
                            store.setVotingDH(dataHunch);
                        }}
                        onClick={() => { store.setSelectedDH([dataHunch.id]); }}
                        cursor='pointer' />

                </g>}
        />
    );
};

export default observer(ExclusionIndicator);