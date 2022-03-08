import { Tooltip } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import 'roughjs';
import * as rough from 'roughjs/bin/rough';
import { BrightOrange } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";

type Props = {
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    dataHunch: DataHunch;
};

const SketchyBar: FC<Props> = ({ xPos, yPos, width, height, dataHunch }: Props) => {

    const store = useContext(Store);
    const dhRef = useRef(null);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;

            const rc = rough.default.svg(drawingG);

            const sketchyDH = rc.rectangle(xPos, yPos, width, height, {
                fill: BrightOrange,
                stroke: BrightOrange,
                fillStyle: 'zigzag',
                roughness: 2,
                hachureAngle: 60,
                hachureGap: 10,
                fillWeight: 1,
                strokeWidth: 2,
            });
            drawingG.appendChild(sketchyDH);
            console.log('called');

        };
    }, [xPos, yPos, width, height]);

    return (<Tooltip title={dataHunch.reasoning}>
        <g display={store.needToShowPreview ? 'none' : undefined}
            ref={dhRef}
            onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
            onMouseOut={() => {
                store.setHighlightedDH(-1);
            }}
            cursor='pointer' />
    </Tooltip>);
};

export default observer(SketchyBar);