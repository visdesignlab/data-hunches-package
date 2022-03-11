import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { DataContext } from "..";
import { makeValueScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { LightGray, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";

type Props = {
    sendManipulation: (manipulationResult: string) => void;
};
const RangeLayer: FC<Props> = ({ sendManipulation }: Props) => {
    const store = useContext(Store);

    const [isMouseDown, setIsMouseDown] = useState(false);
    //const [isDragging, setIsDragging] = useState(false);
    const [pointerStartX, setPointerStartX] = useState(0);

    const dataSet = useContext(DataContext);
    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);

    const dragHandler = (e: any) => {

        if (isMouseDown) {
            const xPos = pointer(e)[0];
            select('#result-rect')
                .attr('x', pointerStartX < xPos ? pointerStartX : xPos)
                .attr('width', Math.abs(pointerStartX - xPos));
        }
    };


    const mouseUpHandler = (e: any) => {
        setIsMouseDown(false);
        const dhRect = select('#result-rect');
        let manipulationResult: string;
        manipulationResult =
            [valueScale.invert((parseFloat(dhRect.attr('x') as any) + parseFloat(dhRect.attr('width') as any))).toFixed(2), valueScale.invert(dhRect.attr('x') as any).toFixed(2)].toString();

        sendManipulation(manipulationResult);
    };

    const mouseDownHandler = (e: any) => {
        setIsMouseDown(true);
        setPointerStartX(pointer(e)[0]);
        select('#result-rect')
            .attr('x', pointer(e)[0])
            .attr('width', 2);
    };

    return (
        <g
            display={store.inputMode === 'manipulations' ? undefined : 'none'}>
            {/* Make this part into a sketchy rect */}
            <rect id='result-rect'
                fill='red'
                height={bandScale.bandwidth()}
                y={bandScale(store.selectedDP || '')} />

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