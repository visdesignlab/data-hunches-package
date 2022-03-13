import { Tooltip } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import 'roughjs';
import * as rough from 'roughjs/bin/rough';
import { SelectionColor, DarkGray, DefaultSketchyOptions } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";

type Props = {
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
};

const SketchyBar: FC<Props> = ({ xPos, yPos, width, height, dataHunch, highlighted, selected }: Props) => {

    const store = useContext(Store);
    const dhRef = useRef(null);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;

            const rc = rough.default.svg(drawingG);

            const sketchyDH = rc.rectangle(xPos, yPos, width, height,
                {
                    ...DefaultSketchyOptions,
                    fill: DarkGray,
                    stroke: DarkGray,
                });
            drawingG.appendChild(sketchyDH);

        };
    }, [xPos, yPos, width, height]);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll('path').attr('stroke', SelectionColor);
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
            onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
            onMouseOut={() => {
                store.setHighlightedDH(-1);
            }}
            onClick={() => { store.setSelectedDH([dataHunch.id]); }}
            cursor='pointer' />
    </Tooltip>);
};

export default observer(SketchyBar);