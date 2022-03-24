"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPreset = exports.DefaultSketchyOptions = exports.firebaseSetup = exports.CategoricalColor = exports.ConfidenceInput = exports.TransitionDuration = exports.UpDownVoteFOHeight = exports.UpDownVoteFOWidth = exports.ControlFOHeight = exports.ControlFOWidth = exports.WithoutCatControlFOHeight = exports.DefaultForeignObjectHeight = exports.DefaultForeignObjectWidth = exports.DefaultBar = exports.DataHunchColor = exports.HighlightColor = exports.SelectionColor = exports.LightGray = exports.DarkGray = exports.IndicatorSpace = exports.IndicatorSize = exports.LargeNumber = exports.margin = void 0;
var app_1 = require("firebase/app");
var lite_1 = require("firebase/firestore/lite");
exports.margin = ({ top: 30, right: 150, bottom: 50, left: 90 });
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
exports.DefaultForeignObjectHeight = 285;
exports.WithoutCatControlFOHeight = 260;
exports.ControlFOWidth = 190;
exports.ControlFOHeight = 300;
exports.UpDownVoteFOWidth = 150;
exports.UpDownVoteFOHeight = 50;
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
var StudentData = [
    { label: 'UNKNOWN', value: 43 },
    { label: 'visualization', value: 42 },
    { label: 'systems', value: 27 },
    { label: 'theory', value: 24 },
    { label: 'scicomp', value: 24 },
    { label: 'db', value: 22 },
    { label: 'pl', value: 21 },
    { label: 'vision', value: 20 },
    { label: 'graphics', value: 17 },
    { label: 'image analysis', value: 15 },
    { label: 'arch', value: 14 },
    { label: 'nlp', value: 14 },
    { label: 'hpc', value: 13 },
    { label: 'N/A', value: 10 },
    { label: 'robotics', value: 9 },
    { label: 'games', value: 7 },
    { label: 'ai', value: 7 },
    { label: 'hci', value: 6 },
    { label: 'os', value: 5 },
    { label: 'ml', value: 3 },
    { label: 'security / privacy', value: 1 }
];
var GreenhouseGas = [
    { categorical: 'Meat', label: 'Beef (beef herd)', value: 59.6 },
    { categorical: 'Meat', label: 'Lamb & Mutton', value: 24.5 },
    { categorical: 'Diary', label: 'Cheese', value: 21.2 },
    { categorical: 'Diary', label: 'Beef (dairy herd)', value: 21.1 },
    { categorical: 'Other', label: 'Dark Chocolate', value: 18.7 },
    { categorical: 'Other', label: 'Coffee', value: 16.5 },
    { categorical: 'Seafood', label: 'Shrimps (farmed)', value: 11.8 },
    { categorical: 'Oil', label: 'Palm Oil', value: 7.6 },
    { categorical: 'Meat', label: 'Pig Meat', value: 7.2 },
    { categorical: 'Meat', label: 'Poultry Meat', value: 6.1 },
    { categorical: 'Oil', label: 'Olive Oil', value: 6 },
    { categorical: 'Oil', label: 'Soybean Oil', value: 6 },
    { categorical: 'Seafood', label: 'Fish (farmed)', value: 5.1 },
    { categorical: 'Other', label: 'Eggs', value: 4.5 },
    { categorical: 'Other', label: 'Rice', value: 4 },
    { categorical: 'Oil', label: 'Rapeseed Oil', value: 3.7 },
    { categorical: 'Oil', label: 'Sunflower Oil', value: 3.5 },
    { categorical: 'Other', label: 'Tofu', value: 3 },
    { categorical: 'Diary', label: 'Milk', value: 2.8 },
];
exports.DataPreset = {
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
    },
    student: {
        dbTag: 'student',
        data: StudentData,
        name: 'Student Area',
        explanation: 'Graduate student admitted of each area',
        categories: []
    },
    GreenhouseGas: {
        dbTag: 'GreenhouseGas',
        data: GreenhouseGas,
        name: 'Greenhouse gas',
        explanation: 'Greenhouse gas emissions across the supply chain. They are measured in kilograms of carbon dioxide equivalents (kgCO₂eq) per kilogram of food. Colored by type of food',
        categories: ['Meat', 'Diary', 'Seafood', 'Oil', 'Other'],
    }
};
// Stringent Index:
// Australia	51.39
// Austria	57.41
// Canada	68.98
// France	69.44
// Germany	84.26
// New Zealand	58.33
// Norway	13.89
// Sweden	19.44
// United Kingdom	17.59
// United States	53.24;
// Beef(beef herd)										59.6;
// Lamb & Mutton										24.5
// Cheese										21.2;
// Beef(dairy herd)										21.1
// Dark Chocolate										18.7
// Coffee										16.5;
// Shrimps(farmed)										11.8
// Palm Oil										7.6
// Pig Meat										7.2
// Poultry Meat										6.1
// Olive Oil										6
// Soybean Oil										6;
// Fish(farmed)										5.1
// Eggs										4.5
// Rice										4
// Rapeseed Oil										3.7
// Sunflower Oil										3.5
// Tofu										3
// Milk										2.8;
