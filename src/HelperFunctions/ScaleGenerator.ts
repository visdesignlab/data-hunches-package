import { BrightOrange, CategoricalColor, DarkBlue, LargeNumber, margin } from "../Interfaces/Constants";
import { BarChartDataPoint } from "../Interfaces/Types";
import { scaleLinear, scaleBand, scaleOrdinal, ScaleOrdinal } from 'd3-scale';
import { max } from "d3-array";

export const makeVerticalScale = (newInputData: BarChartDataPoint[], height: number) => {
    return scaleLinear()
        .domain([max(newInputData.map(d => d.value)) || LargeNumber, 0])
        .range([margin.top, height - margin.bottom])
        .clamp(true);
};

export const makeBandScale = (newInputData: BarChartDataPoint[], width: number,) => {
    return scaleBand().domain(newInputData.map(d => d.label)).range([margin.left, width]).paddingInner(0.1).paddingOuter(0.1);
};

export const makeCategoricalScale = (newInputData: BarChartDataPoint[]) => {
    return scaleOrdinal()
        .domain(newInputData.map(d => d.categorical || 'a'))
        .range(CategoricalColor);
};

export const getRectFill = (d: BarChartDataPoint, containCategory: boolean, selectedDP: string | undefined, categoricalScale: ScaleOrdinal<string, unknown, never>) => {
    if (d.label === selectedDP) {
        return BrightOrange;
    }
    return containCategory ? ((categoricalScale(d.categorical!) as any) || DarkBlue) : DarkBlue;
};