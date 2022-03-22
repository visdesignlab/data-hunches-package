"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPreset = exports.DefaultSketchyOptions = exports.firebaseSetup = exports.CategoricalColor = exports.ConfidenceInput = exports.TransitionDuration = exports.WithoutCatControlFOHeight = exports.ControlFOHeight = exports.ControlFOWidth = exports.DefaultForeignObjectHeight = exports.DefaultForeignObjectWidth = exports.DefaultBar = exports.DataHunchColor = exports.HighlightColor = exports.SelectionColor = exports.LightGray = exports.DarkGray = exports.IndicatorSpace = exports.IndicatorSize = exports.LargeNumber = exports.margin = void 0;
var app_1 = require("firebase/app");
var lite_1 = require("firebase/firestore/lite");
exports.margin = ({ top: 30, right: 100, bottom: 50, left: 70 });
exports.LargeNumber = 999;
exports.IndicatorSize = 6;
exports.IndicatorSpace = 10;
exports.DarkGray = '#5d5d5d';
exports.LightGray = '#eeeeee';
exports.SelectionColor = '#e29609';
exports.HighlightColor = '#ffcf76';
exports.DataHunchColor = '#337ab7';
exports.DefaultBar = '#b08aa6';
exports.DefaultForeignObjectWidth = 200;
exports.DefaultForeignObjectHeight = 255;
exports.ControlFOWidth = 152;
exports.ControlFOHeight = 285;
exports.WithoutCatControlFOHeight = 208;
exports.TransitionDuration = 500;
var FirebaseSetupConstants = {
    apiKey: "AIzaSyAM2CAoS7L7Ix0UTgET6dB-iI-q3wb2VDQ",
    authDomain: "data-hunch.firebaseapp.com",
    projectId: "data-hunch",
    storageBucket: "data-hunch.appspot.com",
    messagingSenderId: "746016997124",
    appId: "1:746016997124:web:ee92f17b272373d28ada51"
};
exports.ConfidenceInput = ['Not at all confident', 'Not very confident', 'Somewhat confident', 'Very confident', 'Extremely confident'];
exports.CategoricalColor = [exports.DefaultBar, '#75c4c2', '#f3a87c', '#24b466'];
exports.firebaseSetup = (0, lite_1.getFirestore)((0, app_1.initializeApp)(FirebaseSetupConstants));
// Need color and stroke
exports.DefaultSketchyOptions = {
    fillStyle: 'zigzag',
    roughness: 1.5,
    hachureAngle: 50,
    hachureGap: 8,
    fillWeight: 1,
    strokeWidth: 2,
    fill: exports.DataHunchColor,
    stroke: exports.DataHunchColor,
};
var COVIDData = [
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
exports.DataPreset = {
    COVIDData: {
        dbTag: 'COVIDData',
        data: COVIDData,
        name: 'COVID Cases',
        explanation: "New confirmed cases of COVID-19 (7-day smoothed) per 1,000,000 people. Data shows Mar 01, 2022.",
        categories: ['Europe', 'Oceania', 'North America']
    },
    test2: {
        dbTag: 'test2',
        data: TestData,
        name: 'DH Test Data',
        explanation: 'This is a test data for data hunch development purposes. Values have no real significance',
        categories: ['A', 'B', 'C', 'D'],
    }
};
