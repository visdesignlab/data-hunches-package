import { schemeTableau10 } from 'd3-scale-chromatic';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

export const margin = ({ top: 30, right: 100, bottom: 100, left: 70 });

export const LargeNumber = 999;

export const IndicatorSize = 6;
export const IndicatorSpace = 10;

export const DarkGray = '#9f9f9f';

export const LightGray = '#eeeeee';

export const SelectionColor = '#eb9800';

export const HighlightColor = '#eb0053';

export const DarkBlue = '#4ea6a7';

export const ColorPallate = schemeTableau10;

export const DefaultForeignObjectWidth = 200;

export const DefaultForeignObjectHeight = 255;

export const ControlFOWidth = 152;

export const ControlFOHeight = 245;

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

export const CategoricalColor = [DarkBlue, '#a77c4e', '#a74e7a'];

export const firebaseSetup = getFirestore(initializeApp(FirebaseSetupConstants));

// Need color and stroke
export const DefaultSketchyOptions = {
    fillStyle: 'zigzag',
    roughness: 1.5,
    hachureAngle: 50,
    hachureGap: 8,
    fillWeight: 1,
    strokeWidth: 2,
    fill: DarkGray,
    stroke: DarkGray,
};