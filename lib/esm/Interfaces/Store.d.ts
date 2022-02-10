/// <reference types="react" />
export declare class RootStore {
    showDataHunches: boolean;
    containCategory: boolean;
    svgHeight: number;
    svgWidth: number;
    selectingADataPoint: boolean;
    selectedDP: string | undefined;
    inputMode: string;
    userName: string;
    nextDHIndex: number;
    constructor();
    setUserName(input: string): void;
    setNextDHIndex(input: number): void;
    submitDH(): void;
    setWidthHeight(newWidth: number, newHeight: number): void;
    setContainCategory(input: boolean): void;
    setShowDH(input: boolean): void;
    setInputMode(input: "annotation" | 'none' | 'rating' | 'dataSpace' | 'manipulation'): void;
    selectADataPointMode(input: boolean): void;
    setCurrentSelectedDP(input: string | undefined): void;
}
declare const Store: import("react").Context<RootStore>;
export default Store;
