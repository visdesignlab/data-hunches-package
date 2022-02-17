"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoricalColor = exports.ConfidenceInput = exports.FirebaseSetup = exports.TransitionDuration = exports.WithoutCatControlFOHeight = exports.ControlFOHeight = exports.ControlFOWidth = exports.DefaultForeignObjectHeight = exports.DefaultForeignObjectWidth = exports.ColorPallate = exports.DarkBlue = exports.BrightOrange = exports.LightGray = exports.DarkGray = exports.IndicatorSpace = exports.IndicatorSize = exports.LargeNumber = exports.margin = void 0;
var d3_scale_chromatic_1 = require("d3-scale-chromatic");
exports.margin = ({ top: 70, right: 0, bottom: 70, left: 30 });
exports.LargeNumber = 999;
exports.IndicatorSize = 6;
exports.IndicatorSpace = 3;
exports.DarkGray = '#a9a9a9';
exports.LightGray = '#eeeeee';
exports.BrightOrange = '#eb9800';
exports.DarkBlue = '#4ea6a7';
exports.ColorPallate = d3_scale_chromatic_1.schemeTableau10;
exports.DefaultForeignObjectWidth = 200;
exports.DefaultForeignObjectHeight = 255;
exports.ControlFOWidth = 152;
exports.ControlFOHeight = 245;
exports.WithoutCatControlFOHeight = 208;
exports.TransitionDuration = 500;
exports.FirebaseSetup = {
    apiKey: "AIzaSyAM2CAoS7L7Ix0UTgET6dB-iI-q3wb2VDQ",
    authDomain: "data-hunch.firebaseapp.com",
    projectId: "data-hunch",
    storageBucket: "data-hunch.appspot.com",
    messagingSenderId: "746016997124",
    appId: "1:746016997124:web:ee92f17b272373d28ada51"
};
exports.ConfidenceInput = ['Not at all confident', 'Not very confident', 'Somewhat confident', 'Very confident', 'Extremely confident'];
exports.CategoricalColor = [exports.DarkBlue, '#a77c4e', '#a74e7a'];
