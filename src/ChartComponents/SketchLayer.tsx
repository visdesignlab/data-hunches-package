import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { LightGray } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { drag as d3dragg } from 'd3-drag';
import { line } from "d3-shape";

type Props = {
    sendManipulation: (manipulationResult: string) => void;
};

const SketchLayer: FC<Props> = ({ sendManipulation }: Props) => {

    const store = useContext(Store);

    let sketchResult: [number, number][][] = [];

    let currentPath: [number, number][] = [];

    const rectRef = useRef(null);
    const currentDrawing = useRef(null);

    const drag = (e: any) => {
        currentPath.push(pointer(e, select(currentDrawing.current).node()));
        if (currentDrawing.current) {
            select(currentDrawing.current)
                .attr('d', generatePath(currentPath));
        }
    };


    const dragStart = () => {
        currentPath = [];
    };

    const dragEnd = () => {
        const newSetPath = currentPath.filter((_d, i) => i % 5 === 0);
        sketchResult.push(newSetPath);
        select('#existing-path').selectAll('path')
            .data(sketchResult)
            .join('path')
            .attr('d', d => generatePath(d))
            .attr('stroke', 'black')
            .attr('fill', 'none');
        sendManipulation(JSON.stringify(sketchResult));
    };

    const generatePath = (points: [number, number][]) => {
        return line()(points);
    };

    useEffect(() => {
        if (currentDrawing.current) {
            select(currentDrawing.current)
                .attr('d', generatePath(currentPath));
        }
    }, [currentPath]);

    useLayoutEffect(() => {
        sketchResult = [];
        if (rectRef.current) {
            select(rectRef.current)
                .call(d3dragg()
                    .on("start", dragStart)
                    .on("drag", drag)
                    .on("end", dragEnd));
        }
    }, [rectRef]);

    return (
        <g id='dragging-layer' display={store.inputMode === 'sketch' ? undefined : 'none'}>
            <rect
                ref={rectRef}
                x={0}
                y={0}
                fill={LightGray}
                opacity={0.2}
                width={store.svgWidth}
                height={store.svgHeight}
            />
            <g>
                <g id='existing-path' />
                <path
                    ref={currentDrawing}
                    fill='none'
                    stroke='black'
                />
            </g>
        </g>);
};

export default observer(SketchLayer);