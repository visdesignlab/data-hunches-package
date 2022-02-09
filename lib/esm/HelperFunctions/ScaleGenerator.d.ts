import { BarChartDataPoint } from "../Interfaces/Types";
export declare const makeVerticalScale: (newInputData: BarChartDataPoint[], height: number) => import("d3-scale").ScaleLinear<number, number, never>;
export declare const makeBandScale: (newInputData: BarChartDataPoint[], width: number) => import("d3-scale").ScaleBand<string>;
export declare const makeCategoricalScale: (newInputData: BarChartDataPoint[]) => import("d3-scale").ScaleOrdinal<string, unknown, never>;
