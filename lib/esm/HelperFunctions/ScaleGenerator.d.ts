import { BarChartDataPoint } from "../Interfaces/Types";
import { ScaleOrdinal } from 'd3-scale';
export declare const makeValueScale: (newInputData: BarChartDataPoint[], width: number) => import("d3-scale").ScaleLinear<number, number, never>;
export declare const makeBandScale: (newInputData: BarChartDataPoint[], height: number) => import("d3-scale").ScaleBand<string>;
export declare const makeCategoricalScale: (categories: string[]) => ScaleOrdinal<string, unknown, never>;
export declare const getRectFill: (d: BarChartDataPoint, doesContainCategory: boolean, selectedDP: string | undefined, categoricalScale: ScaleOrdinal<string, unknown, never>) => any;
