import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { DataContext } from "..";
import { makeVerticalScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { BrightOrange, LightGray, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";

const ManipulationLayer: FC = () => {
    const store = useContext(Store);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [pointerStartY, setPointerStartY] = useState(0);

    const dataSet = useContext(DataContext);
    const verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    const honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);

    const dragHandler = (e: any) => {

        if (isMouseDown) {
            setIsDragging(true);
            const yPos = pointer(e)[1];
            select('#result-rect')
                .attr('y', pointerStartY < yPos ? pointerStartY : yPos)
                .attr('height', Math.abs(pointerStartY - yPos));
        }
    };


    const mouseUpHandler = (e: any) => {
        setIsMouseDown(false);
        if (isDragging) {
            setIsDragging(false);
        } else {
            console.log('clicked');
        }
    };

    const mouseDownHandler = (e: any) => {
        setIsMouseDown(true);
        setIsDragging(false);
        setPointerStartY(pointer(e)[1]);
        select('#result-rect')
            .attr('y', pointer(e)[1])
            .attr('height', 2);
    };

    return (
        <g
            display={store.inputMode === 'manipulation' ? undefined : 'none'}>
            <rect id='result-rect'
                fill='red'
                width={honrizontalBandScale.bandwidth()}
                x={honrizontalBandScale(store.selectedDP || '')} />
            <rect id='drag-rect'
                x={(honrizontalBandScale(store.selectedDP || '') || 0) - 50}
                y={margin.top}
                width={honrizontalBandScale.bandwidth() + 100}
                height={store.svgHeight - margin.top - margin.bottom}
                opacity={0.5}
                fill={LightGray}
                onMouseLeave={() => { setIsDragging(false); setIsMouseDown(false); }}
                onMouseUpCapture={mouseUpHandler}
                onMouseDown={mouseDownHandler}
                onMouseMove={dragHandler} />

        </g>);
};

export default observer(ManipulationLayer);