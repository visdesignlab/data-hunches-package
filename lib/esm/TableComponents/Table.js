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
import { getDocs, collection } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { useTable, useSortBy } from 'react-table';
import Store from "../Interfaces/Store";
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
var Table = function () {
    var store = useContext(Store);
    var _a = useState([]), savedDH = _a[0], setSavedDH = _a[1];
    useEffect(function () {
        // Retrieve saved DH from DB
        getDocs(collection(store.firebaseSetup, store.datasetName))
            .then(function (result) {
            var tempDHArray = [];
            store.setNextDHIndex(result.size);
            result.forEach(function (doc) {
                tempDHArray.push(doc.data());
                // if (!that.userColorProfile[doc.data().user]) {
                //     that.userColorProfile[doc.data().user] = ColorPallate[Object.keys(that.userColorProfile).length];
                // }
            });
            console.log(tempDHArray);
            setSavedDH(tempDHArray);
            // Object.keys(that.userColorProfile).forEach((userName) => {
            //     that.canvas
            //         .select('#user-filter-select')
            //         .append('option')
            //         .attr('value', userName)
            //         .html(userName);
            // });
            // this.renderVisualizationWithDH();
        });
    }, [store.nextDHIndex]);
    var columns = useMemo(function () { return [{ Header: "Type", accessor: 'type' },
        { Header: "ID", accessor: 'id' },
        { Header: "User Name", accessor: 'user' },
        { Header: "Data Label", accessor: 'label' },
        { Header: "Data Hunch Content", accessor: 'content' },
        { Header: "Data Hunch Reasoning", accessor: 'reasoning' },
        { Header: "Confidence Level", accessor: 'confidenceLevel' }]; }, []);
    var _b = useTable({ columns: columns, data: savedDH }, useSortBy), getTableProps = _b.getTableProps, getTableBodyProps = _b.getTableBodyProps, headerGroups = _b.headerGroups, rows = _b.rows, prepareRow = _b.prepareRow;
    return (_jsxs("div", { children: [_jsx(CssBaseline, {}, void 0), _jsxs(MaUTable, __assign({}, getTableProps(), { children: [_jsx(TableHead, { children: headerGroups.map(function (headerGroup) { return (_jsx(TableRow, __assign({}, headerGroup.getHeaderGroupProps(), { children: headerGroup.headers.map(function (column) { return (_jsxs(TableCell, __assign({}, column.getHeaderProps(column.getSortByToggleProps()), { children: [column.render('Header'), _jsx("span", { children: column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : '' }, void 0)] }), void 0)); }) }), void 0)); }) }, void 0), _jsx(TableBody, __assign({}, getTableBodyProps(), { children: rows.map(function (row, i) {
                            prepareRow(row);
                            return (_jsx(TableRow, __assign({}, row.getRowProps(), { children: row.cells.map(function (cell) {
                                    return _jsx(TableCell, __assign({}, cell.getCellProps(), { children: cell.render('Cell') }), void 0);
                                }) }), void 0));
                        }) }), void 0)] }), void 0)] }, void 0));
};
export default observer(Table);
