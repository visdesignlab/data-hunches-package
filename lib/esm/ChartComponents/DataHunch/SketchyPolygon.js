import { jsx as _jsx } from "react/jsx-runtime";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useLayoutEffect, useRef } from "react";
import Store from "../../Interfaces/Store";
import * as rough from 'roughjs/bin/rough';
import { HighlightColor, SelectionColor } from "../../Interfaces/Constants";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";
var SketchyPolygon = function (_a) {
    var dataHunch = _a.dataHunch, points = _a.points, fill = _a.fill, opacity = _a.opacity, highlighted = _a.highlighted, selected = _a.selected;
    var dhRef = useRef(null);
    var store = useContext(Store);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyDH = rc.polygon((points), {
                fill: fill,
                stroke: 'white',
                fillStyle: 'zigzag',
                roughness: 2,
                hachureAngle: 5,
                hachureGap: 5,
                fillWeight: 2,
                strokeWidth: 1,
            });
            drawingG.appendChild(sketchyDH);
            //Add a polygon for mouse interaction
            select(dhRef.current).append('polygon')
                .attr('points', points.toString())
                .attr('opacity', 0)
                .attr('fill', 'white')
                .attr('cursor', 'pointer')
                .on('mouseover', function () { store.setHighlightedDH(dataHunch.id); })
                .on('mouseout', function () { store.setHighlightedDH(-1); })
                .on('click', function () { store.setSelectedDH([dataHunch.id]); });
        }
    }, [points, fill]);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll("path[stroke='white'],path[stroke='".concat(SelectionColor, "']")).attr('stroke', HighlightColor);
            }
            else if (selected) {
                select(dhRef.current).selectAll("path[stroke='white'],path[stroke='".concat(HighlightColor, "']")).attr('stroke', SelectionColor);
            }
            else {
                select(dhRef.current).selectAll("path[stroke='".concat(HighlightColor, "'],path[stroke='").concat(SelectionColor, "']")).attr('stroke', "white");
            }
        }
    }, [highlighted, selected]);
    return (_jsx(StyledTooltip, { dataHunch: dataHunch, childrenComponent: _jsx("g", { ref: dhRef, opacity: opacity, onContextMenu: function (e) {
                toVoteDH(e, store.svgWidth, store.svgHeight);
                store.setVotingDH(dataHunch);
            } }, void 0) }, void 0));
};
export default observer(SketchyPolygon);
