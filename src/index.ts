
import { BarChartWithDH } from './BarChart';
import { BarChartDataPoint } from './types';

export function createBarChart(dataInput: BarChartDataPoint[], width: number, height: number) {
    const BarChart = new BarChartWithDH(dataInput, width, height);
    return BarChart.createBarChart();
}




// It can save to array
const arrayToIncre: number[] = [];
export function increment(input: number) {
    arrayToIncre.push(input);
}

export function getArray() {
    return arrayToIncre;
}