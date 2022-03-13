import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useRef, useState } from "react";
import { DataContext } from "..";
import { makeValueScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { BrightOrange, DefaultSketchyOptions, LightGray, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { max, min } from "d3-array";
import { timer, now } from 'd3-timer';

type Props = {
    sendManipulation: (manipulationResult: string) => void;
};

const RangeLayer: FC<Props> = ({ sendManipulation }: Props) => {
    const store = useContext(Store);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [pointerStartX, setPointerStartX] = useState(0);

    let timer0: number | null = null;

    const resultRef = useRef(null);

    const dataSet = useContext(DataContext);
    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);

    const sketchyOption = {
        ...DefaultSketchyOptions,
        fill: BrightOrange,
        stroke: BrightOrange,
        fillWeight: 3,
    };


    const dragHandler = (e: any) => {

        if (isMouseDown) {
            const xPos = pointerStartX < pointer(e)[0] ? pointerStartX : pointer(e)[0];

            if (resultRef.current !== null && ((now() - (timer0 || 0)) > 50)) {

                select(resultRef.current).selectAll('*').remove();
                const drawingG = resultRef.current as any;

                const rc = rough.default.svg(drawingG);

                const sketchyRec = rc.rectangle(xPos || 0, bandScale(store.selectedDP || '') || 0, Math.abs(pointerStartX - pointer(e)[0]), bandScale.bandwidth(), sketchyOption);
                drawingG.appendChild(sketchyRec);

                timer0 = now();
            }
        }
    };

    const mouseUpHandler = (e: any) => {

        setIsMouseDown(false);
        let manipulationResult: string;
        const pointerEndX = pointer(e)[0];
        manipulationResult =
            [valueScale.invert(min([pointerEndX, pointerStartX]) || 0).toFixed(2), valueScale.invert(max([pointerEndX, pointerStartX]) || 0).toFixed(2)].toString();
        sendManipulation(manipulationResult);
    };

    const mouseDownHandler = (e: any) => {

        if (!isMouseDown && resultRef.current !== null) {

            select(resultRef.current).selectAll('*').remove();
            const drawingG = resultRef.current as any;

            const rc = rough.default.svg(drawingG);

            const sketchyRec = rc.rectangle(pointer(e)[0] || 0, bandScale(store.selectedDP || '') || 0, 2, bandScale.bandwidth(), sketchyOption);
            drawingG.appendChild(sketchyRec);
        }
        setIsMouseDown(true);
        setPointerStartX(pointer(e)[0]);
        timer0 = now();
    };

    return (
        <g
            display={store.inputMode === 'manipulations' ? undefined : 'none'}>

            <g id='result-rect' ref={resultRef} />

            <rect id='drag-rect'
                x={margin.left}
                y={(bandScale(store.selectedDP || '') || 0) - 50}
                width={store.svgWidth - margin.left - margin.right}
                height={bandScale.bandwidth() + 100}
                opacity={0.5}
                fill={LightGray}
                onMouseLeave={() => { setIsMouseDown(false); }}
                onMouseUp={mouseUpHandler}
                onMouseDown={mouseDownHandler}
                onMouseMove={dragHandler}
            />
        </g>);
};

export default observer(RangeLayer);