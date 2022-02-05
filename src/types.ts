import { Selection } from "d3-selection";

export interface BarChartDataPoint {
    label: string;
    value: number;
}

export interface Annotations {
    type: AnnotationType;
    user: string;
    label: string;
    content: string;
    reasoning: string;
    id: number;
    confidenceLevel: number;
}

export type AnnotationType =
    "annotation"
    | "data space"
    | "manipulations"
    | "range"
    | 'inclusion'
    | 'exclusion';


export type SelectionType = Selection<any, undefined, HTMLElement, undefined>;

