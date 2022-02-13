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
var react_table_1 = require("react-table");
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var Table_1 = __importDefault(require("@material-ui/core/Table"));
var TableBody_1 = __importDefault(require("@material-ui/core/TableBody"));
var TableCell_1 = __importDefault(require("@material-ui/core/TableCell"));
var TableHead_1 = __importDefault(require("@material-ui/core/TableHead"));
var TableRow_1 = __importDefault(require("@material-ui/core/TableRow"));
var Table = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var columns = (0, react_1.useMemo)(function () { return [{ Header: "Type", accessor: 'type' },
        { Header: "ID", accessor: 'id' },
        { Header: "User Name", accessor: 'user' },
        { Header: "Data Label", accessor: 'label' },
        { Header: "Data Hunch Content", accessor: 'content' },
        { Header: "Data Hunch Reasoning", accessor: 'reasoning' },
        { Header: "Confidence Level", accessor: 'confidenceLevel' }]; }, []);
    var _b = (0, react_table_1.useTable)({ columns: columns, data: dataHunchArray }, react_table_1.useSortBy), getTableProps = _b.getTableProps, getTableBodyProps = _b.getTableBodyProps, headerGroups = _b.headerGroups, rows = _b.rows, prepareRow = _b.prepareRow;
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}, void 0), (0, jsx_runtime_1.jsxs)(Table_1.default, __assign({}, getTableProps(), { children: [(0, jsx_runtime_1.jsx)(TableHead_1.default, { children: headerGroups.map(function (headerGroup) { return ((0, jsx_runtime_1.jsx)(TableRow_1.default, __assign({}, headerGroup.getHeaderGroupProps(), { children: headerGroup.headers.map(function (column) { return ((0, jsx_runtime_1.jsxs)(TableCell_1.default, __assign({}, column.getHeaderProps(column.getSortByToggleProps()), { children: [column.render('Header'), (0, jsx_runtime_1.jsx)("span", { children: column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : '' }, void 0)] }), void 0)); }) }), void 0)); }) }, void 0), (0, jsx_runtime_1.jsx)(TableBody_1.default, __assign({}, getTableBodyProps(), { children: rows.map(function (row, i) {
                            prepareRow(row);
                            return ((0, jsx_runtime_1.jsx)(TableRow_1.default, __assign({}, row.getRowProps(), { children: row.cells.map(function (cell) {
                                    return (0, jsx_runtime_1.jsx)(TableCell_1.default, __assign({}, cell.getCellProps(), { children: cell.render('Cell') }), void 0);
                                }) }), void 0));
                        }) }), void 0)] }), void 0)] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(Table);
