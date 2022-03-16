import { Tooltip } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, useRef } from "react";
import { useLayoutEffect } from "react";
import { FC } from "react";
import { DataContext } from "../..";
import Store from "../../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { BarChartDataPoint, DataHunch } from "../../Interfaces/Types";
import { select } from "d3-selection";
import { DarkGray, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";

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
                select(dhRef.current).selectAll('path').attr('stroke', DarkGray);
            }
        }
    }, [highlighted, selected]);

    return (
        <Tooltip title={dataHunch.reasoning}>
            <g ref={dhRef}
                onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
                onMouseOut={() => {
                    store.setHighlightedDH(-1);
                }}
                onClick={() => { store.setSelectedDH([dataHunch.id]); }}
                cursor='pointer' />
        </Tooltip>
    );
};

export default observer(ExclusionIndicator);