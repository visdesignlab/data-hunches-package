import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { BarChartDataPoint } from './Types';

export const margin = ({ top: 30, right: 150, bottom: 50, left: 90 });

export const LargeNumber = 999;

export const MaximumWidth = 900;
export const MaximumHeight = 700;

export const IndicatorSize = 6;
export const IndicatorSpace = 10;

export const DarkGray = '#5d5d5d';

export const LightGray = '#c8c8c8';

export const SelectionColor = '#e29609';

export const HighlightColor = '#ffcf76';

export const DataHunchColor = '#337ab7';

export const DefaultBar = '#b08aa6';

export const DefaultForeignObjectWidth = 200;

export const DefaultForeignObjectHeight = 285;

export const WithoutCatControlFOHeight = 260;

export const ControlFOWidth = 190;

export const ControlFOHeight = 300;

export const UpDownVoteFOWidth = 150;
export const UpDownVoteFOHeight = 50;



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

export const CategoricalColor = [DefaultBar, '#75c4c2', '#f3a87c', '#24b466'];

export const firebaseSetup = getFirestore(initializeApp(FirebaseSetupConstants));

// Need color and stroke
export const DefaultSketchyOptions = {
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