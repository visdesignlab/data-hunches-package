import { schemeTableau10 } from 'd3-scale-chromatic';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { BarChartDataPoint } from './Types';

export const margin = ({ top: 30, right: 100, bottom: 50, left: 70 });

export const LargeNumber = 999;

export const IndicatorSize = 6;
export const IndicatorSpace = 10;

export const DarkGray = '#5d5d5d';

export const LightGray = '#eeeeee';

export const SelectionColor = '#e29609';

export const HighlightColor = '#ffcf76';

export const DataHunchColor = '#337ab7';

export const DefaultBar = '#ec7936';

export const DefaultForeignObjectWidth = 200;

export const DefaultForeignObjectHeight = 255;

export const ControlFOWidth = 152;

export const ControlFOHeight = 285;

export const WithoutCatControlFOHeight = 208;

export const TransitionDuration = 500;

const FirebaseSetupConstants = {
    apiKey: "AIzaSyAM2CAoS7L7Ix0UTgET6dB-iI-q3wb2VDQ",
    authDomain: "data-hunch.firebaseapp.com",
    projectId: "data-hunch",
    storageBucket: "data-hunch.appspot.com",
    messagingSenderId: "746016997124",
    appId: "1:746016997124:web:ee92f17b272373d28ada51"
};

export const ConfidenceInput = ['Not at all confident', 'Not very confident', 'Somewhat confident', 'Very confident', 'Extremely confident'];

export const CategoricalColor = [DefaultBar, '#b08aa6', '#75c4c2', '#24b466'];

export const firebaseSetup = getFirestore(initializeApp(FirebaseSetupConstants));

// Need color and stroke
export const DefaultSketchyOptions = {
    fillStyle: 'zigzag',
    roughness: 1.5,
    hachureAngle: 50,
    hachureGap: 8,
    fillWeight: 1,
    strokeWidth: 2,
    fill: DataHunchColor,
    stroke: DataHunchColor,
};

type dataAttribute = {
    data: BarChartDataPoint[];
    name: string,
    dbTag: string,
    explanation: string;
};


const COVIDData = [
    { categorical: 'Europe', label: "Austria", value: 2978.887 },
    { categorical: 'Oceania', label: "Australia", value: 872.619 },
    { categorical: 'North America', label: 'Canada', value: 159.527 },
    { categorical: 'Europe', label: 'France', value: 807.867 },
    { categorical: 'Europe', label: 'Germany', value: 1614.237 },
    { categorical: 'Oceania', label: 'New Zealand', value: 2886.32 },
    { categorical: 'Europe', label: 'Norway', value: 2301.186 },
    { categorical: 'Europe', label: 'Sweden', value: 236.456 },
    { categorical: 'Europe', label: 'United Kingdom', value: 611.56 },
    { categorical: 'North America', label: 'United States', value: 186.2 },
];

const TestData = [
    { label: "a", value: 9, categorical: 'A' },
    { label: "b", value: 2, categorical: 'B' },
    { label: "c", value: 2, categorical: 'A' },
    { label: "d", value: 3, categorical: 'A' },
    { label: "e", value: 5, categorical: 'A' },
    { label: "f", value: 7, categorical: 'A' },
    { label: "g", value: 9, categorical: 'C' },
    { label: "h", value: 5, categorical: 'B' }];

export const DataPreset: { [key: string]: dataAttribute; } = {
    COVIDData: {
        dbTag: 'COVIDData',
        data: COVIDData,
        name: 'COVID Cases',
        explanation: "New confirmed cases of COVID-19 (7-day smoothed) per 1,000,000 people. Data shows Mar 01, 2022."
    },
    test2: {
        dbTag: 'test2',
        data: TestData,
        name: 'DH Test Data',
        explanation: 'This is a test data for data hunch development purposes. Values have no real significance'
    }
};