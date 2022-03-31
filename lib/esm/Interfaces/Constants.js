import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
export var margin = ({ top: 30, right: 150, bottom: 50, left: 90 });
export var LargeNumber = 999;
export var MaximumWidth = 900;
export var MaximumHeight = 700;
export var IndicatorSize = 6;
export var IndicatorSpace = 10;
export var DarkGray = '#5d5d5d';
export var LightGray = '#c8c8c8';
export var SelectionColor = '#e29609';
export var HighlightColor = '#ffcf76';
export var DataHunchColor = '#337ab7';
export var DefaultBar = '#b08aa6';
export var DefaultForeignObjectWidth = 200;
export var DefaultForeignObjectHeight = 285;
export var WithoutCatControlFOHeight = 260;
export var ControlFOWidth = 190;
export var ControlFOHeight = 300;
export var UpDownVoteFOWidth = 150;
export var UpDownVoteFOHeight = 50;
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
    // The angle of fill
    hachureAngle: 50,
    //gap for fill, higher make the stroke wider from each other
    hachureGap: 8,
    fillWeight: 1,
    strokeWidth: 2,
    fill: DataHunchColor,
    stroke: DataHunchColor,
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
