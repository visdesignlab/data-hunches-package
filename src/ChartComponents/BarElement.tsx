import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import { SelectionColor, ControlFOHeight, ControlFOWidth, DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
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

    const evaluateHighlight = () => {
        if (!['none', 'manipulations', 'sketch', 'range'].includes(store.inputMode)) {
            return store.selectedDP === dataElement.label ? SelectionColor : 'none';
        }
        return 'none';
    };

    const barElementOnClick = (e: any) => {
        e.preventDefault();
        if (store.userName && store.inputMode === 'none') {
            store.selectADataPointMode(true);
            store.setCurrentSelectedDP(dataElement.label);
            // const xLoc = (pointer(e)[0] + ControlFOWidth) > store.svgWidth ? (pointer(e)[0] - ControlFOWidth) : pointer(e)[0];
            // const yLoc = (pointer(e)[1] + ControlFOHeight) > store.svgHeight ? (pointer(e)[1] - ControlFOHeight) : pointer(e)[1];

            // const formXLoc = (pointer(e)[0] + DefaultForeignObjectWidth) > store.svgWidth ? (pointer(e)[0] - DefaultForeignObjectWidth) : pointer(e)[0];

            // const formYLoc = (pointer(e)[1] + DefaultForeignObjectHeight) > store.svgHeight ? (pointer(e)[1] - DefaultForeignObjectHeight) : pointer(e)[1];

            const xLoc = pointer(e, select('#app-div').node())[0];
            const yLoc = pointer(e, select('#app-div').node())[1];


            select('#specific-control')
                .style('display', null)
                .style('left', `${xLoc}px`)
                .style('top', `${yLoc}px`);
            select('#form-component')
                .style('left', `${xLoc}px`)
                .style('top', `${yLoc}px`);
            // .attr('x', formXLoc)
            // .attr('y', formYLoc);

        }
    };

    return <rect width={width}
        height={height}
        x={xPos}
        y={yPos}
        // cursor={store.userName ? 'pointer' : undefined}
        onContextMenu={barElementOnClick}
        // onClick={(e) => { barElementOnClick(e, true); }}
        // onMouseLeave={() => { store.setHighlightedDH(-1); store.setSelectedDH([]); }}
        fill={fill}
        strokeWidth={4}
        stroke={evaluateHighlight()}>
    </rect>;
};

export default observer(BarElement);