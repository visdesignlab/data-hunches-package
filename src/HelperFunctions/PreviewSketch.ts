import { select } from "d3-selection";
import { line } from "d3-shape";

export const previewSketch = (sketch: string) => {

    const decodeSketch = JSON.parse(sketch) as [number, number][][];
    select('#rectangles-preview')
        .selectAll('path')
        .data(decodeSketch)
        .join('path')
        .attr('d', d => line()(d))
        .attr('stroke', 'black')
        .attr('fill', 'none');

};