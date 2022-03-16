import { Tooltip } from "@material-ui/core";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useCallback, useContext, useLayoutEffect, useRef } from "react";
import 'roughjs';
import * as rough from 'roughjs/bin/rough';
import { SelectionColor, DarkGray, DefaultSketchyOptions, margin } from "../../Interfaces/Constants";
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

            } else {
                const sketchyDH = rc.rectangle(xPos, yPos, width, height, DefaultSketchyOptions
                );
                drawingG.appendChild(sketchyDH);
            }
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

    return (
        <Tooltip title={dataHunch.reasoning}>
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