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
var RangeLayer_1 = __importDefault(require("./ChartComponents/RangeLayer"));
var react_2 = require("react");
var DataHunchIndicators_1 = __importDefault(require("./ChartComponents/DataHunch/DataHunchIndicators"));
var StateChecker_1 = require("./Interfaces/StateChecker");
var core_1 = require("@material-ui/core");
var StyledComponents_1 = require("./Interfaces/StyledComponents");
var CategoricalIndicator_1 = __importDefault(require("./ChartComponents/DataHunch/CategoricalIndicator"));
var ChartLegends_1 = __importDefault(require("./ChartComponents/ChartLegends"));
var SketchLayer_1 = __importDefault(require("./ChartComponents/SketchLayer"));
var ManipulationForm_1 = __importDefault(require("./ChartComponents/Forms/ManipulationForm"));
var d3_format_1 = require("d3-format");
var d3_textwrap_1 = require("d3-textwrap");
var ManipulationLayer_1 = __importDefault(require("./ChartComponents/ManipulationLayer"));
var react_3 = require("react");
var ChartTitle_1 = __importDefault(require("./ChartComponents/ChartTitle"));
var BarChart = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = (0, react_1.useContext)(Store_1.default);
    var styles = (0, StyledComponents_1.useStyles)();
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
    var valueScale = (0, ScaleGenerator_1.makeValueScale)(dataSet, store.svgWidth);
    var bandScale = (0, ScaleGenerator_1.makeBandScale)(dataSet, store.svgHeight);
    var categoricalColorScale = (0, ScaleGenerator_1.makeCategoricalScale)(dataSet);
    var yAxis = (0, d3_axis_1.axisTop)(valueScale).tickFormat((0, d3_format_1.format)('.2s'));
    var xAxis = (0, d3_axis_1.axisLeft)(bandScale);
    (0, d3_selection_1.select)('#vertical-axis')
        .attr('transform', "translate(0,".concat(Constants_1.margin.top, ")"))
        .call(yAxis);
    var wrap = (0, d3_textwrap_1.textwrap)().bounds({ width: 50, height: bandScale.bandwidth() }).method('tspans');
    (0, d3_selection_1.select)('#band-axis')
        .attr("transform", "translate(".concat(Constants_1.margin.left, ",0)"))
        .call(xAxis)
        .selectAll(".tick text")
        .call(wrap);
    (0, react_3.useLayoutEffect)(function () {
        if (store.selectedDP) {
            (0, d3_selection_1.select)('#band-axis').selectAll(".tick text").attr('fill', function (d) { return d === store.selectedDP ? Constants_1.SelectionColor : 'black'; });
        }
        else {
            (0, d3_selection_1.select)('#band-axis').selectAll(".tick text").attr('fill', 'black');
        }
    }, [store.selectedDP]);
    return (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("svg", __assign({ width: store.svgWidth, height: store.svgHeight }, { children: [store.showCategory ? (0, jsx_runtime_1.jsx)(ChartLegends_1.default, {}, void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), (0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "band-axis" }, void 0), (0, jsx_runtime_1.jsx)("g", __assign({ id: "rectangles-preview", display: store.needToShowPreview ? undefined : 'none' }, { children: (0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "axis-mask", transform: "translate(".concat(Constants_1.margin.left, ",0)") }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("g", { className: 'axis', id: "vertical-axis" }, void 0), (0, jsx_runtime_1.jsx)("g", __assign({ id: "rectangles", display: (!store.needToShowPreview) ? undefined : 'none' }, { children: dataSet.map(function (d, i) {
                            return (0, jsx_runtime_1.jsx)(BarElement_1.default, { dataElement: d, width: valueScale(d.value) - Constants_1.margin.left, height: bandScale.bandwidth(), xPos: Constants_1.margin.left, yPos: bandScale(d.label) || 0, fill: store.showCategory ? categoricalColorScale(d.categorical || 'a') : Constants_1.DefaultBar }, "".concat(i, "-barelement"));
                        }) }), void 0), (0, jsx_runtime_1.jsx)("g", __assign({ id: 'data-hunches-container' }, { children: dataSet.map(function (barDP) {
                            if (barDP.dataHunchArray) {
                                var catDH = [];
                                if (store.showCategory) {
                                    catDH = barDP.dataHunchArray.filter(function (d) { return d.type === 'categorical'; });
                                }
                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(DataHunchIndicators_1.default, { dataPoint: barDP, dataHunchArray: barDP.dataHunchArray }, "".concat(barDP.label, "-dhindicator")), (0, jsx_runtime_1.jsx)(CategoricalIndicator_1.default, { dataHunchArrayString: JSON.stringify(catDH), barChartPoint: barDP }, "".concat(barDP.label, "-catindicator"))] }, void 0));
                            }
                            else {
                                return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0);
                            }
                        }) }), void 0), (0, jsx_runtime_1.jsx)(RangeLayer_1.default, { sendManipulation: sendManipulationToParent }, void 0), (0, jsx_runtime_1.jsx)(ManipulationLayer_1.default, { sendManipulation: sendManipulationToParent }, void 0), (0, jsx_runtime_1.jsx)(SketchLayer_1.default, { sendManipulation: sendManipulationToParent }, void 0), (0, jsx_runtime_1.jsx)(FormComponent_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(SpecificControl_1.default, {}, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true }, { children: [(0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ item: true, xs: 6 }, { children: [(store.inputMode === 'sketch' || store.inputMode === 'manipulations' || store.inputMode === 'range') ? (0, jsx_runtime_1.jsx)("div", __assign({ style: { width: Constants_1.DefaultForeignObjectWidth, height: Constants_1.DefaultForeignObjectHeight } }, { children: (0, jsx_runtime_1.jsx)(ManipulationForm_1.default, { manipulationOutput: manipulationResult, type: store.inputMode }, void 0) }), void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), (0, jsx_runtime_1.jsx)(ChartTitle_1.default, {}, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 6, style: { textAlign: 'start' } }, { children: (0, jsx_runtime_1.jsx)("ul", __assign({ className: styles.noBulletsList }, { children: allChartDHArray.map(function (d, i) {
                                return ((0, jsx_runtime_1.jsx)(StyledComponents_1.LightTooltip, __assign({ title: (0, jsx_runtime_1.jsxs)("div", { children: [d.type !== 'sketch' ? (0, jsx_runtime_1.jsxs)("div", { children: ["Content: ", d.content] }, void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), (0, jsx_runtime_1.jsxs)("div", { children: ["Reasoning: ", d.reasoning] }, void 0)] }, void 0) }, { children: (0, jsx_runtime_1.jsx)("li", __assign({ style: { width: 'fit-content' } }, { children: (0, jsx_runtime_1.jsxs)(StyledComponents_1.DHIndicatorText, __assign({ isHighlighted: d.id === store.highlightedDH, isSelected: store.selectedDH.includes(d.id), onClick: function () { store.setSelectedDH([d.id]); }, onMouseOver: function () { store.setHighlightedDH(d.id); }, onMouseOut: function () { store.setHighlightedDH(-1); }, fontSize: 'larger', needBold: true, style: { textOverflow: 'ellipsis' } }, { children: ["*", d.type === 'sketch' ? 'sketch' : d.content] }), "".concat(d.id, "-text")) }), void 0) }), void 0));
                            }) }), void 0) }), void 0)] }), void 0)] }, void 0);
};
exports.default = (0, mobx_react_lite_1.observer)(BarChart);
