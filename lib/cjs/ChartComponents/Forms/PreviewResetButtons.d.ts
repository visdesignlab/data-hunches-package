/// <reference types="react" />
import 'd3-transition';
import { BarChartDataPoint } from "../../Interfaces/Types";
declare type Props = {
    labelToPreview: string;
    valueToPreview: number | undefined;
    disableButtons: boolean;
};
declare const _default: import("react").FunctionComponent<Props>;
export default _default;
export declare const handlePreviewOnClick: (ogDataSet: BarChartDataPoint[], labelToPreview: string, valueToPreview: number | undefined, svgHeight: number, svgWidth: number, containCategory: boolean, selectedDP: string | undefined) => void;
export declare const handleResetOnClick: (ogDataSet: BarChartDataPoint[], svgHeight: number, svgWidth: number, containCategory: boolean, selectedDP: string | undefined) => void;
