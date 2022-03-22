import { BarChartDataPoint } from './Types';
export declare const margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export declare const LargeNumber = 999;
export declare const IndicatorSize = 6;
export declare const IndicatorSpace = 10;
export declare const DarkGray = "#5d5d5d";
export declare const LightGray = "#eeeeee";
export declare const SelectionColor = "#e29609";
export declare const HighlightColor = "#ffcf76";
export declare const DataHunchColor = "#337ab7";
export declare const DefaultBar = "#b08aa6";
export declare const DefaultForeignObjectWidth = 200;
export declare const DefaultForeignObjectHeight = 285;
export declare const ControlFOWidth = 120;
export declare const ControlFOHeight = 260;
export declare const WithoutCatControlFOHeight = 208;
export declare const TransitionDuration = 500;
export declare const ConfidenceInput: string[];
export declare const CategoricalColor: string[];
export declare const firebaseSetup: import("firebase/firestore/lite").Firestore;
export declare const DefaultSketchyOptions: {
    fillStyle: string;
    roughness: number;
    hachureAngle: number;
    hachureGap: number;
    fillWeight: number;
    strokeWidth: number;
    fill: string;
    stroke: string;
};
declare type dataAttribute = {
    data: BarChartDataPoint[];
    categories: string[];
    name: string;
    dbTag: string;
    explanation: string;
};
export declare const DataPreset: {
    [key: string]: dataAttribute;
};
export {};
