/// <reference types="react" />
import { BarChartDataPoint, DataHunch } from "../../Interfaces/Types";
declare type Props = {
    dataPoint: BarChartDataPoint;
    dataHunch: DataHunch;
    centerX: number;
    centerY: number;
    highlighted: boolean;
    selected: boolean;
    bandWidth: number;
};
declare const _default: import("react").FunctionComponent<Props>;
export default _default;
