import { Delaunay } from "d3-delaunay";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../..";
import { makeValueScale, makeBandScale, makeCategoricalScale, getRectFill } from "../../HelperFunctions/ScaleGenerator";
import { DarkGray, LightGray, margin } from "../../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../../Interfaces/StateChecker";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";

type Props = {
    dataHunchArrayString: string;
};

const CategoricalIndicator: FC<Props> = ({ dataHunchArrayString }: Props) => {

    const dataSet = useContext(DataContext);
    const store = useContext(Store);


    const valueScale = makeValueScale(dataSet, store.svgWidth);
    const bandScale = makeBandScale(dataSet, store.svgHeight);
    const categoricalColorScale = makeCategoricalScale(dataSet);

    const [polygonPoints, setPolygonPoints] = useState<Delaunay.Triangle[]>([]);

    const [dataHunchArray, setDataHunchArray] = useState<DataHunch[]>([]);

    useEffect(() => {
        const tempDataHunchArray = JSON.parse(dataHunchArrayString);
        stateUpdateWrapperUseJSON(dataHunchArray, tempDataHunchArray, setDataHunchArray);
    }, [dataHunchArrayString]);

    //seperate this part out so random points stay the same
    useEffect(() => {
        if (dataHunchArray.length > 0 && polygonPoints.length === 0) {
            const barChartPoint = dataSet.filter(dp => dp.label === dataHunchArray[0].label)[0];
            const height = bandScale.bandwidth();
            const width = valueScale(barChartPoint.value) - margin.left;

            const borderWidth = 4;

            //generate random points:
            const randomPoints = [
                [margin.left + borderWidth, (bandScale(barChartPoint.label) || 0) + borderWidth],
                [margin.left + width - borderWidth, (bandScale(barChartPoint.label) || 0) + borderWidth]
            ];

            const xDirBoxes = Math.floor(width / 5);
            const yDirBoxes = Math.floor(height / 3);

            for (let xDir = 1; xDir <= 4; xDir++) {
                for (let yDir = 1; yDir <= 2; yDir++) {

                    const randomX = getRandomArbitrary(
                        margin.left + xDirBoxes * xDir - borderWidth, margin.left + xDirBoxes * xDir + borderWidth
                    );

                    const randomY = getRandomArbitrary(
                        (bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir - borderWidth, (bandScale(barChartPoint.label) || 0) + yDirBoxes * yDir + borderWidth
                    );

                    randomPoints.push([randomX, randomY]);
                }
            }

            randomPoints.push(
                [margin.left + borderWidth, (bandScale(barChartPoint.label) || 0) + height - borderWidth],
                [margin.left + width - borderWidth, (bandScale(barChartPoint.label) || 0) + height - borderWidth]
            );

            const delaunay = Delaunay.from(randomPoints);

            const iterator = delaunay.trianglePolygons();

            setPolygonPoints(Array.from(iterator));
        }
    }, [dataHunchArrayString]);

    // Random
    // const chooseFill = () => {
    //     const randomNumber = Math.round(Math.random() * 100);
    //     if (randomNumber >= 60) {
    //         return ['none', 0];
    //     }
    //     else {
    //         const representing = randomNumber % dataHunchArray.length;
    //         return [categoricalColorScale(dataHunchArray[representing].content) as string, 0.5 + 0.1 * dataHunchArray[representing].confidenceLevel];
    //     }
    // };

    const chooseFill = (index: number) => {
        if (index < dataHunchArray.length) {

            return [categoricalColorScale(dataHunchArray[index].content) as string, 0.5 + 0.1 * dataHunchArray[index].confidenceLevel];
        }
        return ['none', 1];
    };

    const makePointArray = (input: Delaunay.Triangle) => {
        let output = '';
        input.forEach((d) => {
            output += d.toString();
            output += ' ';
        });
        return output;
    };

    return (dataHunchArray.length > 0 ?
        <g>
            {polygonPoints.map((d: Delaunay.Triangle, i) => {
                return <polygon
                    key={`polygon-${i}`}
                    points={makePointArray(d)}
                    fill={chooseFill(i)[0].toString()}
                    strokeOpacity={0.2}
                    opacity={chooseFill(i)[1]}
                    strokeWidth={2}
                    stroke={'white'} />;
            })}
        </g> : <></>);
};
export default observer(CategoricalIndicator);

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}