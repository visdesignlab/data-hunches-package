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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Store from "./Interfaces/Store";
import TopBar from "./Controls/TopBar";
import { Grid } from "@material-ui/core";
import Table from "./TableComponents/Table";
import { getDocs, collection, getDoc, doc } from "firebase/firestore/lite";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import { DataPreset, firebaseSetup } from "./Interfaces/Constants";
import BarChart from "./BarChart";
import WelcomeDialog from "./WelcomeDialog";
export var DataContext = createContext([]);
var BarChartWithDH = function () {
    var store = useContext(Store);
    var _a = useState([]), improvedDataSet = _a[0], setImprovedDataSet = _a[1];
    useEffect(function () {
        if (DataPreset[store.dbTag].categories.length > 0) {
            store.setShowCategory(true);
        }
    }, [store.dbTag]);
    var _b = useState([]), savedDH = _b[0], setSavedDH = _b[1];
    useEffect(function () {
        //first time retrieve DH from DB
        getDoc(doc(firebaseSetup, store.dbTag, "sub".concat(store.currentVol))).then(function (dhNextIndex) {
            if (dhNextIndex.exists()) {
                store.setNextIndex(dhNextIndex.data().nextIndex);
            }
            else {
                store.setNextIndex(0);
            }
        });
        getDocs(collection(firebaseSetup, store.dbTag, "sub".concat(store.currentVol), 'dhs')).then(function (dhResult) {
            store.setTotalDH(dhResult.size);
        });
    }, [store.currentVol]);
    var retrieveData = function () {
        getDocs(collection(firebaseSetup, store.dbTag, "sub".concat(store.currentVol), 'dhs'))
            .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
            var tempDHArray, dataSet, copyOfImpDataSet;
            return __generator(this, function (_a) {
                tempDHArray = [];
                dataSet = DataPreset[store.dbTag].data;
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
                stateUpdateWrapperUseJSON(improvedDataSet, copyOfImpDataSet, setImprovedDataSet);
                return [2 /*return*/];
            });
        }); });
    };
    useEffect(function () {
        // Retrieve saved DH from DB
        retrieveData();
    }, [store.numOfDH, store.currentVol, store.dbTag]);
    return (_jsx(DataContext.Provider, __assign({ value: improvedDataSet }, { children: _jsxs("div", { children: [_jsx(TopBar, {}, void 0), _jsxs(Grid, __assign({ container: true, spacing: 1 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: _jsx(BarChart, { dataHunchArray: savedDH, retrieveData: retrieveData }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: _jsx(Table, { dataHunchArray: savedDH }, void 0) }), void 0)] }), void 0), _jsx(WelcomeDialog, {}, void 0)] }, void 0) }), void 0));
};
export default observer(BarChartWithDH);
