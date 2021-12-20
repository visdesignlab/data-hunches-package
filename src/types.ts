import { Selection } from "d3-selection";

export interface BarChartDataPoint {
    label: string;
    value: number;
}

export interface Annotations {
    type: "annotation" | "data space" | "manipulations";
    label: string;
    content: string;
    reasoning: string;
    id: number;
}



export type SelectionType = Selection<any, undefined, null, undefined>;

