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
exports.DataContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var mobx_react_lite_1 = require("mobx-react-lite");
var BarChart_1 = __importDefault(require("./BarChart"));
var Store_1 = __importDefault(require("./Interfaces/Store"));
var TopBar_1 = __importDefault(require("./Controls/TopBar"));
var core_1 = require("@material-ui/core");
var Table_1 = __importDefault(require("./TableComponents/Table"));
var lite_1 = require("firebase/firestore/lite");
var StateChecker_1 = require("./Interfaces/StateChecker");
var Constants_1 = require("./Interfaces/Constants");
exports.DataContext = (0, react_1.createContext)([]);
var BarChartWithDH = function (_a) {
    var datasetName = _a.datasetName, dataSet = _a.dataSet, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight;
    var store = (0, react_1.useContext)(Store_1.default);
    var _b = (0, react_1.useState)(dataSet), improvedDataSet = _b[0], setImprovedDataSet = _b[1];
    (0, react_1.useEffect)(function () {
        if (dataSet[0].categorical) {
            store.setContainCategory(Array.from(new Set(dataSet.map(function (d) { return d.categorical || 'a'; }))));
        }
    }, [dataSet]);
    store.setWidth(svgWidth);
    store.setHeight(svgHeight);
    store.setDataSetName(datasetName);
    var _c = (0, react_1.useState)([]), savedDH = _c[0], setSavedDH = _c[1];
    (0, react_1.useEffect)(function () {
        // Retrieve saved DH from DB
        (0, lite_1.getDocs)((0, lite_1.collection)(Constants_1.firebaseSetup, store.datasetName, "sub".concat(store.currentVol), 'dhs'))
            .then(function (result) {
            var tempDHArray = [];
            store.setNextDHIndex(result.size);
            var copyOfImpDataSet = JSON.parse(JSON.stringify(dataSet));
            result.forEach(function (doc) {
                if (!(doc.data().label === 'all chart')) {
                    if (copyOfImpDataSet.filter(function (d) { return d.label === doc.data().label; }).length === 0) {
                        copyOfImpDataSet.push({
                            label: doc.data().label,
                            value: 0,
                            // categorical?: string;
                            dataHunchArray: [doc.data()]
                        });
                    }
                    else if (copyOfImpDataSet.filter(function (d) { return d.label === doc.data().label; })[0].dataHunchArray) {
                        copyOfImpDataSet.filter(function (d) { return d.label === doc.data().label; })[0].dataHunchArray.push(doc.data());
                    }
                    else {
                        copyOfImpDataSet.filter(function (d) { return d.label === doc.data().label; })[0].dataHunchArray = [doc.data()];
                    }
                }
                tempDHArray.push(doc.data());
            });
            tempDHArray.sort(function (a, b) {
                return (a.id - b.id);
            });
            setSavedDH(tempDHArray);
            (0, StateChecker_1.stateUpdateWrapperUseJSON)(improvedDataSet, copyOfImpDataSet, setImprovedDataSet);
        });
    }, [store.nextDHIndex, store.currentVol]);
    return ((0, jsx_runtime_1.jsx)(exports.DataContext.Provider, __assign({ value: improvedDataSet }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(TopBar_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 1 }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: (0, jsx_runtime_1.jsx)(BarChart_1.default, { dataHunchArray: savedDH }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: (0, jsx_runtime_1.jsx)(Table_1.default, { dataHunchArray: savedDH }, void 0) }), void 0)] }), void 0)] }, void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(BarChartWithDH);
