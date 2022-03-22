import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { DataContext } from "..";
import { makeCategoricalScale } from "../HelperFunctions/ScaleGenerator";
import { DataPreset, IndicatorSize, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";

const ChartLegends: FC = () => {
    const dataSet = useContext(DataContext);
    const store = useContext(Store);

    const categoricalColorScale = makeCategoricalScale(dataSet);

    return (<g transform={`translate(0,${store.svgHeight - (IndicatorSize + 2 + (IndicatorSize + 2) * DataPreset[store.dbTag].categories.length * 2)})`}>
        {DataPreset[store.dbTag].categories.map((cat, i) => {
            return (
                <g key={`${cat}-legend`}>
                    <circle
                        fill={categoricalColorScale(cat) as string}
                        cx={store.svgWidth - IndicatorSize * 2}
                        cy={IndicatorSize + 2 + (IndicatorSize + 2) * i * 2}
                        r={IndicatorSize}
                    />
                    <text
                        x={store.svgWidth - IndicatorSize * 4}
                        y={IndicatorSize + 2 + (IndicatorSize + 2) * i * 2}
                        alignmentBaseline='central'
                        textAnchor='end'
                    >
                        {cat}
                    </text>
                </g>
            );
        })}
    </g>);
};

export default observer(ChartLegends);