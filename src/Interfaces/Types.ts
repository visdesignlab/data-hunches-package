import { Selection } from "d3-selection";

export interface BarChartDataPoint {
    label: string;
    value: number;
    categorical?: string;
    dataHunchArray?: DataHunch[];
}

export interface DataHunch {
    type: InputMode;
    user: string;
    label: string;
    content: string;
    reasoning: string;
    id: number;
    confidenceLevel: number;
    upvotes: number;
    downvotes: number;
}

// export type AnnotationType =
//     "annotation"
//     | 'categorical'
//     | "data space"
//     | "manipulations"
//     | "range"
//     | 'model'
//     | 'sketch'
//     | 'inclusion'
//     | 'exclusion';

export type InputMode =
    'categorical' |
    'annotation' |
    'none' |
    'sketch' |
    'rating' |
    'data space' |
    'model' |
    'range' |
    'inclusion' |
    'exclusion' |
    'direction' |
    'manipulations';

export type SelectionType = Selection<any, undefined, HTMLElement, undefined>;

