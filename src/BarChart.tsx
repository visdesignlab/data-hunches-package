import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeVerticalScale } from "./HelperFunctions/ScaleGenerator";
import { DarkBlue, margin } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import GeneralControl from "./Controls/GeneralControl";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import ManipulationLayer from "./ChartComponents/ManipulationLayer";



const BarChart: FC = () => {

    const store = useContext(Store);

    const dataSet = useContext(DataContext);
    // if needed useCallback

    const verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    const honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    const categoricalColorScale = makeCategoricalScale(dataSet);

    const yAxis: any = axisLeft(verticalValueScale);
    const xAxis: any = axisBottom(honrizontalBandScale);

    select('#vertical-axis')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);

    select('#band-axis')
        .attr("transform", `translate(0,${store.svgHeight - margin.bottom})`)
        .call(xAxis);


    return <div>
        <GeneralControl />
        <svg width={store.svgWidth} height={store.svgHeight} >
            <g className='axis' id="band-axis" />
            <g className='axis' id="axis-mask" transform={`translate(${margin.left},0)`} />
            <g className='axis' id="vertical-axis" />

            <g id="rectangles">
                {dataSet.map((d, i) => {
                    return <BarElement
                        key={i}
                        dataElement={d}
                        height={store.svgHeight - margin.bottom - verticalValueScale(d.value)}
                        width={honrizontalBandScale.bandwidth()}
                        xPos={honrizontalBandScale(d.label) || 0}
                        yPos={verticalValueScale(d.value)}
                        fill={store.containCategory ? (categoricalColorScale(d.categorical || 'a') as string) : DarkBlue}
                    />;
                })}
            </g>
            {store.inputMode === 'manipulation' ? <ManipulationLayer /> : <></>}
            <FormComponent />
            <SpecificControl />
        </svg>
    </div>;
};

export default observer(BarChart);