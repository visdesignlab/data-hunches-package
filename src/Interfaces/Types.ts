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

export type AnnotationType =
    "annotation"
    | 'categorical'
    | "data space"
    | "manipulations"
    | "range"
    | 'inclusion'
    | 'exclusion';

export type InputMode = 'categorical' | 'annotation' | 'none' | 'rating' | 'dataSpace' | 'manipulation';

export type SelectionType = Selection<any, undefined, HTMLElement, undefined>;

