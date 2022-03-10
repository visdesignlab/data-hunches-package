import { max } from "d3-array";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale } from "../../HelperFunctions/ScaleGenerator";
import { IndicatorSize, IndicatorSpace, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import 'roughjs';
import { DataHunch } from "../../Interfaces/Types";
import SketchyBar from "./SketchyBar";
import { DHIndicatorText } from "../../Interfaces/StyledComponents";
import { Tooltip } from "@material-ui/core";
import OverAxisIndicator from "./OverAxisIndicator";
import { DHProps } from "../../TableComponents/Table";
import DHIndicatorRect from "./DHIndicatorRect";


const DataHunchIndicator: FC<DHProps> = ({ dataHunchArray }: DHProps) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);
    // const categoricalColorScale = makeCategoricalScale(dataSet);

    const [inVisDH, setInVisDH] = useState<DataHunch[]>([]);
    const [offVisDH, setOffVisDH] = useState<DataHunch[]>([]);
    const [exDH, setExDH] = useState<DataHunch[]>([]);

    useEffect(() => {
        let tempInVis: DataHunch[] = [];
        let tempOffVis: DataHunch[] = [];
        let tempExDH: DataHunch[] = [];
        dataHunchArray.forEach((d) => {
            if (['annotation', 'categorical'].includes(d.type)) {
                tempOffVis.push(d);
            } else if (d.type === 'exclusion') {
                tempExDH.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        stateUpdateWrapperUseJSON(inVisDH, tempInVis, setInVisDH);
        stateUpdateWrapperUseJSON(offVisDH, tempOffVis, setOffVisDH);
        stateUpdateWrapperUseJSON(exDH, tempExDH, setExDH);
    }, [dataHunchArray]);

    const calculateX = (dataHunch: DataHunch, rangeCenter: boolean) => {
        if (dataHunch.type === 'range') {
            const parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (rangeCenter) {

                const center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return valueScale(center) - 2;
            }
            else {

                return valueScale(max(parsedRange) as any);
            }
        }
        return valueScale(parseFloat(dataHunch.content));
    };

    const calculateWidth = (dataHunch: DataHunch) => {
        if (dataHunch.type === 'range') {
            const parsedRange = JSON.parse('[' + dataHunch.content + ']');
            return Math.abs(valueScale(parsedRange[0]) - valueScale(parsedRange[1]));
        } else {
            return store.svgHeight - margin.bottom - valueScale(parseFloat(dataHunch.content));
        }
    };

    const findXPos = (dataHunch: DataHunch) => {
        const findDP = dataSet.filter(d => d.label === dataHunch.label);
        if (findDP.length > 0) {
            const dp = findDP[0];
            return valueScale(dp.value);
        }
        return 0;
    };

    return (
        <g >
            {inVisDH.map((d, i) => {
                if (parseFloat(d.content) > valueScale.domain()[1]) {
                    return <OverAxisIndicator dataHunch={d} key={`${d.id}-overaxis`} />;
                }
                if (inVisDH.length > 3) {
                    return (
                        <DHIndicatorRect
                            key={`${d.id}-dhindicatorRect`}
                            dataHunch={d}
                            xPos={calculateX(d, true)}
                            height={bandScale.bandwidth()}
                            yPos={bandScale(d.label) || 0}

                        />
                    );

                } else {
                    return (
                        <SketchyBar
                            dataHunch={d}
                            xPos={calculateX(d, false)}
                            key={`${d.id}-dhindicatorSketchy`}
                            yPos={(bandScale(d.label) || 0) + bandScale.bandwidth() / inVisDH.length * i}
                            width={calculateWidth(d)}
                            height={bandScale.bandwidth() / inVisDH.length} />
                    );
                }
            })}


            {offVisDH.map((d, i) => {

                return (
                    <Tooltip title={d.reasoning}>

                        <DHIndicatorText
                            x={findXPos(d)}
                            y={(bandScale(d.label) || 0) + 0.5 * bandScale.bandwidth() + (2 * IndicatorSize) * (i % 2 === 0 ? -1 : 1)}
                            fontSize='larger'
                            key={`${d.id}-text`}
                            isHighlighted={d.id === store.highlightedDH}
                            onMouseOver={() => { store.setHighlightedDH(d.id); }}
                            onMouseOut={() => { store.setHighlightedDH(-1); }}>
                            {`* ${d.content}`}
                        </DHIndicatorText>
                    </Tooltip>);
            }
            )}

            {exDH.map((d, i) => {
                return (<Tooltip title={d.reasoning}>
                    <DHIndicatorText
                        isHighlighted={d.id === store.highlightedDH}
                        fontSize='small'
                        key={`${d.id}-text`}>

                    </DHIndicatorText>
                </Tooltip>);
            })}
        </g>
    );
};

export default observer(DataHunchIndicator);