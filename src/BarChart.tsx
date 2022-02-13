import { observer } from "mobx-react-lite";
import { FC, useContext, useLayoutEffect, useState } from "react";
import BarElement from './ChartComponents/BarElement';
import { makeBandScale, makeCategoricalScale, makeVerticalScale } from "./HelperFunctions/ScaleGenerator";
import { BrightOrange, DarkBlue, margin } from "./Interfaces/Constants";
import Store from "./Interfaces/Store";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import GeneralControl from "./Controls/GeneralControl";
import FormComponent from "./ChartComponents/FormComponent";
import SpecificControl from "./Controls/SpecificControl";
import { DataContext } from ".";
import ManipulationLayer from "./ChartComponents/ManipulationLayer";
import { useEffect } from "react";
import { DHProps } from "./TableComponents/Table";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import DataHunchIndicator from "./ChartComponents/DataHunchIndicator";
import { DataHunch } from "./Interfaces/Types";
import ReactRough, { Rectangle } from 'react-rough';





const BarChart: FC<DHProps> = ({ dataHunchArray }: DHProps) => {

    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const [manipulationResult, setManipulationResult] = useState('');

    const sendManipulationToParent = (manipulationResult: string) => {
        setManipulationResult(manipulationResult);
    };

    useEffect(() => {
        if (store.inputMode !== 'manipulation') {
            setManipulationResult('');
        }
    }, [store.inputMode]);


    // if needed useCallback

    const verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    const honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    const categoricalColorScale = makeCategoricalScale(dataSet);

    // useLayoutEffect(() => {
    //     const drawingG = document.getElementById('data-hunches-container') as any;
    //     const rc = rough.default.svg(drawingG);

    //     dataSet.forEach((dataPoint) => {

    //         if (dataPoint.dataHunchArray) {
    //             let inVisDH: DataHunch[] = [];
    //             dataPoint.dataHunchArray.forEach((d) => {
    //                 if (!['annotation', 'exclusion'].includes(d.type)) {
    //                     inVisDH.push(d);
    //                 }
    //             });
    //             if (inVisDH.length <= 3) {
    //                 if (document.getElementById('data-hunches-container') !== null) {


    //                     inVisDH.forEach((d, i) => {

    //                         const parsedRange: number[] = JSON.parse('[' + d.content + ']');
    //                         const yPos = verticalValueScale(max(parsedRange) as any);
    //                         const height = Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));

    //                         const sketchyDH = rc.rectangle(honrizontalBandScale(d.label) || 0 + honrizontalBandScale.bandwidth() / inVisDH.length * i, yPos, honrizontalBandScale.bandwidth() / inVisDH.length, height, {
    //                             fill: BrightOrange,
    //                             stroke: BrightOrange,
    //                             fillStyle: 'zigzag',
    //                             roughness: 2.8,
    //                             hachureAngle: 60,
    //                             hachureGap: 10,
    //                             fillWeight: 2,
    //                             strokeWidth: 2,
    //                         });
    //                         drawingG.appendChild(sketchyDH);
    //                     });

    //                 }
    //             }

    //         }

    //     });


    // }, [dataSet]);
    // useLayoutEffect(() => {
    // if (document.getElementById('data-hunches-container') !== null) {
    //     const drawingG = document.getElementById('data-hunches-container') as any;
    //     const rc = rough.default.svg(drawingG);
    //     [1, 2, 3, 4].forEach((d) => {
    //         const sketchyDH = rc.rectangle(100 * d, 100, 100, 100, {
    //             fill: BrightOrange,
    //             stroke: BrightOrange,
    //             fillStyle: 'zigzag',
    //             roughness: 2.8,
    //             hachureAngle: 60,
    //             hachureGap: 10,
    //             fillWeight: 2,
    //             strokeWidth: 2,
    //         });
    //         drawingG.appendChild(sketchyDH);
    //     });
    // }

    //     if (document.getElementById('data-hunches-container') !== null) {
    //         dataSet.forEach((dataPoint) => {
    //             const drawingG = document.getElementById('data-hunches-container') as any;
    //             const rc = rough.default.svg(drawingG);
    //             if (dataPoint.dataHunchArray) {
    //                 let inVisDH: DataHunch[] = [];
    //                 dataPoint.dataHunchArray.forEach((d) => {
    //                     if (!['annotation', 'exclusion'].includes(d.type)) {
    //                         inVisDH.push(d);
    //                     }
    //                 });
    //                 inVisDH = inVisDH
    //                 if (inVisDH.length <= 3) {


    //                     console.log(drawingG, rc);
    //                     inVisDH.forEach((d, i) => {

    //                         const parsedRange: number[] = JSON.parse('[' + d.content + ']');
    //                         const yPos = verticalValueScale(max(parsedRange) as any);
    //                         const height = Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));

    //                         const sketchyDH = rc.rectangle(honrizontalBandScale(d.label) || 0 + honrizontalBandScale.bandwidth() / inVisDH.length * i, yPos, honrizontalBandScale.bandwidth() / inVisDH.length, height, {
    //                             fill: BrightOrange,
    //                             stroke: BrightOrange,
    //                             fillStyle: 'zigzag',
    //                             roughness: 2.8,
    //                             hachureAngle: 60,
    //                             hachureGap: 10,
    //                             fillWeight: 2,
    //                             strokeWidth: 2,
    //                         });
    //                         drawingG.appendChild(sketchyDH);
    //                     });


    //                 }

    //             }
    //         });
    //     };
    // }, [dataSet]);


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
            <g id="rectangles-preview" display={store.inputMode === 'dataSpace' ? undefined : 'none'}>
                <g className='axis' id="axis-mask" transform={`translate(${margin.left},0)`} />
            </g>

            <g className='axis' id="vertical-axis" />



            <g id="rectangles" display={store.inputMode !== 'dataSpace' ? undefined : 'none'}>
                {
                    dataSet.map((d, i) => {
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


            <g id='data-hunches-container'>
                {dataSet.map((d, i) => {
                    if (d.dataHunchArray) {
                        return <DataHunchIndicator
                            key={d.label}
                            dataHunchArray={d.dataHunchArray}
                        />;
                    } else {
                        return <></>;
                    }
                })}
            </g>
            {store.inputMode === 'manipulation' ? <ManipulationLayer sendManipulation={sendManipulationToParent} /> : <></>}
            <FormComponent manipulationOutput={manipulationResult} />
            <SpecificControl />
        </svg>
    </div>;
};

export default observer(BarChart);