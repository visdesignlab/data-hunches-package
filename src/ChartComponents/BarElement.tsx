import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import { BrightOrange, ControlFOHeight, ControlFOWidth, DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { BarChartDataPoint } from "../Interfaces/Types";

type Props = {
    width: number;
    height: number;
    xPos: number;
    yPos: number;
    fill: string;
    dataElement: BarChartDataPoint;
};

//Make a single bar

//Maybe we should just do on click in here instead of "click" a button

const BarElement: FC<Props> = ({ width, height, xPos, yPos, fill, dataElement }: Props) => {
    const store = useContext(Store);

    const barElementOnClick = (e: any) => {
        if (store.selectingADataPoint) {
            store.setCurrentSelectedDP(dataElement.label);
            const xLoc = (pointer(e)[0] + ControlFOWidth) > store.svgWidth ? (pointer(e)[0] - ControlFOWidth) : pointer(e)[0];
            const yLoc = (pointer(e)[1] + ControlFOHeight) > store.svgHeight ? (pointer(e)[1] - ControlFOHeight) : pointer(e)[1];

            const formXLoc = (pointer(e)[0] + DefaultForeignObjectWidth) > store.svgWidth ? (pointer(e)[0] - DefaultForeignObjectWidth) : pointer(e)[0];

            const formYLoc = (pointer(e)[1] + DefaultForeignObjectHeight) > store.svgHeight ? (pointer(e)[1] - DefaultForeignObjectHeight) : pointer(e)[1];

            select('#specific-control')
                .attr('display', null)
                .attr('x', xLoc)
                .attr('y', yLoc);
            select('#form-component')
                .attr('x', formXLoc)
                .attr('y', formYLoc);
        }
    };

    return <rect width={width}
        height={height}
        x={xPos}
        y={yPos}
        cursor={store.selectingADataPoint ? 'pointer' : undefined}
        onClick={barElementOnClick}
        fill={store.selectedDP === dataElement.label ? BrightOrange : fill}>

    </rect>;
};

export default observer(BarElement);