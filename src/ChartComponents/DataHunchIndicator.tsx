import { max } from "d3-array";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { DataContext } from "..";
import { makeVerticalScale, makeBandScale, makeCategoricalScale } from "../HelperFunctions/ScaleGenerator";
import { BrightOrange, DarkGray, margin } from "../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import Store from "../Interfaces/Store";
import 'roughjs';
import * as rough from 'roughjs/bin/rough';
import { DataHunch } from "../Interfaces/Types";
import { select } from "d3-selection";

type Props = {
    dataHunchArray: DataHunch[];

};
const DataHunchIndicator: FC<Props> = ({ dataHunchArray }: Props) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    const honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    // const categoricalColorScale = makeCategoricalScale(dataSet);

    const [inVisDH, setInVisDH] = useState<DataHunch[]>([]);
    const [offVisDH, setOffVisDH] = useState<DataHunch[]>([]);

    const dhRef = useRef(null);

    useEffect(() => {
        let tempInVis: DataHunch[] = [];
        let tempOffVis: DataHunch[] = [];
        dataHunchArray.forEach((d) => {
            if (['annotation', 'exclusion'].includes(d.type)) {
                tempOffVis.push(d);
            } else {
                tempInVis.push(d);
            }
        });
        stateUpdateWrapperUseJSON(inVisDH, tempInVis, setInVisDH);
        stateUpdateWrapperUseJSON(offVisDH, tempOffVis, setOffVisDH);
    }, [dataHunchArray]);

    const calculateY = (dataHunch: DataHunch, rangeCenter: boolean) => {
        if (dataHunch.type === 'range') {
            const parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (rangeCenter) {

                const center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return verticalValueScale(center) - 2;
            }
            else {

                return verticalValueScale(max(parsedRange) as any);
            }
        }
        return verticalValueScale(parseFloat(dataHunch.content));
    };

    const calculateHeight = (dataHunch: DataHunch) => {
        if (dataHunch.type === 'range') {
            const parsedRange = JSON.parse('[' + dataHunch.content + ']');
            return Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));
        } else {
            return store.svgHeight - margin.bottom - verticalValueScale(parseFloat(dataHunch.content));
        }
    };

    useLayoutEffect(() => {

        if (inVisDH.length <= 3) {
            if (dhRef.current !== null) {
                select(dhRef.current).selectAll('*').remove();
                const drawingG = dhRef.current as any;

                const rc = rough.default.svg(drawingG);
                inVisDH.forEach((d, i) => {

                    const xPos = (honrizontalBandScale(d.label) || 0) + (honrizontalBandScale.bandwidth() / inVisDH.length * i);
                    const sketchyDH = rc.rectangle(xPos, calculateY(d, false), honrizontalBandScale.bandwidth() / inVisDH.length, calculateHeight(d), {
                        fill: BrightOrange,
                        stroke: BrightOrange,
                        fillStyle: 'zigzag',
                        roughness: 2.8,
                        hachureAngle: 60,
                        hachureGap: 10,
                        fillWeight: 2,
                        strokeWidth: 2,
                    });
                    drawingG.appendChild(sketchyDH);

                    // const sketchyDH = rc.rectangle(100, 100, 100, 100, {
                    //     fill: BrightOrange,
                    //     stroke: BrightOrange,
                    //     fillStyle: 'zigzag',
                    //     roughness: 2.8,
                    //     hachureAngle: 60,
                    //     hachureGap: 10,
                    //     fillWeight: 2,
                    //     strokeWidth: 2,
                });

            };
        }
    }, [inVisDH]);

    return (
        <g>
            {inVisDH.length > 3 ?
                inVisDH.map((d) => {
                    return (
                        <rect
                            key={d.id}
                            x={honrizontalBandScale(d.label)}
                            width={honrizontalBandScale.bandwidth()}
                            y={calculateY(d, true)}
                            height={2}
                            fill={DarkGray}
                            opacity={0.7}
                        />
                    );
                }) : <g ref={dhRef}></g>}
            {/* // : inVisDH.map((d, i) => {
                //     return (
                //         <SketchyBar
                //             xPos={honrizontalBandScale(d.label) || 0 + honrizontalBandScale.bandwidth() / inVisDH.length * i}
                //             yPos={calculateY(d, false)}
                //             width={honrizontalBandScale.bandwidth() / inVisDH.length}
                //             height={calculateHeight(d)} />
                //     );
                // })} */}
            {/* {offVisDH.map((d) => {
                return <></>;
            })} */}
        </g>
    );
};

export default observer(DataHunchIndicator);