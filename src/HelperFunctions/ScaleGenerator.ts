import { SelectionColor, CategoricalColor, DarkBlue, LargeNumber, margin } from "../Interfaces/Constants";
import { BarChartDataPoint } from "../Interfaces/Types";
import { scaleLinear, scaleBand, scaleOrdinal, ScaleOrdinal } from 'd3-scale';
import { max } from "d3-array";
import { select } from "d3-selection";

export const makeValueScale = (newInputData: BarChartDataPoint[], width: number) => {
    return scaleLinear()
        .domain([0, max(newInputData.map(d => d.value)) || LargeNumber])
        .range([margin.left, width - margin.right - margin.left])
        .clamp(true);
};

export const makeBandScale = (newInputData: BarChartDataPoint[], height: number) => {
    return scaleBand().domain(newInputData.map(d => d.label)).range([margin.top, height - margin.bottom]).paddingInner(0.1).paddingOuter(0.1);
};

export const makeCategoricalScale = (newInputData: BarChartDataPoint[]) => {
    return scaleOrdinal()
        .domain(newInputData.map(d => d.categorical || 'a'))
        .range(CategoricalColor);
};

export const getRectFill = (d: BarChartDataPoint, doesContainCategory: boolean, selectedDP: string | undefined, categoricalScale: ScaleOrdinal<string, unknown, never>) => {
    return doesContainCategory ? ((categoricalScale(d.categorical!) as any) || DarkBlue) : DarkBlue;
};
