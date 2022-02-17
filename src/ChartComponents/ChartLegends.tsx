import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { DataContext } from "..";
import { makeCategoricalScale } from "../HelperFunctions/ScaleGenerator";
import { IndicatorSize } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";

const ChartLegends: FC = () => {
    const dataSet = useContext(DataContext);
    const store = useContext(Store);

    const categoricalColorScale = makeCategoricalScale(dataSet);

    return (<g>
        {store.containCategory.map((cat, i) => {
            return (
                <>
                    <circle
                        fill={categoricalColorScale(cat) as string}
                        key={`${cat}-legendcircle`}
                        cx={store.svgWidth - IndicatorSize * 2}
                        cy={IndicatorSize + 2 + (IndicatorSize + 2) * i * 2}
                        r={IndicatorSize}
                    />
                    <text
                        x={store.svgWidth - IndicatorSize * 4}
                        key={`${cat}-legendtext`}
                        y={IndicatorSize + 2 + (IndicatorSize + 2) * i * 2}
                        alignmentBaseline='central'
                        textAnchor='end'
                    >
                        {cat}
                    </text>
                </>
            );
        })}
    </g>);
};

export default observer(ChartLegends);