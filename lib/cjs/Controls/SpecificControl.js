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
var core_1 = require("@material-ui/core");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var Close_1 = __importDefault(require("@material-ui/icons/Close"));
var SpecificControl = function () {
    var store = (0, react_1.useContext)(Store_1.default);
    var styles = (0, StyledComponents_1.useStyles)();
    var annotationOnClickHandler = function () {
        store.selectADataPointMode(false);
        store.setInputMode('annotation');
    };
    var ratingClickHandler = function () {
        store.selectADataPointMode(false);
        store.setInputMode('rating');
    };
    var dataSpaceClickHandler = function () {
        store.setInputMode('dataSpace');
        store.selectADataPointMode(false);
    };
    var manipulationOnClickHandler = function () {
        store.setInputMode('manipulation');
        store.selectADataPointMode(false);
    };
    var categoricalClickHandler = function () {
        store.setInputMode('categorical');
        store.selectADataPointMode(false);
    };
    return ((0, jsx_runtime_1.jsx)("foreignObject", __assign({ id: 'specific-control', 
        // display={store.selectingADataPoint ? undefined : 'none'}
        display: 'none', width: Constants_1.ControlFOWidth, height: store.containCategory ? Constants_1.ControlFOHeight : Constants_1.WithoutCatControlFOHeight }, { children: (0, jsx_runtime_1.jsxs)(core_1.Container, __assign({ className: styles.foreignObjectContainer }, { children: [(0, jsx_runtime_1.jsxs)(core_1.ButtonGroup
                // ref={divRef}
                , __assign({ 
                    // ref={divRef}
                    orientation: "vertical", color: "primary", "aria-label": "vertical outlined primary button group" }, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, __assign({ onClick: annotationOnClickHandler }, { children: "Annotation" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ onClick: manipulationOnClickHandler }, { children: "Direct Manipulation" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ onClick: ratingClickHandler }, { children: "Rating" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ onClick: dataSpaceClickHandler }, { children: "Data Space" }), void 0), store.containCategory ? (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ onClick: categoricalClickHandler }, { children: "Categorical" }), void 0) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(core_1.IconButton, __assign({ size: "small", onClick: function () {
                        store.setCurrentSelectedDP(undefined);
                        store.selectADataPointMode(false);
                    } }, { children: (0, jsx_runtime_1.jsx)(Close_1.default, {}, void 0) }), void 0)] }), void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(SpecificControl);
