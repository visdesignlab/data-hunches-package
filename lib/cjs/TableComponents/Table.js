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
var react_2 = require("react");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var __1 = require("..");
var data_grid_1 = require("@material-ui/data-grid");
var PreviewReset_1 = require("../HelperFunctions/PreviewReset");
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var PreviewSketch_1 = require("../HelperFunctions/PreviewSketch");
var Table = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = (0, react_1.useContext)(Store_1.default);
    var styles = (0, StyledComponents_1.useStyles)();
    var _b = (0, react_2.useState)(false), needReset = _b[0], setNeedReset = _b[1];
    var dataSet = (0, react_1.useContext)(__1.DataContext);
    var columns = [
        { headerName: "Type", field: 'type', width: 90 },
        { headerName: "Username", field: 'user', width: 115 },
        { headerName: "Label", field: 'label', width: 90 },
        { headerName: "Reasoning", field: 'reasoning', width: 150 },
        { headerName: "Content", field: 'content', width: 150, },
        { headerName: "Confidence Level", field: 'confidenceLevel', }
    ];
    var rowHoverHandler = function (dataHunch) {
        store.setSelectedDH([dataHunch.id]);
        store.setHighlightedDH(dataHunch.id);
        if (dataHunch.type === 'exclusion') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            (0, PreviewReset_1.handlePreviewOnClick)(dataSet, dataHunch.label, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0, undefined);
        }
        else if (dataHunch.type === 'model') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            (0, PreviewReset_1.handlePreviewOnClick)(dataSet, undefined, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0, dataHunch.content);
        }
        else if (dataHunch.type === 'sketch') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            (0, PreviewSketch_1.previewSketch)(dataHunch.content);
        }
    };
    var rowOutHandler = function () {
        store.setSelectedDH([]);
        store.setHighlightedDH(-1);
        if (needReset) {
            store.setNeedToShowPreview(false);
            (0, PreviewReset_1.handleResetOnClick)(dataSet, store.svgHeight, store.svgWidth, store.containCategory.length > 0, store.selectedDP);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: { height: '80vh', overflow: 'auto' } }, { children: (0, jsx_runtime_1.jsx)(data_grid_1.DataGrid, { className: styles.table, onRowEnter: function (d) { rowHoverHandler(d.row); }, onRowOut: rowOutHandler, columns: columns, checkboxSelection: true, onSelectionModelChange: function (d) { store.setSelectedDH(d); }, rows: dataHunchArray }, void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(Table);
