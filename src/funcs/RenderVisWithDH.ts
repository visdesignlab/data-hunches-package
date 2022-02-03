import * as rough from 'roughjs/bin/rough';
import { BarChartWithDH } from "../BarChartWithDH";
import { margin, DarkBlue, IndicatorSize, DarkGray } from "../Constants";

export function renderVisualizationWithDH(this: BarChartWithDH) {
    const that = this;

    const verticalScale = this.makeVerticalScale();
    const bandScale = this.makeBandScale();

    const existingAnnotation: {
        label: string;
        annotaiton: string[];
    }[] = bandScale.domain().map(d => { return { label: d, annotaiton: [] }; });

    existingAnnotation.push({ label: "all chart", annotaiton: [] });

    this.canvas.select('#rectangles')
        .selectAll("rect")
        .data(this.data)
        .join("rect")
        .attr("y", d => verticalScale(d.value))
        .attr("height", d => this.height - margin.bottom - verticalScale(d.value))
        .attr("fill", DarkBlue);

    const dhContainer = this.canvas.select('#dh-container');

    dhContainer.selectAll('*').remove();

    // Show all existing data hunches

    if (this.showDataHunches) {
        //remove only show last x.
        this.savedDataHunches.forEach((dataHunch, index) => {
            if (dataHunch.type === "annotation") {
                // an indicator for annotation data hunches
                if (dataHunch.label === "all chart") {
                    const currentAnnotationIndex = existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.length;
                    existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.push(dataHunch.content);

                    dhContainer.append('circle')
                        .datum(dataHunch)
                        .attr('class', 'annotation-marker')
                        .attr('fill', d => that.userColorProfile[d.user])
                        .attr('cx', that.width - (currentAnnotationIndex + 1) * (IndicatorSize * 2 + 4))
                        .attr('cy', IndicatorSize * 2);
                } else {
                    const currentAnnotationIndex = existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.length;
                    existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.push(dataHunch.content);

                    dhContainer.append('circle')
                        .datum(dataHunch)
                        .attr('class', 'annotation-marker')
                        .attr('cx', (0.2 * bandScale.bandwidth()) + (bandScale(dataHunch.label) || 0) + 2 * (IndicatorSize + 4) * (currentAnnotationIndex % 2))
                        .attr('cy', (that.height - margin.bottom) + 2 * (IndicatorSize + 2) * Math.floor(currentAnnotationIndex / 2))
                        .attr('transform', `translate(0, 25)`)
                        .attr('fill', d => that.userColorProfile[d.user]);
                }
            } else if (dataHunch.type === "range") {

                const parsedRange = JSON.parse('[' + dataHunch.content + ']');
                const center = 0.5 * (parsedRange[0] + parsedRange[1]);

                dhContainer.append('rect')
                    .datum(dataHunch)
                    .attr('class', 'annotation-rects')
                    .attr("x", d => bandScale(d.label) || 0)
                    .attr("y", d => (verticalScale(center) - 2))
                    .attr("height", 4)
                    .attr('fill', 'none')
                    .attr("width", bandScale.bandwidth())
                    .attr('stroke-width', 4)
                    .attr('stroke', d => that.userColorProfile[d.user]);
            }
            else {
                // // data space data hunches and Manipulation data hunches

                dhContainer.append('rect')
                    .datum(dataHunch)
                    .attr('class', 'annotation-line')
                    .attr("x", d => bandScale(d.label) || 0)
                    .attr("y", d => (verticalScale(parseFloat(d.content)) - 2))
                    .attr("height", 4)
                    .attr('fill', 'none')
                    .attr("width", bandScale.bandwidth())
                    .attr('stroke-width', 4)
                    .attr('stroke', d => that.userColorProfile[d.user]);
            }
        });
    }

    //tooltip handling
    dhContainer.selectAll('*')
        // .attr('mask', (d: any) => `url(#opacity-gradient-1)`)
        .attr('stroke', (d: any) => that.userColorProfile[d.user])
        // .attr('fill', 'url(#opacity-gradient-1)')
        // .attr('stroke', 'none')
        .attr('cursor', 'pointer')
        .on('mouseover', (e, data: any) => {
            that.onHoverDH(dhContainer, e, data);
        })
        .on('mouseout', () => {
            that.canvas.select('#tooltip-container')
                .style('display', 'none');
            dhContainer.selectAll('*').attr('opacity', 1);
        });

    //styling all the rectangle indicators and make interactions

    dhContainer.selectAll('.annotation-line')
        .on('mouseover', (e, data: any) => {
            that.onHoverDH(dhContainer, e, data);

            if (document.getElementById('sketchy-canvas') !== null) {

                const drawingG = document.getElementById('sketchy-canvas') as any;
                const rc = rough.default.svg(drawingG);
                const dhValue = parseFloat(data.content);
                const sketchyDH = rc.rectangle(bandScale(data.label) || 0, verticalScale(dhValue), bandScale.bandwidth(), this.height - margin.bottom - verticalScale(dhValue), {
                    fill: that.userColorProfile[data.user],
                    stroke: that.userColorProfile[data.user],
                    fillStyle: 'zigzag',
                    roughness: 2.8,
                    hachureAngle: 60,
                    hachureGap: 10,
                    fillWeight: 2,
                    strokeWidth: 2,
                });
                drawingG.appendChild(sketchyDH);
            }
        })
        .on('mouseout', () => {
            that.canvas.select('#sketchy-canvas').selectAll('*').remove();
            that.canvas.select('#tooltip-container').style('display', 'none');
            dhContainer.selectAll('*').attr('opacity', 1);
        });

    //Range

    dhContainer.selectAll('.annotation-rects')
        .on('mouseover', (e, data: any) => {
            that.onHoverDH(dhContainer, e, data);
            const sketchyCanvas = that.canvas.select('#sketchy-canvas');
            //Create the gradient here according to whatever the confidence/fill is

            // Add gradient fade

            const gradient = sketchyCanvas.append('defs')
                .append('linearGradient')
                .attr('id', 'opacity-gradient-1')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', 1);
            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', that.userColorProfile[data.user])
                .attr('stop-opacity', 0.9 - 0.2 * data.confidenceLevel);
            gradient.append('stop')
                .attr('offset', '50%')
                .attr('stop-color', that.userColorProfile[data.user])
                .attr('stop-opacity', 1);
            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', that.userColorProfile[data.user])
                .attr('stop-opacity', 0.9 - 0.2 * data.confidenceLevel);

            const parsedRange = JSON.parse('[' + data.content + ']');
            sketchyCanvas.append('rect')
                .attr('x', d => (bandScale(data.label) || 0))
                .attr('y', verticalScale(parsedRange[0] > parsedRange[1] ? parsedRange[0] : parsedRange[1]))
                .attr('width', bandScale.bandwidth())
                .attr('height', Math.abs(verticalScale(parsedRange[0]) - verticalScale(parsedRange[1])))
                .attr('fill', 'url(#opacity-gradient-1)')
                .attr('stroke', d => that.userColorProfile[data.user]);

        })
        .on('mouseout', () => {
            that.canvas.select('#sketchy-canvas').selectAll('*').remove();
            that.canvas.select('#tooltip-container')
                .style('display', 'none');
            dhContainer.selectAll('*').attr('opacity', 1);
        });

    // Styling all indicators and make indicator interactions

    dhContainer.selectAll('.annotation-marker')
        .attr('r', IndicatorSize)
        .attr('fill', DarkGray);
}