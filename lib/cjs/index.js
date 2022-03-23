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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataContext = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var mobx_react_lite_1 = require("mobx-react-lite");
var Store_1 = __importDefault(require("./Interfaces/Store"));
var TopBar_1 = __importDefault(require("./Controls/TopBar"));
var core_1 = require("@material-ui/core");
var Table_1 = __importDefault(require("./TableComponents/Table"));
var lite_1 = require("firebase/firestore/lite");
var StateChecker_1 = require("./Interfaces/StateChecker");
var Constants_1 = require("./Interfaces/Constants");
var BarChart_1 = __importDefault(require("./BarChart"));
var WelcomeDialog_1 = __importDefault(require("./WelcomeDialog"));
exports.DataContext = (0, react_1.createContext)([]);
var BarChartWithDH = function (_a) {
    var svgWidth = _a.svgWidth, svgHeight = _a.svgHeight;
    var store = (0, react_1.useContext)(Store_1.default);
    store.setWidth(svgWidth);
    store.setHeight(svgHeight);
    var _b = (0, react_1.useState)([]), improvedDataSet = _b[0], setImprovedDataSet = _b[1];
    (0, react_1.useEffect)(function () {
        if (Constants_1.DataPreset[store.dbTag].categories.length > 0) {
            store.setShowCategory(true);
        }
    }, [store.dbTag]);
    var _c = (0, react_1.useState)([]), savedDH = _c[0], setSavedDH = _c[1];
    (0, react_1.useEffect)(function () {
        //first time retrieve DH from DB
        (0, lite_1.getDoc)((0, lite_1.doc)(Constants_1.firebaseSetup, store.dbTag, "sub".concat(store.currentVol))).then(function (dhNextIndex) {
            if (dhNextIndex.exists()) {
                store.setNextIndex(dhNextIndex.data().nextIndex);
            }
            else {
                store.setNextIndex(0);
            }
        });
        (0, lite_1.getDocs)((0, lite_1.collection)(Constants_1.firebaseSetup, store.dbTag, "sub".concat(store.currentVol), 'dhs')).then(function (dhResult) {
            store.setTotalDH(dhResult.size);
        });
    }, [store.currentVol]);
    (0, react_1.useEffect)(function () {
        // Retrieve saved DH from DB
        (0, lite_1.getDocs)((0, lite_1.collection)(Constants_1.firebaseSetup, store.dbTag, "sub".concat(store.currentVol), 'dhs'))
            .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
            var tempDHArray, dataSet, copyOfImpDataSet;
            return __generator(this, function (_a) {
                tempDHArray = [];
                dataSet = Constants_1.DataPreset[store.dbTag].data;
                copyOfImpDataSet = JSON.parse(JSON.stringify(dataSet));
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
                return [2 /*return*/];
            });
        }); });
    }, [store.numOfDH, store.currentVol, store.dbTag]);
    return ((0, jsx_runtime_1.jsx)(exports.DataContext.Provider, __assign({ value: improvedDataSet }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(TopBar_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)(core_1.Grid, __assign({ container: true, spacing: 1 }, { children: [(0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: (0, jsx_runtime_1.jsx)(BarChart_1.default, { dataHunchArray: savedDH }, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: (0, jsx_runtime_1.jsx)(Table_1.default, { dataHunchArray: savedDH }, void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(WelcomeDialog_1.default, {}, void 0)] }, void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(BarChartWithDH);
