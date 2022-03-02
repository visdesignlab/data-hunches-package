"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewSketch = void 0;
var d3_selection_1 = require("d3-selection");
var d3_shape_1 = require("d3-shape");
var previewSketch = function (sketch) {
    var decodeSketch = JSON.parse(sketch);
    (0, d3_selection_1.select)('#rectangles-preview')
        .selectAll('path')
        .data(decodeSketch)
        .join('path')
        .attr('d', function (d) { return (0, d3_shape_1.line)()(d); })
        .attr('stroke', 'black')
        .attr('fill', 'none');
};
exports.previewSketch = previewSketch;
