import { Selection } from "d3-selection";

export interface BarChartDataPoint {
  label: string;
  value: number;
}

export interface Annotations {
  label: string;
  content: string;
}



export type SelectionType = Selection<any, undefined, null, undefined>;

