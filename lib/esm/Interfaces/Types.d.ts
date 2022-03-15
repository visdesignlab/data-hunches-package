import { Selection } from "d3-selection";
export interface BarChartDataPoint {
    label: string;
    value: number;
    categorical?: string;
    dataHunchArray?: DataHunch[];
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
export declare type AnnotationType = "annotation" | 'categorical' | "data space" | "manipulations" | "range" | 'model' | 'sketch' | 'inclusion' | 'exclusion';
export declare type InputMode = 'categorical' | 'annotation' | 'none' | 'sketch' | 'rating' | 'data space' | 'model' | 'range' | 'manipulations';
export declare type SelectionType = Selection<any, undefined, HTMLElement, undefined>;
