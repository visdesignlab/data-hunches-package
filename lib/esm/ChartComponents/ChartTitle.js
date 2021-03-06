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
import { Typography, Link } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DarkGray, DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import { DataPreset } from "../Interfaces/Datasets";
import Store from "../Interfaces/Store";
import { ContainerDiv } from "../Interfaces/StyledComponents";
var ChartTitle = function () {
    var store = useContext(Store);
    var placeFormLowerRightCorner = function () {
        select('#form-component')
            .style('left', "".concat(store.svgWidth - DefaultForeignObjectWidth, "px"))
            .style('top', "".concat(store.svgHeight - DefaultForeignObjectHeight, "px"));
        store.setCurrentSelectedDP(undefined);
    };
    return (_jsxs(ContainerDiv, { children: [_jsxs("div", __assign({ style: { display: 'flow-root' } }, { children: [_jsx(Typography, __assign({ style: { fontSize: 'xx-large', color: DarkGray, float: 'left' } }, { children: DataPreset[store.dbTag].name }), void 0), _jsx("div", __assign({ style: { float: 'right', fontSize: 'smaller', } }, { children: _jsx(Link, __assign({ onClick: function () {
                                store.setInputMode('annotation');
                                placeFormLowerRightCorner();
                            } }, { children: "Add an annotation about the chart" }), void 0) }), void 0)] }), void 0), _jsx("div", __assign({ style: { textAlign: 'start', color: DarkGray } }, { children: DataPreset[store.dbTag].explanation }), void 0)] }, void 0));
};
export default observer(ChartTitle);
