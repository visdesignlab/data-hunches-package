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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BarChart from "./BarChart";
import Store from "./Interfaces/Store";
import TopBar from "./Controls/TopBar";
import { Grid } from "@material-ui/core";
import Table from "./TableComponents/Table";
import { getDocs, collection } from "firebase/firestore/lite";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
export var DataContext = createContext([]);
var BarChartWithDH = function (_a) {
    var datasetName = _a.datasetName, dataSet = _a.dataSet, svgWidth = _a.svgWidth, svgHeight = _a.svgHeight;
    var store = useContext(Store);
    var _b = useState(dataSet), improvedDataSet = _b[0], setImprovedDataSet = _b[1];
    useEffect(function () {
        if (dataSet[0].categorical) {
            store.setContainCategory(Array.from(new Set(dataSet.map(function (d) { return d.categorical || 'a'; }))));
        }
    }, [dataSet]);
    store.setWidth(svgWidth);
    store.setHeight(svgHeight);
    store.setDataSetName(datasetName);
    var _c = useState([]), savedDH = _c[0], setSavedDH = _c[1];
    useEffect(function () {
        // Retrieve saved DH from DB
        getDocs(collection(store.firebaseSetup, store.datasetName))
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
            setSavedDH(tempDHArray);
            stateUpdateWrapperUseJSON(improvedDataSet, copyOfImpDataSet, setImprovedDataSet);
        });
    }, [store.nextDHIndex]);
    return (_jsx(DataContext.Provider, __assign({ value: improvedDataSet }, { children: _jsxs("div", { children: [_jsx(TopBar, {}, void 0), _jsxs(Grid, __assign({ container: true, spacing: 1 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: _jsx(BarChart, { dataHunchArray: savedDH }, void 0) }), void 0), _jsx(Grid, __assign({ item: true, xs: 12, lg: 6 }, { children: _jsx(Table, { dataHunchArray: savedDH }, void 0) }), void 0)] }), void 0)] }, void 0) }), void 0));
};
export default observer(BarChartWithDH);
