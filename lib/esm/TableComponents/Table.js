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
import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import { useState } from "react";
import { useTable, useSortBy } from 'react-table';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Store from "../Interfaces/Store";
import { DataContext } from "..";
import { handlePreviewOnClick, handleResetOnClick } from "../HelperFunctions/PreviewReset";
var Table = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = useContext(Store);
    var _b = useState(false), needReset = _b[0], setNeedReset = _b[1];
    var dataSet = useContext(DataContext);
    var columns = useMemo(function () { return [{ Header: "Type", accessor: 'type' },
        { Header: "ID", accessor: 'id' },
        { Header: "User Name", accessor: 'user' },
        { Header: "Data Label", accessor: 'label' },
        { Header: "Data Hunch Content", accessor: 'content' },
        { Header: "Data Hunch Reasoning", accessor: 'reasoning' },
        { Header: "Confidence Level", accessor: 'confidenceLevel' }]; }, []);
    var rowHoverHandler = function (dataHunch) {
        store.setSelectedDH(dataHunch.id);
        store.setHighlightedDH(dataHunch.id);
        if (dataHunch.type === 'exclusion') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, dataHunch.label, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0);
        }
    };
    var rowOutHandler = function () {
        store.setSelectedDH(-1);
        store.setHighlightedDH(-1);
        if (needReset) {
            store.setNeedToShowPreview(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory.length > 0, store.selectedDP);
        }
    };
    var _c = useTable({ columns: columns, data: dataHunchArray }, useSortBy), getTableProps = _c.getTableProps, getTableBodyProps = _c.getTableBodyProps, headerGroups = _c.headerGroups, rows = _c.rows, prepareRow = _c.prepareRow;
    return (_jsxs("div", __assign({ style: { height: '80vh', overflow: 'auto' } }, { children: [_jsx(CssBaseline, {}, void 0), _jsxs(MaUTable, __assign({}, getTableProps(), { children: [_jsx(TableHead, { children: headerGroups.map(function (headerGroup) { return (_jsx(TableRow, __assign({}, headerGroup.getHeaderGroupProps(), { children: headerGroup.headers.map(function (column) { return (_jsxs(TableCell, __assign({}, column.getHeaderProps(column.getSortByToggleProps()), { children: [column.render('Header'), _jsx("span", { children: column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : '' }, void 0)] }), void 0)); }) }), void 0)); }) }, void 0), _jsx(TableBody, __assign({}, getTableBodyProps(), { children: rows.map(function (row, i) {
                            prepareRow(row);
                            return (_jsx(TableRow, __assign({}, row.getRowProps(), { onMouseOver: function () { rowHoverHandler(row.values); }, style: {
                                    cursor: 'pointer',
                                    background: store.highlightedDH === row.values.id ? 'aliceblue' : undefined
                                }, onMouseOut: rowOutHandler }, { children: row.cells.map(function (cell) {
                                    return _jsx(TableCell, __assign({}, cell.getCellProps(), { children: cell.render('Cell') }), void 0);
                                }) }), void 0));
                        }) }), void 0)] }), void 0)] }), void 0));
};
export default observer(Table);
