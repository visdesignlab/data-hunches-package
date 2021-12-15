
import { MakeBarChart } from './BarChart';
import { BarChartDataPoint } from './types';

export function createBarChart(dataInput: BarChartDataPoint[]) {
  return MakeBarChart(dataInput,);
}

const arrayToIncre: number[] = [];
export function increment(input: number) {
  arrayToIncre.push(input);
}

export function getArray() {
  return arrayToIncre;
}