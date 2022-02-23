import { select } from "d3-selection";
import { line } from "d3-shape";
export var previewSketch = function (sketch) {
    var decodeSketch = JSON.parse(sketch);
    select('#rectangles-preview')
        .selectAll('path')
        .data(decodeSketch)
        .join('path')
        .attr('d', function (d) { return line()(d); })
        .attr('stroke', 'black')
        .attr('fill', 'none');
};
