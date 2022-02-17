"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootStore = void 0;
var d3_selection_1 = require("d3-selection");
var mobx_1 = require("mobx");
var react_1 = require("react");
var lite_1 = require("firebase/firestore/lite");
var app_1 = require("firebase/app");
var Constants_1 = require("./Constants");
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
        this.selectedDH = -1;
        this.highlightedDH = -1;
        this.datasetName = '';
        this.nextDHIndex = 0;
        this.firebaseSetup = (0, lite_1.getFirestore)((0, app_1.initializeApp)(Constants_1.FirebaseSetup));
        (0, mobx_1.makeAutoObservable)(this);
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
        var databaseRef = (0, lite_1.collection)(this.firebaseSetup, this.datasetName);
        (0, lite_1.setDoc)((0, lite_1.doc)(databaseRef, this.nextDHIndex.toString()), dataHunchToSubmit).then(function () {
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
            (0, d3_selection_1.select)('#specific-control')
                .attr('display', 'none');
        }
    };
    RootStore.prototype.setCurrentSelectedDP = function (input) {
        this.selectedDP = input;
    };
    return RootStore;
}());
exports.RootStore = RootStore;
var Store = (0, react_1.createContext)(new RootStore());
exports.default = Store;
