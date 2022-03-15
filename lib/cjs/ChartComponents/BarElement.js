"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var d3_selection_1 = require("d3-selection");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
//Make a single bar
//Maybe we should just do on click in here instead of "click" a button
var BarElement = function (_a) {
    var width = _a.width, height = _a.height, xPos = _a.xPos, yPos = _a.yPos, fill = _a.fill, dataElement = _a.dataElement;
    var store = (0, react_1.useContext)(Store_1.default);
    var evaluateHighlight = function () {
        if (!['none', 'manipulations', 'sketch', 'range'].includes(store.inputMode)) {
            return store.selectedDP === dataElement.label ? Constants_1.SelectionColor : 'none';
        }
        return 'none';
    };
    var barElementOnClick = function (e) {
        if (store.selectingADataPoint) {
            store.setCurrentSelectedDP(dataElement.label);
            var xLoc = ((0, d3_selection_1.pointer)(e)[0] + Constants_1.ControlFOWidth) > store.svgWidth ? ((0, d3_selection_1.pointer)(e)[0] - Constants_1.ControlFOWidth) : (0, d3_selection_1.pointer)(e)[0];
            var yLoc = ((0, d3_selection_1.pointer)(e)[1] + Constants_1.ControlFOHeight) > store.svgHeight ? ((0, d3_selection_1.pointer)(e)[1] - Constants_1.ControlFOHeight) : (0, d3_selection_1.pointer)(e)[1];
            var formXLoc = ((0, d3_selection_1.pointer)(e)[0] + Constants_1.DefaultForeignObjectWidth) > store.svgWidth ? ((0, d3_selection_1.pointer)(e)[0] - Constants_1.DefaultForeignObjectWidth) : (0, d3_selection_1.pointer)(e)[0];
            var formYLoc = ((0, d3_selection_1.pointer)(e)[1] + Constants_1.DefaultForeignObjectHeight) > store.svgHeight ? ((0, d3_selection_1.pointer)(e)[1] - Constants_1.DefaultForeignObjectHeight) : (0, d3_selection_1.pointer)(e)[1];
            (0, d3_selection_1.select)('#specific-control')
                .attr('display', null)
                .attr('x', xLoc)
                .attr('y', yLoc);
            (0, d3_selection_1.select)('#form-component')
                .attr('x', formXLoc)
                .attr('y', formYLoc);
        }
    };
    return (0, jsx_runtime_1.jsx)("rect", { width: width, height: height, x: xPos, y: yPos, cursor: store.selectingADataPoint ? 'pointer' : undefined, onClick: barElementOnClick, 
        // onMouseLeave={() => { store.setHighlightedDH(-1); store.setSelectedDH([]); }}
        fill: fill, strokeWidth: 4, stroke: evaluateHighlight() }, void 0);
};
exports.default = (0, mobx_react_lite_1.observer)(BarElement);
