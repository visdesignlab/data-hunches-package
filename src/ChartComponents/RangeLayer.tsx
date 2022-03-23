import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useRef, useState } from "react";
import { DataContext } from "..";
import { makeValueScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { SelectionColor, DefaultSketchyOptions, LightGray, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { max, min } from "d3-array";
import { now } from 'd3-timer';
import { SendManiProps } from "./ManipulationLayer";



const RangeLayer: FC<SendManiProps> = ({ sendManipulation }: SendManiProps) => {
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
        fill: SelectionColor,
        stroke: SelectionColor,
        fillWeight: 3,
    };


    const dragHandler = (e: any) => {

        if (isMouseDown) {
            const xPos = pointerStartX < pointer(e)[0] ? pointerStartX : pointer(e)[0];
            const yPos = bandScale(store.selectedDP || '') || 0;
            const height = bandScale.bandwidth();

            if (resultRef.current !== null && ((now() - (timer0 || 0)) > 50)) {

                select(resultRef.current).selectAll('*').remove();
                const drawingG = resultRef.current as any;

                const rc = rough.default.svg(drawingG);

                const sketchyRec = rc.rectangle(xPos + 0.5 * Math.abs(pointerStartX - pointer(e)[0]), yPos, 4, height, sketchyOption);


                const rangePoly = rc.polygon([
                    [xPos, yPos + 0.5 * height],
                    [xPos + 0.5 * Math.abs(pointerStartX - pointer(e)[0]), yPos + 0.5 * height - 4],
                    [xPos + Math.abs(pointerStartX - pointer(e)[0]), yPos + 0.5 * height],
                    [xPos + 0.5 * Math.abs(pointerStartX - pointer(e)[0]), yPos + 0.5 * height + 4]
                ], sketchyOption);

                drawingG.appendChild(sketchyRec);
                drawingG.appendChild(rangePoly);

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
            display={store.inputMode === 'range' ? undefined : 'none'}>

            <g id='result-rect' ref={resultRef} />

            <rect id='drag-rect'
                x={margin.left}
                // y={(bandScale(store.selectedDP || '') || 0) - 50}
                y={margin.top}
                width={store.svgWidth - margin.left - margin.right}
                // height={bandScale.bandwidth() + 100}
                height={store.svgHeight - margin.top - margin.bottom}
                opacity={0}
                fill={LightGray}
                onMouseLeave={() => { setIsMouseDown(false); }}
                onMouseUp={mouseUpHandler}
                onMouseDown={mouseDownHandler}
                onMouseMove={dragHandler}
            />
        </g>);
};

export default observer(RangeLayer);