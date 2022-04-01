import { BarChartDataPoint } from "./Types";
declare type dataAttribute = {
    data: BarChartDataPoint[];
    categories: string[];
    name: string;
    dbTag: string;
    explanation: string;
    lock: number[];
};
export declare const DataPreset: {
    [key: string]: dataAttribute;
};
export {};
