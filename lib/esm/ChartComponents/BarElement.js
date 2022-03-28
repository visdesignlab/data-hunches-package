import { jsx as _jsx } from "react/jsx-runtime";
import { pointer, select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { SelectionColor } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
//Make a single bar
//Maybe we should just do on click in here instead of "click" a button
var BarElement = function (_a) {
    var width = _a.width, height = _a.height, xPos = _a.xPos, yPos = _a.yPos, fill = _a.fill, dataElement = _a.dataElement;
    var store = useContext(Store);
    var evaluateHighlight = function () {
        if (!['none', 'manipulations', 'sketch', 'range'].includes(store.inputMode)) {
            return store.selectedDP === dataElement.label ? SelectionColor : 'none';
        }
        return 'none';
    };
    var barElementOnClick = function (e) {
        e.preventDefault();
        if (store.userName && store.inputMode === 'none') {
            store.selectADataPointMode(true);
            store.setCurrentSelectedDP(dataElement.label);
            // const xLoc = (pointer(e)[0] + ControlFOWidth) > store.svgWidth ? (pointer(e)[0] - ControlFOWidth) : pointer(e)[0];
            // const yLoc = (pointer(e)[1] + ControlFOHeight) > store.svgHeight ? (pointer(e)[1] - ControlFOHeight) : pointer(e)[1];
            // const formXLoc = (pointer(e)[0] + DefaultForeignObjectWidth) > store.svgWidth ? (pointer(e)[0] - DefaultForeignObjectWidth) : pointer(e)[0];
            // const formYLoc = (pointer(e)[1] + DefaultForeignObjectHeight) > store.svgHeight ? (pointer(e)[1] - DefaultForeignObjectHeight) : pointer(e)[1];
            var xLoc = pointer(e, select('#app-div').node())[0];
            var yLoc = pointer(e, select('#app-div').node())[1];
            select('#specific-control')
                .style('display', null)
                .style('left', "".concat(xLoc, "px"))
                .style('top', "".concat(yLoc, "px"));
            select('#form-component')
                .style('left', "".concat(xLoc, "px"))
                .style('top', "".concat(yLoc + height, "px"));
            // .attr('x', formXLoc)
            // .attr('y', formYLoc);
        }
    };
    return _jsx("rect", { width: width, height: height, x: xPos, y: yPos, 
        // cursor={store.userName ? 'pointer' : undefined}
        onContextMenu: barElementOnClick, 
        // onClick={(e) => { barElementOnClick(e, true); }}
        // onMouseLeave={() => { store.setHighlightedDH(-1); store.setSelectedDH([]); }}
        fill: fill, strokeWidth: 4, stroke: evaluateHighlight() }, void 0);
};
export default observer(BarElement);
