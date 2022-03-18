import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";
import * as rough from 'roughjs/bin/rough';
import { HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import { LightTooltip } from "../../Interfaces/StyledComponents";

type Props = {
    dataHunch: DataHunch;
    points: [number, number][];
    fill: string;
    opacity: number;
    highlighted: boolean;
    selected: boolean;
};
const SketchyPolygon: FC<Props> = ({ dataHunch, points, fill, opacity, highlighted, selected }: Props) => {

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
                fillStyle: 'zigzag',
                roughness: 2,
                hachureAngle: 5,
                hachureGap: 5,
                fillWeight: 2,
                strokeWidth: 1,
            });
            drawingG.appendChild(sketchyDH);
        }
    }, [points, fill]);


    useLayoutEffect(() => {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll("path[stroke='white'],path[stroke='#eb9800']").attr('stroke', HighlightColor);
            } else if (selected) {
                select(dhRef.current).selectAll("path[stroke='white'],path[stroke='#eb0053']").attr('stroke', SelectionColor);
            } else {
                select(dhRef.current).selectAll("path[stroke='#eb9800'],path[stroke='#eb0053']").attr('stroke', "white");
            }
        }
    }, [highlighted, selected]);

    return (<LightTooltip title={dataHunch.reasoning}>
        <g ref={dhRef}
            onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
            onMouseOut={() => { store.setHighlightedDH(-1); }}
            onClick={() => { store.setSelectedDH([dataHunch.id]); }}
            opacity={opacity}
            // opacity={1}
            cursor='pointer' />
    </LightTooltip>
    );
};

export default observer(SketchyPolygon);