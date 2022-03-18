import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import { DataHunchColor, DefaultSketchyOptions, HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";
import * as rough from 'roughjs/bin/rough';
import { LightTooltip } from "../../Interfaces/StyledComponents";

type Props = {
    curvePoints: string;
    arrowPoints: string;
    textX: number;
    textY: number;
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
};
const SingleOverAxisIndicator: FC<Props> = ({ textX, textY, dataHunch, curvePoints, highlighted, selected, arrowPoints }: Props) => {

    const curveRef = useRef(null);
    const store = useContext(Store);

    useLayoutEffect(() => {
        if (curveRef.current !== null) {
            select(curveRef.current).selectAll('*').remove();
            const drawingG = curveRef.current as any;
            const rc = rough.default.svg(drawingG);

            const roughCurve = rc.curve(JSON.parse(curvePoints),
                {
                    ...DefaultSketchyOptions,
                    fillStyle: 'hachure',
                    fill: 'none'
                });

            const roughArrow = rc.polygon(JSON.parse(arrowPoints), {
                ...DefaultSketchyOptions,
                fillStyle: 'solid',
            });

            drawingG.appendChild(roughCurve);
            drawingG.appendChild(roughArrow);
        }
    }, [arrowPoints, curvePoints]);


    useLayoutEffect(() => {
        if (curveRef.current !== null) {
            if (highlighted) {
                select(curveRef.current).selectAll('path').attr('stroke', HighlightColor);
            } else if (selected) {
                select(curveRef.current).selectAll('path').attr('stroke', SelectionColor);
            } else {
                select(curveRef.current).selectAll('path').attr('stroke', DataHunchColor);
            }
        }
    }, [highlighted, selected]);


    return (
        <LightTooltip title={dataHunch.reasoning}>
            <g cursor="pointer"
                onClick={() => { store.setSelectedDH([dataHunch.id]); }}
                onMouseOver={() => { store.setHighlightedDH(dataHunch.id); }}
                onMouseOut={() => { store.setHighlightedDH(-1); }}>
                <g ref={curveRef} />
                <text
                    textAnchor="middle"
                    alignmentBaseline="hanging"
                    fill={highlighted ? HighlightColor : (selected ? SelectionColor : DataHunchColor)}

                    x={textX}
                    y={textY}
                    fontFamily="'Nanum Brush Script', cursive"
                    fontWeight="bold"
                >
                    {dataHunch.content}
                </text>
            </g>
        </LightTooltip>
    );
};

export default observer(SingleOverAxisIndicator);