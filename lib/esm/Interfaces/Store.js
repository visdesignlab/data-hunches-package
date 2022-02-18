import { select } from "d3-selection";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { FirebaseSetup } from "./Constants";
var RootStore = /** @class */ (function () {
    function RootStore() {
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
    RootStore.prototype.setUserName = function (input) {
        this.userName = input;
    };
    RootStore.prototype.setSelectedDH = function (input) {
        this.selectedDH = input;
    };
    RootStore.prototype.setHighlightedDH = function (input) {
        this.highlightedDH = input;
    };
    RootStore.prototype.setNeedToShowPreview = function (input) {
        this.needToShowPreview = input;
    };
    RootStore.prototype.setDataSetName = function (input) {
        this.datasetName = input;
    };
    RootStore.prototype.setNextDHIndex = function (input) {
        this.nextDHIndex = input;
    };
    RootStore.prototype.submitDH = function (dataHunchToSubmit) {
        var _this = this;
        this.inputMode = 'none';
        var databaseRef = collection(this.firebaseSetup, this.datasetName);
        setDoc(doc(databaseRef, this.nextDHIndex.toString()), dataHunchToSubmit).then(function () {
            _this.setNextDHIndex(_this.nextDHIndex + 1);
        });
    };
    RootStore.prototype.setWidth = function (newWidth) {
        this.svgWidth = newWidth;
    };
    RootStore.prototype.setHeight = function (newHeight) {
        this.svgHeight = newHeight;
    };
    RootStore.prototype.setContainCategory = function (input) {
        this.containCategory = input;
    };
    RootStore.prototype.setShowDH = function (input) {
        this.showDataHunches = input;
    };
    RootStore.prototype.setInputMode = function (input) {
        this.inputMode = input;
    };
    RootStore.prototype.selectADataPointMode = function (input) {
        this.selectingADataPoint = input;
        // if it is false, hiding elemtns
        if (!input) {
            select('#specific-control')
                .attr('display', 'none');
        }
    };
    RootStore.prototype.setCurrentSelectedDP = function (input) {
        this.selectedDP = input;
    };
    return RootStore;
}());
export { RootStore };
var Store = createContext(new RootStore());
export default Store;
