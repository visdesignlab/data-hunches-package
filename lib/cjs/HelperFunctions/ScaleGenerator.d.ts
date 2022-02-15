import { BarChartDataPoint } from "../Interfaces/Types";
import { ScaleOrdinal } from 'd3-scale';
export declare const makeVerticalScale: (newInputData: BarChartDataPoint[], height: number) => import("d3-scale").ScaleLinear<number, number, never>;
export declare const makeBandScale: (newInputData: BarChartDataPoint[], width: number) => import("d3-scale").ScaleBand<string>;
export declare const makeCategoricalScale: (newInputData: BarChartDataPoint[]) => ScaleOrdinal<string, unknown, never>;
export declare const getRectFill: (d: BarChartDataPoint, containCategory: boolean, selectedDP: string | undefined, categoricalScale: ScaleOrdinal<string, unknown, never>) => any;
