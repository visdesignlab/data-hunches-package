import { max } from "d3-array";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { DataContext } from "../..";
import { makeVerticalScale, makeBandScale, makeCategoricalScale } from "../../HelperFunctions/ScaleGenerator";
import { BrightOrange, DarkGray, IndicatorSize, IndicatorSpace, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import 'roughjs';
import { DataHunch } from "../../Interfaces/Types";
import SketchyBar from "./SketchyBar";
import { DHIndicatorRect, DHIndicatorText } from "../../Interfaces/StyledComponents";
import { Tooltip } from "@material-ui/core";
import OverAxisIndicator from "./OverAxisIndicator";
import { DHProps } from "../../TableComponents/Table";


const DataHunchIndicator: FC<DHProps> = ({ dataHunchArray }: DHProps) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    const honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    // const categoricalColorScale = makeCategoricalScale(dataSet);

    const [inVisDH, setInVisDH] = useState<DataHunch[]>([]);
    const [offVisDH, setOffVisDH] = useState<DataHunch[]>([]);


    useEffect(() => {
        let tempInVis: DataHunch[] = [];
        let tempOffVis: DataHunch[] = [];
        dataHunchArray.forEach((d) => {
            if (['annotation', 'exclusion', 'categorical'].includes(d.type)) {
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

    return (
        <g >
            {inVisDH.map((d, i) => {
                if (parseFloat(d.content) > verticalValueScale.domain()[0]) {
                    return <OverAxisIndicator dataHunch={d} key={`${d.id}-overaxis`} />;
                }
                if (inVisDH.length > 3) {
                    return (
                        <DHIndicatorRect
                            display={store.needToShowPreview ? 'none' : undefined}
                            key={`${d.id}-dhindicatorRect`}
                            onMouseOver={() => { store.setSelectedDH([d.id]); store.setHighlightedDH(d.id); }}
                            x={honrizontalBandScale(d.label) || 0}
                            width={honrizontalBandScale.bandwidth()}
                            y={calculateY(d, true)}

                        />
                    );
                } else {
                    return (
                        <SketchyBar
                            dataHunch={d}
                            xPos={(honrizontalBandScale(d.label) || 0) + (honrizontalBandScale.bandwidth() / inVisDH.length * i)}
                            key={`${d.id}-dhindicatorSketchy`}
                            yPos={calculateY(d, false)}
                            width={honrizontalBandScale.bandwidth() / inVisDH.length}
                            height={calculateHeight(d)} />
                    );
                }
            })}


            {offVisDH.map((d, i) => {

                return (
                    <Tooltip title={d.reasoning}>
                        <DHIndicatorText
                            x={(honrizontalBandScale(d.label) || 0) + 0.5 * honrizontalBandScale.bandwidth() + (2 * IndicatorSize + IndicatorSpace) * (i % 2 === 0 ? -1 : 1)}
                            y={store.svgHeight - margin.bottom + 25 + 2 * (IndicatorSize + IndicatorSpace) * Math.floor(i / 2)}
                            fontSize={d.type === 'exclusion' ? 'small' : 'large'}
                            key={`${d.id}-text`}
                            isHighlighted={d.id === store.highlightedDH}
                            onMouseOver={() => { store.setHighlightedDH(d.id); }}
                            onMouseOut={() => { store.setHighlightedDH(-1); }}>
                            {d.type === 'exclusion' ? 'x' : '*'}
                        </DHIndicatorText>
                    </Tooltip>);
            }
            )}
        </g>
    );
};

export default observer(DataHunchIndicator);