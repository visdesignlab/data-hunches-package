/// <reference types="react" />
import { Firestore } from 'firebase/firestore/lite';
import { DataHunch, InputMode } from "./Types";
export declare class RootStore {
    showDataHunches: boolean;
    containCategory: string[];
    svgHeight: number;
    svgWidth: number;
    selectingADataPoint: boolean;
    selectedDP: string | undefined;
    inputMode: InputMode;
    userName: string;
    nextDHIndex: number;
    firebaseSetup: Firestore;
    datasetName: string;
    selectedDH: number[];
    highlightedDH: number;
    needToShowPreview: boolean;
    constructor();
    setUserName(input: string): void;
    setSelectedDH(input: number[]): void;
    setHighlightedDH(input: number): void;
    setNeedToShowPreview(input: boolean): void;
    setDataSetName(input: string): void;
    setNextDHIndex(input: number): void;
    submitDH(dataHunchToSubmit: DataHunch): void;
    setWidth(newWidth: number): void;
    setHeight(newHeight: number): void;
    setContainCategory(input: string[]): void;
    setShowDH(input: boolean): void;
    setInputMode(input: InputMode): void;
    selectADataPointMode(input: boolean): void;
    setCurrentSelectedDP(input: string | undefined): void;
}
declare const Store: import("react").Context<RootStore>;
export default Store;
