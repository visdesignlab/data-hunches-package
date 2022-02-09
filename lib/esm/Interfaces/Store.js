import { select } from "d3-selection";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
var RootStore = /** @class */ (function () {
    function RootStore() {
        this.showDataHunches = true;
        this.containCategory = false;
        this.svgHeight = 500;
        this.svgWidth = 500;
        this.selectingADataPoint = false;
        this.selectedDP = undefined;
        makeAutoObservable(this);
    }
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
