/// <reference types="react" />
import { DataHunch, InputMode } from "./Types";
export declare class RootStore {
    showDataHunches: boolean;
    showCategory: boolean;
    svgHeight: number;
    svgWidth: number;
    selectingADataPoint: boolean;
    selectedDP: string | undefined;
    inputMode: InputMode;
    userName: string;
    nextIndex: number;
    dbTag: string;
    selectedDH: number[];
    highlightedDH: number;
    needToShowPreview: boolean;
    currentVol: number;
    numOfDH: number;
    constructor();
    setUserName(input: string): void;
    setSelectedDH(input: number[]): void;
    setHighlightedDH(input: number): void;
    setNeedToShowPreview(input: boolean): void;
    setDBTag(input: string): void;
    setNextIndex(input: number): void;
    setTotalDH(input: number): void;
    setCurrentVol(input: number): void;
    submitDH(dataHunchToSubmit: DataHunch): Promise<void>;
    setWidth(newWidth: number): void;
    setHeight(newHeight: number): void;
    setShowCategory(input: boolean): void;
    setShowDH(input: boolean): void;
    setInputMode(input: InputMode): void;
    selectADataPointMode(input: boolean): void;
    setCurrentSelectedDP(input: string | undefined): void;
}
declare const Store: import("react").Context<RootStore>;
export default Store;
