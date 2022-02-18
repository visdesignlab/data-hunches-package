import { select } from "d3-selection";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { getFirestore, collection, Firestore, setDoc, doc } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { FirebaseSetup } from "./Constants";
import { DataHunch, InputMode } from "./Types";

export class RootStore {
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
        this.nextDHIndex = 0;
        this.firebaseSetup = getFirestore(initializeApp(FirebaseSetup));
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

    setNextDHIndex(input: number) {
        this.nextDHIndex = input;
    }

    submitDH(dataHunchToSubmit: DataHunch) {
        this.inputMode = 'none';
        const databaseRef = collection(this.firebaseSetup, this.datasetName);

        setDoc(doc(databaseRef, this.nextDHIndex.toString()), dataHunchToSubmit).then(() => {
            this.setNextDHIndex(this.nextDHIndex + 1);
        });

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