import { create, pointer } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Annotations, BarChartDataPoint, SelectionType } from './types';
import { BrightOrange, ColorPallate, DarkBlue, DarkGray, ForeignObjectHeight, ForeignObjectWidth, IndicatorSize, LargeNumber, LightGray, margin, TransitionDuration } from './Constants';
import { axisBottom, axisLeft } from 'd3-axis';
import { flatRollup, max } from 'd3-array';
import 'd3-transition';
import * as rough from 'roughjs/bin/rough';

export class BarChartWithDH {
    readonly data: BarChartDataPoint[];
    readonly canvas: SelectionType;
    readonly width: number;
    readonly height: number;
    currentSelectedLabel: string;
    savedDataHunches: Annotations[];
    private showDataHunches: boolean;
    private currentDHID: number;
    private userName: string;
    // Add a way to select a DH from the drop down?
    private selectedDataHunch: number | null;

    constructor(dataInput: BarChartDataPoint[], width: number, height: number, userName: string, previousSavedDatahunches?: string
    ) {
        this.data = dataInput;
        this.canvas = create('div');
        this.width = width;
        this.height = height;
        this.currentSelectedLabel = "";
        this.savedDataHunches = previousSavedDatahunches ? JSON.parse(previousSavedDatahunches) : [];
        //a button to input user name
        // the name will be associated with the color
        this.userName = userName;
        this.showDataHunches = true;
        this.currentDHID = 0;
        this.selectedDataHunch = null;
    }

    // initiation
    createBarChart() {
        const that = this;


        // Ask the user name

        const controlBar = this.canvas.append('div').attr('id', 'general-controlbar');
        controlBar.style("display", "table")
            .style('border-style', 'groove')
            .style('border-color', LightGray);

        const bandScale = this.makeBandScale();
        const verticalScale = this.makeVerticalScale();

        this.makeGeneralControlPanel(controlBar);

        controlBar.selectAll('button').style('margin', '10px');

        // get the SVG set up

        this.canvas.append('div')
            .attr('id', 'record-board')
            .style('float', 'right')
            .style('background-color', LightGray)
            .style('font-size', 'small')
            .append('dl');

        this.generateRecordBoardList();

        const svg = this.canvas.append("svg")
            .attr("width", this.width)

            .attr("height", this.height);

        // Construct Scales
        svg.append('g').attr('id', 'rectangles')
            .selectAll("rect")
            .data(this.data)
            .join("rect")
            .attr("x", (d) => (bandScale(d.label) || 0))
            .attr("y", d => verticalScale(d.value))
            .attr("width", bandScale.bandwidth())
            .attr("height", d => that.height - margin.bottom - verticalScale(d.value))
            .attr("fill", DarkBlue);

        // axis
        svg.append('g')
            .attr('class', 'axis')
            .attr("transform", `translate(0,${this.height - margin.bottom})`)
            .call(axisBottom(bandScale));

        svg.append('g')
            .attr('class', 'axis')
            .attr('id', 'axis-mask')
            .attr('transform', `translate(${margin.left},0)`);

        svg.append('g')
            .attr('class', 'axis')
            .attr('id', 'vertical-axis')
            .attr('transform', `translate(${margin.left},0)`)
            .call(axisLeft(verticalScale));



        const detailedControlBar = svg.append('foreignObject')
            .attr('id', 'specific-controlbar-container')
            .attr('x', 0)
            .attr('y', 0)
            .attr('z', 1)
            .attr('width', ForeignObjectWidth)
            .attr('height', ForeignObjectHeight)
            .append('xhtml:div')
            .append('div')
            .attr('id', 'specific-controlbar');

        detailedControlBar
            .style('text-align', 'center')
            .style('background-color', 'rgb(238, 238, 238, 0.8)')
            .style('border-style', 'groove')
            .style('border-color', LightGray);

        const tooltipContainer = svg.append('foreignObject')
            .attr('id', 'tooltip-container')
            .attr('x', 0)
            .attr('y', 0)
            .attr('z', -1)
            .attr('width', 100)
            .attr('height', 100)
            .style('display', 'none')
            .append('xhtml:div');

        const tooltipText = tooltipContainer
            .append('div')
            .attr('id', 'tooltip');

        tooltipText
            .append('div')
            .attr('id', 'tooltip-title');

        tooltipText.append('div').attr('id', 'tooltip-reason');

        tooltipText.selectAll('div')
            .style('background', LightGray)
            .style('padding', '1px');

        this.makeDetailedControlPanel(detailedControlBar);

        this.canvas.select('svg').select('#specific-controlbar-container').style('display', 'none');


        svg.append('g').attr('id', 'svg-canvas');

        svg.append('g').attr('id', 'dh-container');

        svg.append('g').attr('id', 'manipulation-layer');

        return this.canvas;
    }

    private makeBandScale() {
        const that = this;
        return scaleBand().domain(this.data.map(d => d.label)).range([margin.left, that.width]).paddingInner(0.1).paddingOuter(0.1);
    }

    private makeVerticalScale(newInputData?: BarChartDataPoint[]) {
        if (newInputData) {
            return scaleLinear()
                .domain([max(newInputData.map(d => d.value)) || LargeNumber, 0])
                .range([margin.top, this.height - margin.bottom]);
        }
        return scaleLinear()
            .domain([max(this.data.map(d => d.value)) || LargeNumber, 0])
            .range([margin.top, this.height - margin.bottom]);
    }

    private makeDetailedControlPanel(controlBar: SelectionType) {

        // get the control bar set up

        const that = this;

        controlBar.selectAll('*').remove();

        controlBar.append('button')
            .html('Annotation')
            .attr('class', 'dh-button')
            .attr('id', 'dp_annotation_button')
            .on('click', () => {
                that.removeRectSelection();
                that.addInput();

            });

        controlBar.append('button')
            .html('Direct Manipulation')
            .attr('class', 'dh-button')
            .attr('id', 'dp_manipulation_button')
            .on('click', () => {
                that.removeRectSelection();
                that.manipulation();
            });

        controlBar.append('button')
            .html('Rating')
            .attr('id', 'dp_rating_button')
            .attr('class', 'dh-button')
            .on('click', () => {
                that.removeRectSelection();
                that.addRating();
            });

        controlBar.append('button')
            .html('Data Space')
            .attr('id', 'dp_dataspace_button')
            .attr('class', 'dh-button')
            .on('click', () => {
                that.removeRectSelection();
                that.addDataSpace();
            });

        controlBar.selectAll('button').style('margin', '10px').style('width', '150px');
    }

    private hideInChartForeignObject = () => {
        this.canvas.select('svg').select('#specific-controlbar-container').style('display', 'none');
    };

    private selectADataPointEvent = () => {
        const that = this;
        const rectangles = this.canvas.select('svg').select('#rectangles').selectAll('rect');
        rectangles.attr('cursor', 'pointer')
            .on('click', (e, data: any) => {
                rectangles.attr('fill', DarkBlue);
                rectangles.filter((d: any) => d.label === data.label).attr('fill', BrightOrange);
                //selection for annotation
                that.currentSelectedLabel = data.label;
                const xLoc = (pointer(e)[0] + ForeignObjectWidth) > that.width ? (pointer(e)[0] - ForeignObjectWidth) : pointer(e)[0];
                const yLoc = (pointer(e)[1] + ForeignObjectHeight) > that.height ? (pointer(e)[1] - ForeignObjectHeight) : pointer(e)[1];
                const detailedMenu = that.canvas.select('svg')
                    .select('#specific-controlbar-container')
                    .style('display', null)
                    .attr('x', xLoc)
                    .attr('y', yLoc)
                    .select('div')
                    .select('#specific-controlbar');
                that.makeDetailedControlPanel(detailedMenu);
            });
    };

    private makeGeneralControlPanel(controlBar: SelectionType) {

        const that = this;

        controlBar.append('button').html('Annotation').attr('id', 'annotation_button')
            .on('click', () => {
                // telling that there is no selection
                that.currentSelectedLabel = '';
                that.addInput();
                const xLoc = that.width - ForeignObjectWidth;
                const yLoc = that.height - ForeignObjectHeight;
                that.canvas.select('svg')
                    .select('#specific-controlbar-container')
                    .style('display', null)
                    .attr('x', xLoc)
                    .attr('y', yLoc)
                    .select('div')
                    .select('#specific-controlbar');
            });

        controlBar.append('button')
            .html('Select Data Point')
            .attr('id', 'selection_button')
            .on("click", () => {
                that.selectADataPointEvent();
            });

        controlBar.append('select')
            .attr('id', 'hunches-dropdown')
            .selectAll('option')
            .data(this.savedDataHunches)
            .join("option")
            .text(d => d.label) // text showed in the menu
            .attr("value", (d, i) => i); // corresponding value returned by the button

        controlBar.append('button')
            .html(that.showDataHunches ? 'Hide Data Hunches' : 'Show Existing Data Hunches')
            .attr('id', 'toggle-hunches')
            .on('click', () => {
                that.showDataHunches = !that.showDataHunches;

                controlBar.select('#toggle-hunches').html(that.showDataHunches ? 'Hide Data Hunches' : 'Show Existing Data Hunches');

                if (that.showDataHunches) {
                    that.canvas.select('svg').selectAll('.annotation-marker').attr('display', null);
                    that.canvas.select('svg').selectAll('.annotation-rects').attr('display', null);
                } else {
                    that.canvas.select('svg').selectAll('.annotation-marker').attr('display', 'none');
                    that.canvas.select('svg').selectAll('.annotation-rects').attr('display', 'none');
                }
            });
    }

    private removeRectSelection() {
        this.canvas.select('svg').select('#rectangles').selectAll('rect').attr('cursor', 'default').on('click', null);
    }

    private addReason(formDiv: SelectionType) {
        formDiv.append('textarea').attr('id', 'reason-field').attr('placeholder', `Add reason for the data hunch`);

    }

    private findForeignObject(removeAll: boolean) {
        const foreignObjectResult = this.canvas
            .select('svg')
            .select('#specific-controlbar-container')
            .select('div')
            .select('#specific-controlbar');

        if (removeAll) foreignObjectResult.selectAll('*').remove();

        return foreignObjectResult;
    }

    // Call this method after saving DH

    private renderVisualizationWithDH() {

        const verticalScale = this.makeVerticalScale();
        const that = this;

        const bandScale = this.makeBandScale();

        const existingAnnotation: {
            label: string;
            annotaiton: string[];
        }[] = bandScale.domain().map(d => { return { label: d, annotaiton: [] }; });

        existingAnnotation.push({ label: "all chart", annotaiton: [] });

        this.canvas.select('svg').select('#rectangles')
            .selectAll("rect")
            .data(this.data)
            .join("rect")
            .attr("y", d => verticalScale(d.value))
            .attr("height", d => this.height - margin.bottom - verticalScale(d.value))
            .attr("fill", DarkBlue);

        const dhContainer = this.canvas.select('svg').select('#dh-container');

        dhContainer.selectAll('.annotation-marker').remove();
        dhContainer.selectAll('.annotation-rects').remove();

        // Show all existing data hunches

        if (this.showDataHunches) {
            // only show the last 5 data hunches
            this.savedDataHunches.slice(-5).forEach((dataHunch, index) => {
                if (dataHunch.type === "annotation") {
                    // an indicator for annotation data hunches
                    if (dataHunch.label === "all chart") {
                        const currentAnnotationIndex = existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.length;
                        existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.push(dataHunch.content);

                        dhContainer.append('circle')
                            .datum(dataHunch)
                            .attr('class', 'annotation-marker')
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
                            .attr('transform', `translate(0, 25)`);
                    }
                }
                else {
                    // // data space data hunches and Manipulation data hunches
                    dhContainer.append('line')
                        .datum(dataHunch)
                        .attr('class', 'annotation-rects')
                        .attr("x1", (d) => (bandScale(d.label) || 0))
                        .attr("y1", d => verticalScale(parseFloat(d.content)))
                        .attr("y2", d => verticalScale(parseFloat(d.content)))
                        .attr("x2", d => (bandScale(d.label) || 0) + bandScale.bandwidth())
                        .attr('stroke', ColorPallate[index]);

                }
            });
        }

        //tooltip handling
        dhContainer.selectAll('*')
            .attr('cursor', 'pointer')
            .on('mouseover', (e, data: any) => {
                dhContainer.selectAll('*').attr('opacity', 0.3);
                const selectedIndicator = dhContainer.selectAll('*').filter((d: any) => d.id === data.id);
                selectedIndicator.attr('opacity', 1);

                const xLoc = (pointer(e)[0] + 110) > that.width ? (pointer(e)[0] - 110) : pointer(e)[0] + 10;
                const yLoc = (pointer(e)[1] + 110) > that.height ? (pointer(e)[1] - 110) : pointer(e)[1];

                const tooltipContainer = that.canvas.select('svg').select('#tooltip-container')
                    .attr('x', xLoc)
                    .attr('y', yLoc)
                    .style('display', null)
                    .select('#tooltip');

                tooltipContainer.select('#tooltip-title')
                    .html(`${data.label} - ${data.content}`);

                tooltipContainer.select('#tooltip-reason')
                    .html(data.reasoning);

            })
            .on('mouseout', () => {
                that.canvas.select('svg').select('#tooltip-container')
                    .style('display', 'none');
                dhContainer.selectAll('*').attr('opacity', 1);
            });

        //styling all the rectangle indicators and make interactions

        dhContainer.selectAll('.annotation-rects')
            .attr('stroke-width', 6)
            .on('mouseover', (e, data: any) => {

                //TODO draw the whole thing on hover
                if (document.getElementById('svg-canvas') !== null) {
                    const drawingG = document.getElementById('svg-canvas') as any;
                    console.log(rough, rough.default);
                    const rc = rough.default.svg(drawingG);
                    const dhValue = parseFloat(data.content);
                    const sketchyDH = rc.rectangle(bandScale(data.label) || 0, verticalScale(dhValue), bandScale.bandwidth(), this.height - margin.bottom - verticalScale(dhValue), {
                        fill: BrightOrange,
                        stroke: BrightOrange,
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
                that.canvas.select('svg').select('#svg-canvas').selectAll('*').remove();
            });

        // Styling all indicators and make indicator interactions

        dhContainer.selectAll('.annotation-marker')
            .attr('r', IndicatorSize)
            .attr('fill', DarkGray);


    }


    // Major Interaction Function

    private addRating() {

        const that = this;

        const form = this.findForeignObject(true);

        const rateDivs = form.selectAll('.rateDiv')
            .data([1, 2, 3, 4, 5])
            .join('div')
            .attr('class', 'rateDiv')
            .style('flex', ' 1 0 100%');

        rateDivs.append('input')
            .attr('type', 'radio')
            .attr('id', d => `star${d}`)
            .attr('name', 'rating')
            .attr('value', d => `${d} star rating`);

        rateDivs.append('label')
            .attr('for', d => `star${d}`)
            .html(d => '★'.repeat(d));

        this.addReason(form);

        this.addSubmitButton(form)
            .on('click', () => {
                const reasonInput = (form.select('#reason-field') as any).node()!.value;
                if (reasonInput) {
                    // save the form input to array
                    that.addNewDataHunch(
                        (form.select('input[name="rating"]:checked').node() as any).value,
                        "annotation",
                        reasonInput
                    );
                    //hide the form
                    that.hideInChartForeignObject();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });

        that.addCancelButton(form);

        form.selectAll('*').style('margin', '5px');
    }

    private addDataSpace() {
        const that = this;

        const verticalScale = this.makeVerticalScale();

        const form = this.findForeignObject(true);

        const textfield = form.append('input').attr('type', 'number').attr('step', '0.01').attr('id', 'input-field').style('width', '-webkit-fill-available');
        textfield.attr('placeholder', `suggest alternative for ${this.currentSelectedLabel}`);

        form.append('input')
            .attr('type', 'button')
            .attr('value', 'Preview')
            .on('click', () => {
                const newData = that.data.map(d => {
                    if (d.label === this.currentSelectedLabel && textfield.node()) {
                        return { ...d, value: parseFloat(textfield.node()!.value) };
                    } return d;
                });

                const newVertScale = that.makeVerticalScale(newData);
                const oldVerScale = scaleLinear().domain(verticalScale.domain()).range([newVertScale(verticalScale.domain()[0]), newVertScale(verticalScale.domain()[1])]);
                that.canvas.select('svg').select('#rectangles')
                    .selectAll("rect")
                    .data(newData)
                    .join("rect")
                    .transition()
                    .duration(TransitionDuration)
                    .attr("y", d => newVertScale(d.value))
                    .attr("height", d => that.height - margin.bottom - newVertScale(d.value));

                // Matching Ticks Begin
                // domain [0] because it was oposite?
                const filteredTickArray = newVertScale.ticks().filter(d => d <= oldVerScale.domain()[0]);

                //if the domain end is not in the tick array, we add it so it shows up
                if (filteredTickArray.indexOf(oldVerScale.domain()[0]) < 0) filteredTickArray.push(oldVerScale.domain()[0]);

                //Matching Ticks End
                that.canvas.select('svg')
                    .select('#vertical-axis')
                    .transition()
                    .duration(TransitionDuration)
                    //Remove tickValues to remove matching ticks
                    .call((axisLeft(oldVerScale).tickValues(filteredTickArray) as any));

                const newScale = that.canvas.select('svg')
                    .select('#axis-mask')
                    .call(axisLeft(verticalScale) as any)
                    .transition()
                    .duration(TransitionDuration)
                    .call((axisLeft(newVertScale) as any));

                newScale.selectAll('path')
                    .attr('stroke', BrightOrange);
                newScale.selectAll('g').selectAll('line').attr('stroke', BrightOrange);
                newScale.selectAll('g').selectAll('text').attr('fill', BrightOrange);
            });

        form.append('input')
            .attr('type', 'button')
            .attr('value', 'Reset')
            .on('click', () => {
                // somehow .attr('value','') doesn't work.
                if (document.getElementById('input-field') !== null) (document.getElementById('input-field')! as any).value = '';

                textfield.attr('placeholder', `suggest alternative for ${that.currentSelectedLabel}`);

                that.canvas.select('svg')
                    .select('#axis-mask').selectAll('*').attr('opacity', 1).transition().duration(TransitionDuration).attr('opacity', 0.0001).remove();

                that.canvas.select('svg')
                    .select('#vertical-axis')
                    .transition()
                    .duration(TransitionDuration)
                    .call((axisLeft(verticalScale) as any));

                that.canvas.select('svg')
                    .select('#rectangles')
                    .selectAll("rect")
                    .data(that.data)
                    .join("rect")
                    .transition()
                    .duration(TransitionDuration)
                    .attr("y", d => verticalScale(d.value))
                    .attr("height", d => that.height - margin.bottom - verticalScale(d.value));
            });

        this.addReason(form);

        this.addSubmitButton(form)
            .on('click', () => {
                // save the form input to array
                const reasonInput = (form.select('#reason-field') as any).node()!.value;
                if (reasonInput) {

                    that.canvas.select('svg')
                        .select('#axis-mask').selectAll('*').attr('opacity', 1).transition().duration(TransitionDuration).attr('opacity', 0.0001).remove();

                    that.canvas.select('svg')
                        .select('#vertical-axis')
                        .transition()
                        .duration(TransitionDuration)
                        .call((axisLeft(verticalScale) as any));

                    that.addNewDataHunch(textfield.node()!.value, "data space", reasonInput);

                    that.renderVisualizationWithDH();

                    //remove the form
                    that.canvas.select('svg').select('#vertical-axis').call((axisLeft(verticalScale) as any));
                    that.hideInChartForeignObject();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });

        that.addCancelButton(form);

        form.selectAll('*').style('margin', '5px');
    }


    private manipulation() {
        const that = this;

        const selectedRect = this.canvas.select('svg').select('#rectangles').selectAll('rect').filter((d: any) => d.label === that.currentSelectedLabel);

        const manipulationLayer = this.canvas.select('svg')
            .select('#manipulation-layer');

        const heightScale = this.makeVerticalScale();

        const form = this.findForeignObject(true);

        const manipulationRect = manipulationLayer.append('rect');
        // Instead of making it draggable entire SVG, make a greyed out second rectanlge to be clickable.

        let dragging = false;
        let mouseDown = false;
        let startPoint = 0;
        const dhRect = manipulationLayer.append('rect')
            .attr('class', 'manipulation-new')
            .attr('x', selectedRect.attr('x'))
            .attr('width', selectedRect.attr('width'));
        const dhLine = manipulationLayer.append('line')
            .attr('class', 'manipulation-new')
            .attr('x1', selectedRect.attr('x'))
            .attr('x2', parseFloat(selectedRect.attr('x')) + parseFloat(selectedRect.attr('width')));



        manipulationRect.attr('x', selectedRect.attr('x'))
            .attr('y', margin.top)
            .attr('height', that.height - margin.top - margin.bottom)
            .attr('width', selectedRect.attr('width'))
            .attr('fill', LightGray)
            .attr('opacity', 0.5)
            .on('mousedown', (e) => {
                dragging = false;
                mouseDown = true;
                dhRect
                    .attr('fill', 'darkred')
                    .attr('y', pointer(e)[1])
                    .attr('height', 0);
                startPoint = pointer(e)[1];
                dhLine.attr('y1', -20)
                    .attr('y2', -20);
            })
            .on('mousemove', (e, d) => {
                dragging = true;
                if (dragging && mouseDown) {
                    if (startPoint > pointer(e)[1]) {
                        dhRect.attr('height', Math.abs(pointer(e)[1] - startPoint));
                        dhRect.attr('y', pointer(e)[1]);
                    } else {
                        dhRect.attr('height', Math.abs(pointer(e)[1] - startPoint));
                    }
                }
            })
            .on('mouseup', (e, d) => {
                mouseDown = false;
                if (dragging) {
                    // not sure what to do here yet.
                } else {
                    dhLine.attr('y1', pointer(e)[1])
                        .attr('y2', pointer(e)[1])
                        .attr('stroke', 'darkred')
                        .attr('stroke-width', '4px');
                }
            });

        this.addReason(form);

        this.addSubmitButton(form)
            .on('click', () => {
                // save the form input to array
                const reasonInput = (form.select('#reason-field') as any).node()!.value;
                if (reasonInput) {

                    that.addNewDataHunch(heightScale.invert(that.height - margin.bottom - (selectedRect.attr('height') as any)).toFixed(2), "manipulations", reasonInput);

                    //remove the form
                    that.canvas.select('svg').on('mousedown', null)
                        .on('mousemove', null)
                        .on('mouseup', null);
                    that.renderVisualizationWithDH();
                    that.hideInChartForeignObject();

                    //clean up manipulation layer
                    manipulationLayer.selectAll('*').remove();

                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });

        that.addCancelButton(form);

        form.selectAll('*').style('margin', '5px');
    }


    private addInput() {
        const that = this;

        const form = this.findForeignObject(true);

        const textfield = form.append('input').attr('type', 'text').attr('id', 'input');
        if (this.currentSelectedLabel) {
            textfield.attr('placeholder', this.currentSelectedLabel);
        } else {
            textfield.attr('placeholder', 'Annotation on the chart');
        }

        this.addReason(form);

        this.addSubmitButton(form)
            .on('click', () => {
                const reasonInput = (form.select('#reason-field') as any).node()!.value;
                if (reasonInput) {
                    // save the form input to  array
                    that.addNewDataHunch(textfield.node()!.value, "annotation", reasonInput);
                    //remove the form
                    that.hideInChartForeignObject();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });
        that.addCancelButton(form);

        form.selectAll('*').style('margin', '5px');
    }

    // Record Related

    private generateRecordBoardList() {
        const recordBoard = this.canvas.select('#record-board').select('dl');
        recordBoard.selectAll('*').remove();
        this.savedDataHunches.forEach(d => {
            recordBoard.append('dt').html(d.label);
            recordBoard.append('dd').html(d.user);
            recordBoard.append('dd').html(d.content);
            recordBoard.append('dd').html(d.reasoning);
        });
    }

    private addNewDataHunch(content: string, type: "annotation" | "data space" | "manipulations", reasonInput: string) {

        this.savedDataHunches.push({
            label: this.currentSelectedLabel || "all chart",
            user: this.userName,
            content: content,
            type: type,
            id: this.currentDHID,
            reasoning: reasonInput
        });

        //console log all changes to saved DH
        console.log(JSON.stringify(this.savedDataHunches));
        this.generateRecordBoardList();
        this.currentDHID += 1;

        this.clearHighlightRect();

        this.canvas.select('#general-controlbar')
            // .style('display', 'flex')
            .select('#hunches-dropdown')
            .selectAll('option')
            .data(this.savedDataHunches)
            .join("option")
            .text(d => d.label) // text showed in the menu
            .attr("value", (d, i) => i); // corresponding value returned by the button

        this.renderVisualizationWithDH();
    }

    private clearHighlightRect() {
        this.canvas.select('svg').select('#rectangles').selectAll('rect').attr('fill', DarkBlue);
    }

    private addCancelButton(formDiv: SelectionType) {
        formDiv.append('input')
            .attr('type', 'button')
            .attr('value', 'Cancel')
            .on('click', () => {
                this.clearHighlightRect();
                this.hideInChartForeignObject();
                this.renderVisualizationWithDH();
                this.canvas.select('svg').on('mousedown', null)
                    .on('mousemove', null)
                    .on('mouseup', null);
                this.canvas.select('svg').select('#manipulation-layer').selectAll('*').remove();
            });
    }

    private addSubmitButton(formDiv: SelectionType) {
        return formDiv.append('input').attr('type', 'button').attr('value', 'Submit');
    }
}
