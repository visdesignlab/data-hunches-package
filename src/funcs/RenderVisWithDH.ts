import { max } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import * as rough from 'roughjs/bin/rough';
import { BarChartWithDH } from "../BarChartWithDH";
import { margin, DarkBlue, IndicatorSize, DarkGray } from "../Constants";
import { previewFunction, resetPreview } from './PreviewFunction';

export function renderVisualizationWithDH(this: BarChartWithDH) {
    const that = this;

    const verticalScale = this.makeVerticalScale();
    const bandScale = this.makeBandScale();

    const existingAnnotation: {
        label: string;
        annotaiton: string[];
    }[] = bandScale.domain().map(d => { return { label: d, annotaiton: [] }; });

    existingAnnotation.push({ label: "all chart", annotaiton: [] });



    that.canvas.select('#band-axis').call(axisBottom(bandScale) as any);

    that.canvas.select('#vertical-axis').call((axisLeft(verticalScale) as any));

    const dhContainer = this.canvas.select('#dh-container');

    dhContainer.selectAll('*').remove();

    // Show all existing data hunches

    if (this.showDataHunches) {
        //remove only show last x.
        this.savedDataHunches.forEach((dataHunch) => {

            // If there is no filter, or if there is a filter and user name match

            if (!this.selectedUser || this.selectedUser && this.selectedUser === dataHunch.user) {
                switch (dataHunch.type) {
                    case "inclusion":
                    // TODO implementation
                    // Think on how to visualize this
                    // break;

                    case "exclusion":
                    // TODO implementation
                    // animating this would be easy, but how to show these on chart?
                    // Think on how to visualize this
                    // break;
                    case "annotation":
                        if (dataHunch.label === "all chart" || dataHunch.type === "inclusion" || dataHunch.type === "exclusion") {

                            const currentAnnotationIndex = existingAnnotation.filter(d => d.label === "all chart")[0].annotaiton.length;

                            existingAnnotation.filter(d => d.label === "all chart")[0].annotaiton.push(dataHunch.content);

                            const appendedCircle = dhContainer.append('circle')
                                .datum(dataHunch)
                                .attr('class', 'annotation-marker')
                                .attr('fill', d => that.userColorProfile[d.user])
                                .attr('cx', that.width - (currentAnnotationIndex + 1) * (IndicatorSize * 2 + 4))
                                .attr('cy', IndicatorSize * 2);
                            if (dataHunch.type !== 'annotation') {
                                appendedCircle.attr('class', 'inclusion-exclusion');
                            }
                        }
                        else {
                            const currentAnnotationIndex = existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.length;
                            existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.push(dataHunch.content);

                            dhContainer.append('circle')
                                .datum(dataHunch)
                                .attr('class', 'annotation-marker')
                                .classed('dp-annotation-marker', true)
                                .attr('cx', (0.2 * bandScale.bandwidth()) + (bandScale(dataHunch.label) || 0))
                                .attr('cy', (that.height - margin.bottom) + 2 * (IndicatorSize + 2) * Math.floor(currentAnnotationIndex / 2))
                                .attr('transform', `translate(${2 * (IndicatorSize + 4) * (currentAnnotationIndex % 2)}, ${25})`)
                                .attr('fill', d => that.userColorProfile[d.user]);
                        }
                        break;

                    case "range":

                        const parsedRange = JSON.parse('[' + dataHunch.content + ']');
                        const center = 0.5 * (parsedRange[0] + parsedRange[1]);

                        dhContainer.append('rect')
                            .datum(dataHunch)
                            .attr('class', 'annotation-rects')
                            .attr("x", d => bandScale(d.label) || 0)
                            .attr("y", (verticalScale(center) - 2))
                            .attr("height", 4)
                            .attr('fill', 'none')
                            .attr("width", bandScale.bandwidth())
                            .attr('stroke-width', 4)
                            .attr('stroke', d => that.userColorProfile[d.user]);

                        break;

                    // Double case
                    case "data space":
                    case "manipulations":
                        const dhValue = parseFloat(dataHunch.content);
                        const extradhG = dhContainer.append('g').datum(dataHunch).classed('above-axis-indicator', dhValue > max(verticalScale.domain())!);
                        extradhG.append('rect')
                            .datum(dataHunch)
                            .classed('annotation-line', dhValue < max(verticalScale.domain())!)
                            .attr("x", d => bandScale(d.label) || 0)
                            .attr("y", verticalScale(dhValue) - 2)
                            .attr("height", 4)
                            .attr('fill', 'none')
                            .attr("width", bandScale.bandwidth())
                            .attr('stroke-width', 4)
                            .attr('stroke', d => that.userColorProfile[d.user]);
                        if (dhValue > max(verticalScale.domain())!) {

                            extradhG.append('line')
                                .attr('x1', (bandScale(dataHunch.label) || 0) + 0.5 * bandScale.bandwidth())
                                .attr('x2', (bandScale(dataHunch.label) || 0) + 0.5 * bandScale.bandwidth())
                                .attr('y1', verticalScale.range()[0])
                                .attr('y2',
                                    verticalScale.range()[0] - 15)
                                .attr('stroke', that.userColorProfile[dataHunch.user])
                                .attr('stroke-width', 4);
                            extradhG.append('polygon')
                                .attr('transform', `translate(${(bandScale(dataHunch.label) || 0) + 0.5 * bandScale.bandwidth()},${verticalScale.range()[0] - 20})`)
                                .attr('stroke', 'none')
                                .attr('points', '0,0 7,5 -7,5')
                                .attr('fill', that.userColorProfile[dataHunch.user]);

                            // Over axis hover interactions
                            extradhG.on('mouseover', (e) => {
                                previewFunction.bind(that)(dhValue, dataHunch.label);
                                that.onHoverDH(dhContainer, e, dataHunch);
                            }).on('mouseout', () => {
                                resetPreview.bind(that)();
                                that.canvas.select('#tooltip-container')
                                    .style('display', 'none');
                                dhContainer.selectAll('*').attr('opacity', 1);
                            });
                        }
                        break;
                }
            }
        });
    }

    dhContainer.selectAll('*').attr('cursor', 'pointer');

    dhContainer.selectAll('.inclusion-exclusion')
        .attr('r', IndicatorSize)
        .attr('fill', DarkGray)
        .attr('stroke', (d: any) => that.userColorProfile[d.user])
        .on('mouseover', (e, d: any) => {
            previewFunction.bind(that)(d.content === 'ignore' ? undefined : parseFloat(d.content), d.label);
            that.onHoverDH(dhContainer, e, d);
        })
        .on('mouseout', () => {
            resetPreview.bind(that)();
            that.canvas.select('#rectangles')
                .selectAll('rect')
                .attr("fill", (d: any) => this.containCategorical ? ((this.makeCategoricalScale()(d.categorical!) as any) || DarkBlue) : DarkBlue);
            that.canvas.select('#tooltip-container')
                .style('display', 'none');
            dhContainer.selectAll('*').attr('opacity', 1);
        });

    //annotation circle tooltip handling and styling them
    dhContainer.selectAll('.annotation-marker')
        .attr('r', IndicatorSize)
        .attr('fill', DarkGray)
        .attr('stroke', (d: any) => that.userColorProfile[d.user])
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


}

export function restoreRectangles(this: BarChartWithDH) {
    const verticalScale = this.makeVerticalScale();
    const bandScale = this.makeBandScale();
    this.canvas.select('#rectangles')
        .selectAll("rect")
        .data(this.data)
        .join("rect")
        .attr('x', d => bandScale(d.label) || 0)
        .attr('width', bandScale.bandwidth())
        .attr("y", d => verticalScale(d.value))
        .attr("height", d => this.height - margin.bottom - verticalScale(d.value))
        .attr("fill", d => this.containCategorical ? ((this.makeCategoricalScale()(d.categorical!) as any) || DarkBlue) : DarkBlue);
}

