import { select } from "d3-selection";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { collection, setDoc, doc, updateDoc } from 'firebase/firestore/lite';

import { DataHunch, InputMode } from "./Types";
import { firebaseSetup } from "./Constants";

export class RootStore {
    showDataHunches: boolean;
    containCategory: string[];
    svgHeight: number;
    svgWidth: number;
    selectingADataPoint: boolean;
    selectedDP: string | undefined;
    inputMode: InputMode;
    userName: string;
    nextIndex: number;
    datasetName: string;
    selectedDH: number[];
    highlightedDH: number;
    needToShowPreview: boolean;
    currentVol: number;
    numOfDH: number;

    constructor() {
        this.showDataHunches = true;
        this.containCategory = [];
        this.svgHeight = 500;
        this.svgWidth = 500;
        this.selectingADataPoint = false;
        this.needToShowPreview = false;
        this.selectedDP = undefined;
        this.inputMode = 'none';
        this.userName = '';
        this.selectedDH = [];
        this.highlightedDH = -1;
        this.datasetName = '';
        this.nextIndex = 0;
        this.numOfDH = 0;
        this.currentVol = 1;
        makeAutoObservable(this);
    }

    setUserName(input: string) {
        this.userName = input;
    }

    setSelectedDH(input: number[]) {
        this.selectedDH = input;
    }

    setHighlightedDH(input: number) {
        this.highlightedDH = input;
    }

    setNeedToShowPreview(input: boolean) {
        this.needToShowPreview = input;
    }

    setDataSetName(input: string) {
        this.datasetName = input;
    }

    setNextIndex(input: number) {
        this.nextIndex = input;
    }

    setTotalDH(input: number) {
        this.numOfDH = input;
    }

    setCurrentVol(input: number) {
        this.currentVol = input;
    }

    async submitDH(dataHunchToSubmit: DataHunch) {
        this.inputMode = 'none';
        const databaseRef = collection(firebaseSetup, this.datasetName, `sub${this.currentVol}`, 'dhs');

        await updateDoc(doc(collection(firebaseSetup, this.datasetName), `sub${this.currentVol}`), { nextIndex: this.nextIndex + 1 });

        await setDoc(doc(databaseRef, this.nextIndex.toString()), dataHunchToSubmit);

        this.setNextIndex(this.nextIndex + 1);
        this.setTotalDH(this.numOfDH + 1);
    }

    setWidth(newWidth: number) {
        this.svgWidth = newWidth;
    }

    setHeight(newHeight: number) {
        this.svgHeight = newHeight;
    }

    setContainCategory(input: string[]) {
        this.containCategory = input;
    }

    setShowDH(input: boolean) {
        this.showDataHunches = input;
    }

    setInputMode(input: InputMode) {
        this.inputMode = input;
    }

    selectADataPointMode(input: boolean) {
        this.selectingADataPoint = input;
        // if it is false, hiding elemtns
        if (!input) {
            select('#specific-control')
                .attr('display', 'none');
        }
    }

    setCurrentSelectedDP(input: string | undefined) {
        this.selectedDP = input;
    }
}
const Store = createContext(new RootStore());
export default Store;