import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useLayoutEffect, useRef } from "react";
import 'roughjs';
import * as rough from 'roughjs/bin/rough';
import { BrightOrange } from "../../Interfaces/Constants";

type Props = {
    xPos: number;
    yPos: number;
    width: number;
    height: number;
};

const SketchyBar: FC<Props> = ({ xPos, yPos, width, height }: Props) => {

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
                roughness: 2.8,
                hachureAngle: 60,
                hachureGap: 10,
                fillWeight: 2,
                strokeWidth: 2,
            });
            drawingG.appendChild(sketchyDH);


        };
    }, [xPos, yPos, width, height]);

    return <g ref={dhRef}></g>;
};

export default observer(SketchyBar);