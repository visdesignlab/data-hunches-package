"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSketchyOptions = exports.firebaseSetup = exports.CategoricalColor = exports.ConfidenceInput = exports.TransitionDuration = exports.WithoutCatControlFOHeight = exports.ControlFOHeight = exports.ControlFOWidth = exports.DefaultForeignObjectHeight = exports.DefaultForeignObjectWidth = exports.ColorPallate = exports.DarkBlue = exports.HighlightColor = exports.SelectionColor = exports.LightGray = exports.DarkGray = exports.IndicatorSpace = exports.IndicatorSize = exports.LargeNumber = exports.margin = void 0;
var d3_scale_chromatic_1 = require("d3-scale-chromatic");
var app_1 = require("firebase/app");
var lite_1 = require("firebase/firestore/lite");
exports.margin = ({ top: 30, right: 100, bottom: 100, left: 30 });
exports.LargeNumber = 999;
exports.IndicatorSize = 6;
exports.IndicatorSpace = 10;
exports.DarkGray = '#9f9f9f';
exports.LightGray = '#eeeeee';
exports.SelectionColor = '#eb9800';
exports.HighlightColor = '#eb0053';
exports.DarkBlue = '#4ea6a7';
exports.ColorPallate = d3_scale_chromatic_1.schemeTableau10;
exports.DefaultForeignObjectWidth = 200;
exports.DefaultForeignObjectHeight = 255;
exports.ControlFOWidth = 152;
exports.ControlFOHeight = 245;
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
exports.CategoricalColor = [exports.DarkBlue, '#a77c4e', '#a74e7a'];
exports.firebaseSetup = (0, lite_1.getFirestore)((0, app_1.initializeApp)(FirebaseSetupConstants));
// Need color and stroke
exports.DefaultSketchyOptions = {
    fillStyle: 'zigzag',
    roughness: 2,
    hachureAngle: 60,
    hachureGap: 10,
    fillWeight: 1,
    strokeWidth: 2,
};
