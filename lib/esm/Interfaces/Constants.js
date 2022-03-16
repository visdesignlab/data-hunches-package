import { schemeTableau10 } from 'd3-scale-chromatic';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
export var margin = ({ top: 30, right: 100, bottom: 100, left: 70 });
export var LargeNumber = 999;
export var IndicatorSize = 6;
export var IndicatorSpace = 10;
export var DarkGray = '#9f9f9f';
export var LightGray = '#eeeeee';
export var SelectionColor = '#eb9800';
export var HighlightColor = '#eb0053';
export var DarkBlue = '#4ea6a7';
export var ColorPallate = schemeTableau10;
export var DefaultForeignObjectWidth = 200;
export var DefaultForeignObjectHeight = 255;
export var ControlFOWidth = 152;
export var ControlFOHeight = 245;
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
export var CategoricalColor = [DarkBlue, '#a77c4e', '#a74e7a'];
export var firebaseSetup = getFirestore(initializeApp(FirebaseSetupConstants));
// Need color and stroke
export var DefaultSketchyOptions = {
    fillStyle: 'zigzag',
    roughness: 1.5,
    hachureAngle: 50,
    hachureGap: 8,
    fillWeight: 1,
    strokeWidth: 2,
    fill: DarkGray,
    stroke: DarkGray,
};
