"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootStore = void 0;
var d3_selection_1 = require("d3-selection");
var mobx_1 = require("mobx");
var react_1 = require("react");
var RootStore = /** @class */ (function () {
    function RootStore() {
        this.showDataHunches = true;
        this.containCategory = false;
        this.svgHeight = 500;
        this.svgWidth = 500;
        this.selectingADataPoint = false;
        this.selectedDP = undefined;
        this.inputMode = 'none';
        this.userName = 'none';
        this.nextDHIndex = 0;
        (0, mobx_1.makeAutoObservable)(this);
    }
    RootStore.prototype.setUserName = function (input) {
        this.userName = input;
    };
    RootStore.prototype.setNextDHIndex = function (input) {
        this.nextDHIndex = input;
    };
    RootStore.prototype.submitDH = function () {
        this.inputMode = 'none';
        this.nextDHIndex += 1;
    };
    RootStore.prototype.setWidthHeight = function (newWidth, newHeight) {
        this.svgWidth = newWidth;
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
