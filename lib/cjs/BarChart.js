"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var BarElement_1 = __importDefault(require("./ChartComponents/BarElement"));
var ScaleGenerator_1 = require("./HelperFunctions/ScaleGenerator");
var Constants_1 = require("./Interfaces/Constants");
var Store_1 = __importDefault(require("./Interfaces/Store"));
var d3_axis_1 = require("d3-axis");
var d3_selection_1 = require("d3-selection");
var FormComponent_1 = __importDefault(require("./ChartComponents/FormComponent"));
var SpecificControl_1 = __importDefault(require("./Controls/SpecificControl"));
var _1 = require(".");
var ManipulationLayer_1 = __importDefault(require("./ChartComponents/ManipulationLayer"));
var react_2 = require("react");
var DataHunchIndicators_1 = __importDefault(require("./ChartComponents/DataHunch/DataHunchIndicators"));
var StateChecker_1 = require("./Interfaces/StateChecker");
var core_1 = require("@material-ui/core");
var StyledComponents_1 = require("./Interfaces/StyledComponents");
var CategoricalIndicator_1 = __importDefault(require("./ChartComponents/DataHunch/CategoricalIndicator"));
var ChartLegends_1 = __importDefault(require("./ChartComponents/ChartLegends"));
var SketchLayer_1 = __importDefault(require("./ChartComponents/SketchLayer"));
var ManipulationForm_1 = __importDefault(require("./ChartComponents/Forms/ManipulationForm"));
var BarChart = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = (0, react_1.useContext)(Store_1.default);
    var dataSet = (0, react_1.useContext)(_1.DataContext);
    var _b = (0, react_1.useState)(''), manipulationResult = _b[0], setManipulationResult = _b[1];
    var sendManipulationToParent = function (manipulationResult) {
        setManipulationResult(manipulationResult);
    };
    (0, react_2.useEffect)(function () {
        if (store.inputMode !== 'manipulations') {
            setManipulationResult('');
        }
    }, [store.inputMode]);
    var _c = (0, react_1.useState)([]), allChartDHArray = _c[0], setAllChartDHArray = _c[1];
    (0, react_2.useEffect)(function () {
        var tempArray = dataHunchArray.filter(function (d) { return d.label === 'all chart'; });
        (0, StateChecker_1.stateUpdateWrapperUseJSON)(allChartDHArray, tempArray, setAllChartDHArray);
    }, [dataHunchArray]);
    // if needed useCallback
    var verticalValueScale = (0, ScaleGenerator_1.makeVerticalScale)(dataSet, store.svgHeight);
    var honrizontalBandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgWidth);
    var categoricalColorScale = (0, ScaleGenerator_1.makeCategoricalScale)(dataSet);
    var yAxis = (0, d3_axis_1.axisLeft)(verticalValueScale);
    var xAxis = (0, d3_axis_1.axisBottom)(honrizontalBandScale);
    (0, d3_selection_1.select)('#vertical-axis')
        .attr('transform', "translate(".concat(Constants_1.margin.left, ",0)"))
        .call(yAxis);
    (0, d3_selection_1.select)('#band-axis')
        .attr("transform", "translate(0,".concat(store.svgHeight - Constants_1.margin.bottom, ")"))
        .call(xAxis);
    var findStart = function () {
        return store.svgWidth * 0.5 - Constants_1.IndicatorSpace * (allChartDHArray.length - 1) * 0.5 - (allChartDHArray.length - 1) * Constants_1.IndicatorSize;
    };
    return (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("svg", __assign({ width: store.svgWidth, height: store.svgHeight }, { children: [(0, jsx_runtime_1.jsx)(ChartLegends_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)("g", __assign({ id: 'chart-title' }, { children: [(0, jsx_runtime_1.jsx)("text", __assign({ x: store.svgWidth * 0.5, y: 5, alignmentBaseline: 'hanging', textAnchor: "middle", fontSize: 'large' }, { children: store.datasetName }), void 0), allChartDHArray.map(function (d, i) {
                                return ((0, jsx_runtime_1.jsx)(core_1.Tooltip, __assign({ title: d.content }, { children: (0, jsx_runtime_1.jsx)(StyledComponents_1.DHIndicatorText, __assign({ isHighlighted: d.id === store.highlightedDH, x: findStart() + Constants_1.IndicatorSize * (i) * 2 + Constants_1.IndicatorSpace * i, y: 34, fontSize: 'large' }, { children: "*" }), "".concat(d.id, "-text")) }), void 0));
                            })] }), void 0), (0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "band-axis" }, void 0), (0, jsx_runtime_1.jsx)("g", __assign({ id: "rectangles-preview", display: store.needToShowPreview ? undefined : 'none' }, { children: (0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "axis-mask", transform: "translate(".concat(Constants_1.margin.left, ",0)") }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "vertical-axis" }, void 0), (0, jsx_runtime_1.jsx)("g", __assign({ id: "rectangles", display: (!store.needToShowPreview) ? undefined : 'none' }, { children: dataSet.map(function (d, i) {
                            return (0, jsx_runtime_1.jsx)(BarElement_1.default, { dataElement: d, height: store.svgHeight - Constants_1.margin.bottom - verticalValueScale(d.value), width: honrizontalBandScale.bandwidth(), xPos: honrizontalBandScale(d.label) || 0, yPos: verticalValueScale(d.value), fill: store.containCategory.length > 0 ? categoricalColorScale(d.categorical || 'a') : Constants_1.DarkBlue }, "".concat(i, "-barelement"));
                        }) }), void 0), (0, jsx_runtime_1.jsx)("g", __assign({ id: 'data-hunches-container' }, { children: dataSet.map(function (barDP) {
                            if (barDP.dataHunchArray) {
                                var catDH = barDP.dataHunchArray.filter(function (d) { return d.type === 'categorical'; });
                                if (store.selectedDH.length === 0) {
                                    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DataHunchIndicators_1.default, { dataHunchArray: barDP.dataHunchArray }, "".concat(barDP.label, "-dhindicator")), (0, jsx_runtime_1.jsx)(CategoricalIndicator_1.default, { dataHunchArrayString: JSON.stringify(catDH) }, "".concat(barDP.label, "-catindicator"))] }, void 0));
                                }
                                else {
                                    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DataHunchIndicators_1.default, { dataHunchArray: barDP.dataHunchArray.filter(function (d) { return ["annotation", 'exclusion', 'categorical'].includes(d.type) || store.selectedDH.includes(d.id); }) }, "".concat(barDP.label, "-dhindicator")), (0, jsx_runtime_1.jsx)(CategoricalIndicator_1.default, { dataHunchArrayString: JSON.stringify(catDH.filter(function (d) { return store.selectedDH.includes(d.id); })) }, "".concat(barDP.label, "-catindicator"))] }, void 0));
                                }
                            }
                            else {
                                return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0);
                            }
                        }) }), void 0), store.inputMode === 'manipulations' ? (0, jsx_runtime_1.jsx)(ManipulationLayer_1.default, { sendManipulation: sendManipulationToParent }, void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), store.inputMode === 'sketch' ?
                        (0, jsx_runtime_1.jsx)(SketchLayer_1.default, { sendManipulation: sendManipulationToParent }, void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), (0, jsx_runtime_1.jsx)(FormComponent_1.default, { manipulationOutput: manipulationResult }, void 0), (0, jsx_runtime_1.jsx)(SpecificControl_1.default, {}, void 0)] }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ style: { width: Constants_1.DefaultForeignObjectWidth, height: Constants_1.DefaultForeignObjectHeight } }, { children: store.inputMode === 'sketch' ?
                    (0, jsx_runtime_1.jsx)(ManipulationForm_1.default, { manipulationOutput: manipulationResult, type: 'sketch' }, void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0) }), void 0)] }, void 0);
};
exports.default = (0, mobx_react_lite_1.observer)(BarChart);
