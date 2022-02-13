"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var d3_array_1 = require("d3-array");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var react_2 = require("react");
var react_3 = require("react");
var react_4 = require("react");
var __1 = require("..");
var ScaleGenerator_1 = require("../HelperFunctions/ScaleGenerator");
var Constants_1 = require("../Interfaces/Constants");
var StateChecker_1 = require("../Interfaces/StateChecker");
var Store_1 = __importDefault(require("../Interfaces/Store"));
require("roughjs");
var rough = __importStar(require("roughjs/bin/rough"));
var d3_selection_1 = require("d3-selection");
var DataHunchIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = (0, react_3.useContext)(Store_1.default);
    var dataSet = (0, react_3.useContext)(__1.DataContext);
    var verticalValueScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    // const categoricalColorScale = makeCategoricalScale(dataSet);
    var _b = (0, react_2.useState)([]), inVisDH = _b[0], setInVisDH = _b[1];
    var _c = (0, react_2.useState)([]), offVisDH = _c[0], setOffVisDH = _c[1];
    var dhRef = (0, react_1.useRef)(null);
    (0, react_4.useEffect)(function () {
        var tempInVis = [];
        var tempOffVis = [];
        dataHunchArray.forEach(function (d) {
            if (['annotation', 'exclusion'].includes(d.type)) {
                tempOffVis.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(inVisDH, tempInVis, setInVisDH);
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(offVisDH, tempOffVis, setOffVisDH);
    }, [dataHunchArray]);
    var calculateY = function (dataHunch, rangeCenter) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (rangeCenter) {
                var center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return verticalValueScale(center) - 2;
            }
            else {
                return verticalValueScale((0, d3_array_1.max)(parsedRange));
            }
        }
        return verticalValueScale(parseFloat(dataHunch.content));
    };
    var calculateHeight = function (dataHunch) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            console.log(parsedRange, dataHunch);
            return Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));
        }
        else {
            return store.svgHeight - Constants_1.margin.bottom - verticalValueScale(parseFloat(dataHunch.content));
        }
    };
    (0, react_1.useLayoutEffect)(function () {
        if (inVisDH.length <= 3) {
            if (dhRef.current !== null) {
                (0, d3_selection_1.select)(dhRef.current).selectAll('*').remove();
                var drawingG_1 = dhRef.current;
                var rc_1 = rough.default.svg(drawingG_1);
                inVisDH.forEach(function (d, i) {
                    var xPos = (honrizontalBandScale(d.label) || 0) + (honrizontalBandScale.bandwidth() / inVisDH.length * i);
                    var sketchyDH = rc_1.rectangle(xPos, calculateY(d, false), honrizontalBandScale.bandwidth() / inVisDH.length, calculateHeight(d), {
                        fill: Constants_1.BrightOrange,
                        stroke: Constants_1.BrightOrange,
                        fillStyle: 'zigzag',
                        roughness: 2.8,
                        hachureAngle: 60,
                        hachureGap: 10,
                        fillWeight: 2,
                        strokeWidth: 2,
                    });
                    drawingG_1.appendChild(sketchyDH);
                    // const sketchyDH = rc.rectangle(100, 100, 100, 100, {
                    //     fill: BrightOrange,
                    //     stroke: BrightOrange,
                    //     fillStyle: 'zigzag',
                    //     roughness: 2.8,
                    //     hachureAngle: 60,
                    //     hachureGap: 10,
                    //     fillWeight: 2,
                    //     strokeWidth: 2,
                });
            }
            ;
        }
    }, [inVisDH]);
    return ((0, jsx_runtime_1.jsx)("g", { children: inVisDH.length > 3 ?
            inVisDH.map(function (d) {
                return ((0, jsx_runtime_1.jsx)("rect", { x: honrizontalBandScale(d.label), width: honrizontalBandScale.bandwidth(), y: calculateY(d, true), height: 2, fill: Constants_1.DarkGray, opacity: 0.7 }, d.id));
            }) : (0, jsx_runtime_1.jsx)("g", { ref: dhRef }, void 0) }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(DataHunchIndicator);
