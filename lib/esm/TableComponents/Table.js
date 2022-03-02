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
import { jsx as _jsx } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { useState } from "react";
import Store from "../Interfaces/Store";
import { DataContext } from "..";
import { DataGrid } from '@material-ui/data-grid';
import { handlePreviewOnClick, handleResetOnClick } from "../HelperFunctions/PreviewReset";
import { useStyles } from "../Interfaces/StyledComponents";
import { previewSketch } from "../HelperFunctions/PreviewSketch";
var Table = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = useContext(Store);
    var styles = useStyles();
    var _b = useState(false), needReset = _b[0], setNeedReset = _b[1];
    var dataSet = useContext(DataContext);
    var columns = [
        { headerName: "Type", field: 'type', width: 90 },
        { headerName: "Username", field: 'user', width: 115 },
        { headerName: "Label", field: 'label', width: 90 },
        { headerName: "Reasoning", field: 'reasoning', width: 150, resizable: true },
        { headerName: "Content", field: 'content', width: 150, resizable: true },
        { headerName: "Confidence Level", field: 'confidenceLevel', }
    ];
    var rowHoverHandler = function (dataHunch) {
        store.setSelectedDH([dataHunch.id]);
        store.setHighlightedDH(dataHunch.id);
        if (dataHunch.type === 'exclusion') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, dataHunch.label, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0, undefined);
        }
        else if (dataHunch.type === 'model') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, undefined, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0, dataHunch.content);
        }
        else if (dataHunch.type === 'sketch') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            previewSketch(dataHunch.content);
        }
    };
    var rowOutHandler = function () {
        store.setSelectedDH([]);
        store.setHighlightedDH(-1);
        if (needReset) {
            store.setNeedToShowPreview(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory.length > 0, store.selectedDP);
        }
    };
    return (_jsx("div", __assign({ style: { height: '80vh', overflow: 'auto' } }, { children: _jsx(DataGrid, { className: styles.table, onRowEnter: function (d) { rowHoverHandler(d.row); }, onRowOut: rowOutHandler, columns: columns, checkboxSelection: true, onSelectionModelChange: function (d) { store.setSelectedDH(d); }, rows: dataHunchArray }, void 0) }), void 0));
};
export default observer(Table);
