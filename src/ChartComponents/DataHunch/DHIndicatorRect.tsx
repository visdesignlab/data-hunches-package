import { Tooltip } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import 'roughjs';
import * as rough from 'roughjs/bin/rough';
import { SelectionColor, DarkGray, HighlightColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";

type Props = {
    xPos: number;
    yPos: number;
    height: number;
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
};

const DHIndicatorRect: FC<Props> = ({ xPos, yPos, height, dataHunch, highlighted, selected }: Props) => {

    const store = useContext(Store);
    const dhRef = useRef(null);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;

            const rc = rough.default.svg(drawingG);

            const sketchyDH = rc.rectangle(xPos, yPos, 4, height, {
                stroke: DarkGray,
                roughness: 2.8,
                hachureAngle: 60,
                hachureGap: 10,
                fillWeight: 2,
                strokeWidth: 2,
            });
            drawingG.appendChild(sketchyDH);
        };
    }, [xPos, yPos, height]);

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

    return (<Tooltip title={dataHunch.reasoning}>
        <g display={store.needToShowPreview ? 'none' : undefined}
            ref={dhRef}
            onMouseOver={() => {
                //  store.setSelectedDH([dataHunch.id]);
                store.setHighlightedDH(dataHunch.id);
            }}
            onMouseOut={() => {
                store.setHighlightedDH(-1);
            }}
            onClick={() => { store.setSelectedDH([dataHunch.id]); }}
            cursor='pointer' />
    </Tooltip>);
};

export default observer(DHIndicatorRect);