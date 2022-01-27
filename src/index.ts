
import { BarChartWithDH } from './BarChart';
import { BarChartDataPoint } from './types';

let createdClassObject: BarChartWithDH;
// export function createBarChart(dataInput: BarChartDataPoint[], width: number, height: number, userName: string, previousSavedDatahunches?: string) {
//     createdClassObject = new BarChartWithDH(dataInput, width, height, userName, previousSavedDatahunches);
//     return createdClassObject.createBarChart();
// }

// export function getRecordsOnBar() {
//     return createdClassObject.savedDataHunches;
// }

export default {
    createBarChart(datasetName: string, dataInput: BarChartDataPoint[], width: number, height: number, userName: string, previousSavedDatahunches?: string) {
        createdClassObject = new BarChartWithDH(datasetName, dataInput, width, height, userName);
        return createdClassObject.createBarChart();
    },

    getRecordsOnBar() {
        return createdClassObject.savedDataHunches;
    }
};