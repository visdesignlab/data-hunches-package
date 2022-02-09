/// <reference types="react" />
export declare class RootStore {
    showDataHunches: boolean;
    containCategory: boolean;
    svgHeight: number;
    svgWidth: number;
    selectingADataPoint: boolean;
    selectedDP: string | undefined;
    constructor();
    setWidthHeight(newWidth: number, newHeight: number): void;
    setContainCategory(input: boolean): void;
    setShowDH(input: boolean): void;
    selectADataPointMode(input: boolean): void;
    setCurrentSelectedDP(input: string): void;
}
declare const Store: import("react").Context<RootStore>;
export default Store;
