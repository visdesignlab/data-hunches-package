import { select } from "d3-selection";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class RootStore {
    showDataHunches: boolean;
    containCategory: boolean;
    svgHeight: number;
    svgWidth: number;
    selectingADataPoint: boolean;
    selectedDP: string | undefined;


    constructor() {
        this.showDataHunches = true;
        this.containCategory = false;
        this.svgHeight = 500;
        this.svgWidth = 500;
        this.selectingADataPoint = false;
        this.selectedDP = undefined;
        makeAutoObservable(this);
    }

    setWidthHeight(newWidth: number, newHeight: number) {
        this.svgWidth = newWidth;
        this.svgHeight = newHeight;
    }
    setContainCategory(input: boolean) {
        this.containCategory = input;
    }

    setShowDH(input: boolean) {
        this.showDataHunches = input;
    }

    selectADataPointMode(input: boolean) {
        this.selectingADataPoint = input;
        // if it is false, hiding elemtns
        if (!input) {
            select('#specific-control')
                .attr('display', 'none');
        }
    }

    setCurrentSelectedDP(input: string) {
        this.selectedDP = input;
    }
}
const Store = createContext(new RootStore());
export default Store;