/// <reference types="react" />
import { BarChartDataPoint } from "./Interfaces/Types";
declare type Props = {
    dataSet: BarChartDataPoint[];
    datasetName: string;
    svgWidth: number;
    svgHeight: number;
};
export declare const DataContext: import("react").Context<BarChartDataPoint[]>;
declare const _default: import("react").FunctionComponent<Props>;
export default _default;