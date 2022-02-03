
import { BarChartWithDH } from './BarChartWithDH';
import { BarChartDataPoint } from './types';

let createdClassObject: BarChartWithDH;


export default {
    createBarChart(datasetName: string, dataInput: BarChartDataPoint[], width: number, height: number, userName: string) {
        createdClassObject = new BarChartWithDH(datasetName, dataInput, width, height, userName);
        return createdClassObject.createBarChart();
    },

    getRecordsOnBar() {
        return createdClassObject.savedDataHunches;
    },

    setNewUsername(userName: string) {
        createdClassObject.setUserName(userName);
    }
};