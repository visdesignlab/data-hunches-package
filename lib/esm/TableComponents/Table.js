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
import { useMemo } from "react";
import { useTable, useSortBy } from 'react-table';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
var Table = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var columns = useMemo(function () { return [{ Header: "Type", accessor: 'type' },
        { Header: "ID", accessor: 'id' },
        { Header: "User Name", accessor: 'user' },
        { Header: "Data Label", accessor: 'label' },
        { Header: "Data Hunch Content", accessor: 'content' },
        { Header: "Data Hunch Reasoning", accessor: 'reasoning' },
        { Header: "Confidence Level", accessor: 'confidenceLevel' }]; }, []);
    var _b = useTable({ columns: columns, data: dataHunchArray }, useSortBy), getTableProps = _b.getTableProps, getTableBodyProps = _b.getTableBodyProps, headerGroups = _b.headerGroups, rows = _b.rows, prepareRow = _b.prepareRow;
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
