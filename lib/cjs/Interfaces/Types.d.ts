import { Selection } from "d3-selection";
export interface BarChartDataPoint {
    label: string;
    value: number;
    categorical?: string;
}
export interface DataHunch {
    type: AnnotationType;
    user: string;
    label: string;
    content: string;
    reasoning: string;
    id: number;
    confidenceLevel: number;
}
export declare type AnnotationType = "annotation" | "data space" | "manipulations" | "range" | 'inclusion' | 'exclusion';
export declare type SelectionType = Selection<any, undefined, HTMLElement, undefined>;
