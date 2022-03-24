"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var d3_scale_1 = require("d3-scale");
var d3_selection_1 = require("d3-selection");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var rough = __importStar(require("roughjs/bin/rough"));
var Constants_1 = require("../../Interfaces/Constants");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var StyledTooltip_1 = __importDefault(require("./StyledTooltip"));
var UpvotesDownvotes_1 = require("./UpvotesDownvotes");
var SketchyBar = function (_a) {
    var xPos = _a.xPos, yPos = _a.yPos, width = _a.width, height = _a.height, dataHunch = _a.dataHunch, highlighted = _a.highlighted, selected = _a.selected, valueScaleDomain = _a.valueScaleDomain, valueScaleRange = _a.valueScaleRange;
    var store = (0, react_1.useContext)(Store_1.default);
    var dhRef = (0, react_1.useRef)(null);
    var valueScale = (0, react_1.useCallback)(function () {
        return (0, d3_scale_1.scaleLinear)()
            .domain(JSON.parse(valueScaleDomain))
            .range(JSON.parse(valueScaleRange));
    }, [valueScaleDomain, valueScaleRange]);
    (0, react_1.useLayoutEffect)(function () {
        if (dhRef.current !== null) {
            (0, d3_selection_1.select)(dhRef.current).selectAll('*').remove();
            var drawingG = dhRef.current;
            var rc = rough.default.svg(drawingG);
            if (dataHunch.type === 'range') {
                var parsedRange = JSON.parse('[' + dataHunch.content + ']');
                var sketchyDH = rc.rectangle(xPos, yPos, width, height, Constants_1.DefaultSketchyOptions);
                var rangePoly = rc.polygon(([
                    [valueScale()(parsedRange[0]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height - 4],
                    [valueScale()(parsedRange[1]), yPos + 0.5 * height],
                    [xPos, yPos + 0.5 * height + 4]
                ]), Constants_1.DefaultSketchyOptions);
                drawingG.appendChild(sketchyDH);
                drawingG.appendChild(rangePoly);
                (0, d3_selection_1.select)(dhRef.current).append('polygon')
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
                var sketchyDH = rc.rectangle(xPos, yPos, width, height, Constants_1.DefaultSketchyOptions);
                drawingG.appendChild(sketchyDH);
            }
            (0, d3_selection_1.select)(dhRef.current).append('rect')
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
    (0, react_1.useLayoutEffect)(function () {
        if (dhRef.current !== null) {
            if (highlighted) {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.HighlightColor);
            }
            else if (selected) {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.SelectionColor);
            }
            else {
                (0, d3_selection_1.select)(dhRef.current).selectAll('path').attr('stroke', Constants_1.DataHunchColor);
            }
        }
    }, [highlighted, selected]);
    return ((0, jsx_runtime_1.jsx)(StyledTooltip_1.default, { dataHunch: dataHunch, childrenComponent: (0, jsx_runtime_1.jsx)("g", { display: store.needToShowPreview ? 'none' : undefined, ref: dhRef, onContextMenu: function (e) {
                (0, UpvotesDownvotes_1.toVoteDH)(e, store.svgWidth, store.svgHeight, true);
                store.setVotingDH(dataHunch);
            } }, void 0) }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(SketchyBar);
