/// <reference types="react" />
import { Firestore } from 'firebase/firestore/lite';
import { DataHunch } from "./Types";
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
    firebaseSetup: Firestore;
    datasetName: string;
    constructor();
    setUserName(input: string): void;
    setDataSetName(input: string): void;
    setNextDHIndex(input: number): void;
    submitDH(dataHunchToSubmit: DataHunch): void;
    setWidthHeight(newWidth: number, newHeight: number): void;
    setContainCategory(input: boolean): void;
    setShowDH(input: boolean): void;
    setInputMode(input: "annotation" | 'none' | 'rating' | 'dataSpace' | 'manipulation'): void;
    selectADataPointMode(input: boolean): void;
    setCurrentSelectedDP(input: string | undefined): void;
}
declare const Store: import("react").Context<RootStore>;
export default Store;
