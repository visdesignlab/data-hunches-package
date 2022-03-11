import { Tooltip } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";
import * as rough from 'roughjs/bin/rough';
import { Point } from "react-rough";

type Props = {
    dataHunch: DataHunch;
    points: Point[];
    fill: string;
    opacity: number;
};
const SketchyPolygon: FC<Props> = ({ dataHunch, points, fill, opacity }: Props) => {

    const dhRef = useRef(null);
    const store = useContext(Store);

    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            const drawingG = dhRef.current as any;
            const rc = rough.default.svg(drawingG);

            const sketchyDH = rc.polygon((points), {
                fill: fill,
                stroke: 'white',
                fillStyle: 'solid',
                roughness: 2,
                hachureAngle: 60,
                hachureGap: 10,
                fillWeight: 1,
                strokeWidth: 1,

            });
            drawingG.appendChild(sketchyDH);
        }
    }, [points, fill]);

    return (<Tooltip title={dataHunch.reasoning}>
        <g ref={dhRef}
            onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
            onMouseOut={() => { store.setHighlightedDH(-1); }}
            opacity={opacity}
            cursor='pointer' />
    </Tooltip>
    );
};

export default observer(SketchyPolygon);