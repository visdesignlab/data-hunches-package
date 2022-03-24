import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useRef } from "react";
import { DataContext } from "..";
import { makeCategoricalScale } from "../HelperFunctions/ScaleGenerator";
import { DataPreset, IndicatorSize, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { textwrap } from 'd3-textwrap';
import { select } from "d3-selection";

const ChartLegends: FC = () => {
    const dataSet = useContext(DataContext);
    const store = useContext(Store);

    const legendRef = useRef(null);

    const categoricalColorScale = makeCategoricalScale(dataSet);


    const wrap = textwrap().bounds({ width: 100, height: (IndicatorSize + 2) * 5 }).method('tspans');

    useLayoutEffect(() => {
        if (legendRef.current !== null) {
            select(legendRef.current).selectAll('text').call(wrap);
        }
    }, [legendRef, store.dbTag]);

    return (<g transform={`translate(0,10)`} ref={legendRef}>
        {DataPreset[store.dbTag].categories.map((cat, i) => {
            return (
                <g key={`${cat}-legend`}>
                    <circle
                        fill={categoricalColorScale(cat) as string}
                        cx={store.svgWidth - IndicatorSize * 2 - 100}
                        cy={IndicatorSize + 2 + (IndicatorSize + 2) * i * 4}
                        r={IndicatorSize}
                    />
                    <text
                        x={store.svgWidth - 100}
                        y={IndicatorSize + 2 + (IndicatorSize + 2) * i * 4}
                        alignmentBaseline='central'
                        textAnchor='start'
                    >
                        {cat}
                    </text>
                </g>
            );
        })}
    </g>);
};

export default observer(ChartLegends);