import { jsx as _jsx } from "react/jsx-runtime";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useCallback, useContext, useLayoutEffect, useRef } from "react";
import * as rough from 'roughjs/bin/rough';
import { SelectionColor, DefaultSketchyOptions, HighlightColor, DataHunchColor } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import StyledTooltip from "./StyledTooltip";
import { toVoteDH } from "./UpvotesDownvotes";
var SketchyBar = function (_a) {
    var xPos = _a.xPos, yPos = _a.yPos, width = _a.width, height = _a.height, dataHunch = _a.dataHunch, highlighted = _a.highlighted, selected = _a.selected, valueScaleDomain = _a.valueScaleDomain, valueScaleRange = _a.valueScaleRange;
    var store = useContext(Store);
    var dhRef = useRef(null);
    var valueScale = useCallback(function () {
        return scaleLinear()
            .domain(JSON.parse(valueScaleDomain))
            .range(JSON.parse(valueScaleRange));
    }, [valueScaleDomain, valueScaleRange]);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            select(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            if (dataHunch.type === 'range') {
                var parsedRange = JSON.parse('[' + dataHunch.content + ']');
                var sketchyDH = rc.rectangle(xPos, yPos, width, height, DefaultSketchyOptions);
                var rangePoly = rc.polygon(([
                    [valueScale()(parsedRange[0]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height - 4],
                    [valueScale()(parsedRange[1]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height + 4]
                ]), DefaultSketchyOptions);
                drawingG.appendChild(sketchyDH);
                drawingG.appendChild(rangePoly);
                select(dhRef.current).append('polygon')
                    .attr('points', ([
                    [valueScale()(parsedRange[0]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height - 4],
                    [valueScale()(parsedRange[1]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height + 4]
                ]).toString())
                    .attr('opacity', 0)
                    .attr('fill', 'white')
                    .attr('cursor', 'pointer')
                    .on('mouseover', function () { store.setHighlightedDH(dataHunch.id); })
                    .on('mouseout', function () { store.setHighlightedDH(-1); })
                    .on('click', function () { store.setSelectedDH([dataHunch.id]); });
            }
            else {
                var sketchyDH = rc.rectangle(xPos, yPos, width, height, DefaultSketchyOptions);
                drawingG.appendChild(sketchyDH);
            }
            select(dhRef.current).append('rect')
                .attr('x', xPos)
                .attr('y', yPos)
                .attr('width', width)
                .attr('height', height)
                .attr('opacity', 0)
                .attr('fill', 'white')
                .attr('cursor', 'pointer')
                .on('mouseover', function () { store.setHighlightedDH(dataHunch.id); })
                .on('mouseout', function () { store.setHighlightedDH(-1); })
                .on('click', function () { store.setSelectedDH([dataHunch.id]); });
        }
        ;
    }, [xPos, yPos, width, height]);
    useLayoutEffect(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                select(dhRef.current).selectAll('path').attr('stroke', HighlightColor);
            }
            else if (selected) {
                select(dhRef.current).selectAll('path').attr('stroke', SelectionColor);
            }
            else {
                select(dhRef.current).selectAll('path').attr('stroke', DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return (_jsx(StyledTooltip, { dataHunch: dataHunch, childrenComponent: _jsx("g", { display: store.needToShowPreview ? 'none' : undefined, ref: dhRef, onContextMenu: function (e) {
                toVoteDH(e, store.svgWidth, store.svgHeight, true);
                store.setVotingDH(dataHunch);
            } }, void 0) }, void 0));
};
export default observer(SketchyBar);
