import { select } from "d3-selection";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { collection, setDoc, doc, updateDoc } from 'firebase/firestore/lite';

import { DataHunch, InputMode } from "./Types";
import { firebaseSetup } from "./Constants";
import { DataPreset } from "./Datasets";

export class RootStore {
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
    votingDH: DataHunch | undefined;

    constructor() {
        const URLInput = new URL(window.location.href);
        const dataSetTag = URLInput.searchParams.get("data") || '';
        const volTag = parseInt(URLInput.searchParams.get("vol") || '') || 1;

        this.showDataHunches = true;
        this.showCategory = false;
        this.svgHeight = 500;
        this.svgWidth = 500;
        this.selectingADataPoint = false;
        this.needToShowPreview = false;
        this.selectedDP = undefined;
        this.inputMode = 'none';
        this.userName = '';
        this.selectedDH = [];
        this.highlightedDH = -1;
        this.dbTag = DataPreset[dataSetTag] ? dataSetTag : 'COVIDData';
        this.nextIndex = 0;
        this.numOfDH = 0;
        this.currentVol = volTag;
        this.votingDH = undefined;
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

    setDBTag(input: string) {
        this.dbTag = input;
        this.currentVol = 1;
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

    setVotingDH(input: DataHunch | undefined) {
        this.votingDH = input;
        if (this.selectedDP) {
            this.selectedDP = undefined;
        }
    }

    async submitDH(dataHunchToSubmit: DataHunch) {
        this.inputMode = 'none';
        const databaseRef = collection(firebaseSetup, this.dbTag, `sub${this.currentVol}`, 'dhs');

        await updateDoc(doc(collection(firebaseSetup, this.dbTag), `sub${this.currentVol}`), { nextIndex: this.nextIndex + 1 });

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

    setShowCategory(input: boolean) {
        this.showCategory = input;
    }

    setShowDH(input: boolean) {
        this.showDataHunches = input;
    }

    setInputMode(input: InputMode) {
        this.inputMode = input;
        if (this.votingDH) {
            this.votingDH = undefined;
        }
    }

    selectADataPointMode(input: boolean) {
        this.selectingADataPoint = input;
        // if it is false, hiding elemtns
        if (!input) {
            select('#specific-control')
                .style('display', 'none');
        }
    }

    setCurrentSelectedDP(input: string | undefined) {
        this.selectedDP = input;
        if (this.votingDH) {
            this.votingDH = undefined;
        }
    }
}
const Store = createContext(new RootStore());
export default Store;