
import { BarChartWithDH } from './BarChart';
import { BarChartDataPoint } from './types';

let createdClassObject: BarChartWithDH;
export function createBarChart(dataInput: BarChartDataPoint[], width: number, height: number) {
    createdClassObject = new BarChartWithDH(dataInput, width, height);
    return createdClassObject.createBarChart();
}

export function getRecordsOnBar() {
    return createdClassObject.savedDataHunches;
}


// It can save to array
const arrayToIncre: number[] = [];
export function increment(input: number) {
    arrayToIncre.push(input);
}

export function getArray() {
    return arrayToIncre;
}