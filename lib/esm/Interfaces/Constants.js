import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
export var margin = ({ top: 30, right: 150, bottom: 50, left: 90 });
export var LargeNumber = 999;
export var IndicatorSize = 6;
export var IndicatorSpace = 10;
export var DarkGray = '#5d5d5d';
export var LightGray = '#eeeeee';
export var SelectionColor = '#e29609';
export var HighlightColor = '#ffcf76';
export var DataHunchColor = '#337ab7';
export var DefaultBar = '#b08aa6';
export var DefaultForeignObjectWidth = 200;
export var DefaultForeignObjectHeight = 285;
export var ControlFOWidth = 190;
export var ControlFOHeight = 300;
export var UpDownVoteFOWidth = 150;
export var UpDownVoteFOHeight = 50;
export var WithoutCatControlFOHeight = 208;
export var TransitionDuration = 500;
var FirebaseSetupConstants = {
    apiKey: "AIzaSyAM2CAoS7L7Ix0UTgET6dB-iI-q3wb2VDQ",
    authDomain: "data-hunch.firebaseapp.com",
    projectId: "data-hunch",
    storageBucket: "data-hunch.appspot.com",
    messagingSenderId: "746016997124",
    appId: "1:746016997124:web:ee92f17b272373d28ada51"
};
export var ConfidenceInput = ['Not at all confident', 'Not very confident', 'Somewhat confident', 'Very confident', 'Extremely confident'];
export var CategoricalColor = [DefaultBar, '#75c4c2', '#f3a87c', '#24b466'];
export var firebaseSetup = getFirestore(initializeApp(FirebaseSetupConstants));
// Need color and stroke
export var DefaultSketchyOptions = {
    fillStyle: 'zigzag',
    roughness: 1.5,
    hachureAngle: 50,
    hachureGap: 8,
    fillWeight: 1,
    strokeWidth: 2,
    fill: DataHunchColor,
    stroke: DataHunchColor,
};
var COVIDData = [
    { categorical: '30-60', label: "Austria", value: 2978.887 },
    { categorical: '30-60', label: "Australia", value: 872.619 },
    { categorical: 'Above 60', label: 'Canada', value: 159.527 },
    { categorical: 'Above 60', label: 'France', value: 807.867 },
    { categorical: 'Above 60', label: 'Germany', value: 1614.237 },
    { categorical: '30-60', label: 'New Zealand', value: 2886.32 },
    { categorical: 'Below 30', label: 'Norway', value: 2301.186 },
    { categorical: 'Below 30', label: 'Sweden', value: 236.456 },
    { categorical: 'Below 30', label: 'United Kingdom', value: 611.56 },
    { categorical: '30-60', label: 'United States', value: 186.2 },
];
var TestData = [
    { label: "a", value: 9, categorical: 'A' },
    { label: "b", value: 2, categorical: 'B' },
    { label: "c", value: 2, categorical: 'A' },
    { label: "d", value: 3, categorical: 'D' },
    { label: "e", value: 5, categorical: 'A' },
    { label: "f", value: 7, categorical: 'D' },
    { label: "g", value: 9, categorical: 'C' },
    { label: "h", value: 5, categorical: 'B' }
];
export var DataPreset = {
    COVIDData: {
        dbTag: 'COVIDData',
        data: COVIDData,
        name: 'COVID Cases',
        explanation: "New confirmed cases of COVID-19 (7-day smoothed) per 1,000,000 people, colored by Stringency Index (0-100). Higher score indicates a stricter response (i.e. 100 = strictest response). If policies vary at the subnational level, the index is shown as the response level of the strictest sub-region.. Data shows Mar 01, 2022. Data Source: OurWorldInData",
        categories: ['Below 30', '30-60', 'Above 60']
    },
    test2: {
        dbTag: 'test2',
        data: TestData,
        name: 'DH Test Data',
        explanation: 'This is a test data for data hunch development purposes. Values have no real significance',
        categories: ['A', 'B', 'C', 'D'],
    }
};
