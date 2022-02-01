import { pointer, select as d3select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { getFirestore, collection, getDocs, Firestore, setDoc, doc } from 'firebase/firestore/lite';
import { Annotations, AnnotationType, BarChartDataPoint, SelectionType } from './types';
import { BrightOrange, ColorPallate, ConfidenceInput, DarkBlue, DarkGray, FirebaseSetup, ForeignObjectHeight, ForeignObjectWidth, IndicatorSize, LargeNumber, LightGray, margin, TransitionDuration } from './Constants';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import 'd3-transition';
import { initializeApp } from "firebase/app";
import * as rough from 'roughjs/bin/rough';

export class BarChartWithDH {
    readonly data: BarChartDataPoint[];
    canvas: SelectionType;
    readonly width: number;
    readonly height: number;
    currentSelectedLabel: string;
    savedDataHunches: Annotations[];
    private showDataHunches: boolean;
    private currentDHID: number;
    private userName: string;
    private datasetName: string;
    private firebase: Firestore;
    // {username : colorString}
    private userColorProfile: any;
    // Add a way to select a DH from the drop down?
    private selectedDataHunch: number | null;

    constructor(datasetName: string, dataInput: BarChartDataPoint[], width: number, height: number, userName: string
    ) {
        this.data = dataInput;
        this.canvas = d3select('#canvas');
        this.width = width;
        this.height = height;
        this.currentSelectedLabel = "";
        this.userColorProfile = {};
        //a button to input user name
        // the name will be associated with the color
        this.userName = userName;
        this.showDataHunches = true;
        this.currentDHID = 0;
        this.selectedDataHunch = null;
        this.firebase = getFirestore(initializeApp(FirebaseSetup));
        this.datasetName = datasetName;
        this.savedDataHunches = [];
    }

    // initiation
    createBarChart() {
        const that = this;

        const controlBar = this.canvas.append('div').attr('id', 'general-controlbar');
        controlBar.style("display", "table")
            .style('border-style', 'groove')
            .style('border-color', LightGray);

        const bandScale = this.makeBandScale();
        const verticalScale = this.makeVerticalScale();

        this.makeGeneralControlPanel(controlBar);

        controlBar.selectAll('button').style('margin', '10px');

        if (!this.userName) {
            controlBar.selectAll('button').attr('disabled', true);
        }
        // get the SVG set up

        this.canvas.append('div')
            .attr('id', 'record-board')
            .style('float', 'right')
            .style('height', '50vh')
            .style('overflow', 'auto')
            .style('background-color', LightGray)
            .style('font-size', 'small')
            .append('dl');

        const svg = this.canvas.append("svg")
            .attr('id', 'svg-canvas')
            .attr("width", this.width)
            .attr("height", this.height);

        // add blur
        // need 5 filters for 5 levels

        svg.selectAll('filter')
            .data(ConfidenceInput)
            .join('filter')
            .attr('id', (d, i) => `blur-filter-${i}`)
            .append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('stdDeviation', (d, i) => (5 - i));




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

        svg.append('g').attr('id', 'sketchy-canvas');

        svg.append('g').attr('id', 'dh-container');

        svg.append('g').attr('id', 'manipulation-layer');

        const detailedControlBar = svg.append('foreignObject')
            .attr('id', 'specific-controlbar-container')
            .attr('x', -1000)
            .attr('y', -1000)
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

        this.makeDetailedControlPanel(detailedControlBar);

        this.canvas.select('#specific-controlbar-container').style('display', 'none !important');

        const tooltipContainer = svg.append('foreignObject')
            .attr('id', 'tooltip-container')
            .attr('x', -1000)
            .attr('y', -1000)
            .attr('width', 100)
            .attr('height', 100)
            .style('display', 'none !important')
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

        //retrieve previously saved DH
        getDocs(collection(this.firebase, this.datasetName))
            .then(result => {
                this.currentDHID = result.size;
                result.forEach((doc) => {
                    that.savedDataHunches.push(doc.data() as Annotations);
                    if (!that.userColorProfile[doc.data().user]) {
                        that.userColorProfile[doc.data().user] = ColorPallate[Object.keys(that.userColorProfile).length];
                    }
                });
                this.generateRecordBoardList();
                this.renderVisualizationWithDH();
            });
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
        this.canvas.select('#specific-controlbar-container').style('display', 'none');
    };

    private selectADataPointEvent = () => {
        const that = this;
        const rectangles = this.canvas.select('#rectangles').selectAll('rect');
        rectangles.attr('cursor', 'pointer')
            .on('click', (e, data: any) => {
                rectangles.attr('fill', DarkBlue);
                rectangles.filter((d: any) => d.label === data.label).attr('fill', BrightOrange);
                //selection for annotation
                that.currentSelectedLabel = data.label;
                const xLoc = (pointer(e)[0] + ForeignObjectWidth) > that.width ? (pointer(e)[0] - ForeignObjectWidth) : pointer(e)[0];
                const yLoc = (pointer(e)[1] + ForeignObjectHeight) > that.height ? (pointer(e)[1] - ForeignObjectHeight) : pointer(e)[1];
                const detailedMenu = that.canvas
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
                that.canvas
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
                    that.canvas.select('#dh-container').selectAll('*').attr('display', null);
                } else {
                    that.canvas.select('#dh-container').selectAll('*').attr('display', 'none');
                }
            });
    }

    private removeRectSelection() {
        this.canvas.select('#rectangles').selectAll('rect').attr('cursor', 'default').on('click', null);
    }

    private addReason(formDiv: SelectionType) {
        formDiv.append('textarea').attr('id', 'reason-field').attr('placeholder', `Add reason for the data hunch`).style('margin', 0);
        const confidenceDiv = formDiv.append('div').attr('id', 'confidence-div');

        confidenceDiv.append('label')
            .attr('for', 'confidence')
            .html('Confidence')
            .style('font', "0.7rem 'Fira Sans', sans-serif");
        confidenceDiv.append('input')
            .attr('id', 'confidence-range')
            .attr('type', 'range')
            .attr('name', 'confidence')
            .attr('list', 'tickmarks')
            .style('vertical-align', 'text-top')
            .attr('min', 0)
            .attr('value', 2)
            .attr('max', 4);

    }

    private findForeignObject(removeAll: boolean) {
        const foreignObjectResult = this.canvas
            .select('#specific-controlbar-container')
            .select('div')
            .select('#specific-controlbar');

        if (removeAll) foreignObjectResult.selectAll('*').remove();

        return foreignObjectResult;
    }

    // Call this method after saving DH

    renderVisualizationWithDH() {
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
            // only show the last 10 data hunches
            this.savedDataHunches.slice(-10).forEach((dataHunch, index) => {
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
                const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
                if (reasonInput) {
                    // save the form input to array
                    that.addNewDataHunch(
                        (form.select('input[name="rating"]:checked').node() as any).value,
                        "annotation",
                        reasonInput,
                        confidenceLevel
                    );
                    //hide the form
                    that.hideInChartForeignObject();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });

        that.addCancelButton(form);

        form.selectChildren('input').style('margin', '5px');
        form.selectChildren('textarea').style('margin', '5px');
    }

    private addDataSpace() {
        const that = this;

        const verticalScale = this.makeVerticalScale();

        const form = this.findForeignObject(true);

        const textfield = form.append('input')
            .attr('type', 'number')
            .attr('step', '0.01')
            .attr('id', 'input-field')
            .style('width', '-webkit-fill-available');
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
                that.canvas.select('#rectangles')
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
                that.canvas
                    .select('#vertical-axis')
                    .transition()
                    .duration(TransitionDuration)
                    //Remove tickValues to remove matching ticks
                    .call((axisLeft(oldVerScale).tickValues(filteredTickArray) as any));

                const newScale = that.canvas
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

                that.canvas
                    .select('#axis-mask').selectAll('*').attr('opacity', 1).transition().duration(TransitionDuration).attr('opacity', 0.0001).remove();

                that.canvas
                    .select('#vertical-axis')
                    .transition()
                    .duration(TransitionDuration)
                    .call((axisLeft(verticalScale) as any));

                that.canvas
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
                const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
                if (reasonInput) {

                    that.canvas
                        .select('#axis-mask').selectAll('*').attr('opacity', 1).transition().duration(TransitionDuration).attr('opacity', 0.0001).remove();

                    that.canvas
                        .select('#vertical-axis')
                        .transition()
                        .duration(TransitionDuration)
                        .call((axisLeft(verticalScale) as any));

                    that.addNewDataHunch(textfield.node()!.value, "data space", reasonInput, confidenceLevel);

                    that.renderVisualizationWithDH();

                    //remove the form
                    that.canvas.select('#vertical-axis').call((axisLeft(verticalScale) as any));
                    that.hideInChartForeignObject();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });

        that.addCancelButton(form);

        form.selectChildren('input').style('margin', '5px');
        form.selectChildren('textarea').style('margin', '5px');
    }


    private manipulation() {
        const that = this;

        const selectedRect = this.canvas.select('#rectangles').selectAll('rect').filter((d: any) => d.label === that.currentSelectedLabel);

        const manipulationLayer = this.canvas.select('#manipulation-layer');

        const heightScale = this.makeVerticalScale();

        const form = this.findForeignObject(true);

        // Instead of making it draggable entire SVG, make a greyed out second rectanlge to be clickable.

        let dragging = false;
        let mouseDown = false;
        let isRange = false;
        let startPoint = 0;
        const dhRect = manipulationLayer.append('rect')
            .attr('class', 'manipulation-new')
            .attr('x', selectedRect.attr('x'))
            .attr('width', selectedRect.attr('width'));
        const dhLine = manipulationLayer.append('line')
            .attr('class', 'manipulation-new')
            .attr('x1', selectedRect.attr('x'))
            .attr('x2', parseFloat(selectedRect.attr('x')) + parseFloat(selectedRect.attr('width')));

        const manipulationRect = manipulationLayer.append('rect');

        manipulationRect.attr('x', parseFloat(selectedRect.attr('x')) - 50)
            .attr('y', margin.top)
            .attr('height', that.height - margin.top - margin.bottom)
            .attr('width', parseFloat(selectedRect.attr('width')) + 100)
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
                    isRange = true;
                } else {
                    dhLine.attr('y1', pointer(e)[1])
                        .attr('y2', pointer(e)[1])
                        .attr('stroke', 'darkred')
                        .attr('stroke-width', '4px');
                    isRange = false;
                }
            });

        this.addReason(form);

        this.addSubmitButton(form)
            .on('click', () => {
                // save the form input to array
                const reasonInput = (form.select('#reason-field') as any).node()!.value;
                const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
                if (reasonInput) {

                    //range
                    if (isRange) {
                        that.addNewDataHunch([heightScale.invert((parseFloat(dhRect.attr('y') as any) + parseFloat(dhRect.attr('height') as any))).toFixed(2), heightScale.invert(dhRect.attr('y') as any).toFixed(2)].toString(), "range", reasonInput, confidenceLevel);
                    }
                    // single value
                    else {
                        that.addNewDataHunch(heightScale.invert((dhLine.attr('y1') as any)).toFixed(2), "manipulations", reasonInput, confidenceLevel);
                    }

                    //remove the form
                    that.canvas.select('#svg-canvas').on('mousedown', null)
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
        form.selectChildren('input').style('margin', '5px');
        form.selectChildren('textarea').style('margin', '5px');
    }


    private addInput() {
        const that = this;

        const form = this.findForeignObject(true);

        const textfield = form.append('input').attr('type', 'text').attr('id', 'input').style('width', '-webkit-fill-available');;


        textfield.attr('placeholder', `Annotation on ${this.currentSelectedLabel ? this.currentSelectedLabel : 'the chart'}`);


        this.addReason(form);

        this.addSubmitButton(form)
            .on('click', () => {
                const reasonInput = (form.select('#reason-field') as any).node()!.value;
                const confidenceLevel = (form.select('#confidence-range') as any).node()!.value;
                if (reasonInput) {
                    // save the form input to  array
                    that.addNewDataHunch(textfield.node()!.value, "annotation", reasonInput, confidenceLevel);
                    //remove the form
                    that.hideInChartForeignObject();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });
        that.addCancelButton(form);

        form.selectChildren('input').style('margin', '5px');
        form.selectChildren('textarea').style('margin', '5px');
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
            recordBoard.append('dd').html(ConfidenceInput[d.confidenceLevel]);
        });
    }

    private async addNewDataHunch(content: string, type: AnnotationType, reasonInput: string, confidenceLevel: number) {

        const newDHObj = {
            label: this.currentSelectedLabel || "all chart",
            user: this.userName,
            content: content,
            type: type,
            id: this.currentDHID,
            reasoning: reasonInput,
            confidenceLevel: confidenceLevel,
        };
        this.savedDataHunches.push(newDHObj);

        const databaseRef = collection(this.firebase, this.datasetName);

        await setDoc(doc(databaseRef, this.currentDHID.toString()), newDHObj);

        this.generateRecordBoardList();
        this.currentDHID += 1;

        this.clearHighlightRect();

        this.canvas.select('#general-controlbar')
            .select('#hunches-dropdown')
            .selectAll('option')
            .data(this.savedDataHunches)
            .join("option")
            .text(d => d.label) // text showed in the menu
            .attr("value", (d, i) => i); // corresponding value returned by the button

        this.renderVisualizationWithDH();
    }

    private clearHighlightRect() {
        this.canvas.select('#rectangles').selectAll('rect').attr('fill', DarkBlue);
    }

    private addCancelButton(formDiv: SelectionType) {
        formDiv.append('input')
            .attr('type', 'button')
            .attr('value', 'Cancel')
            .on('click', () => {
                this.clearHighlightRect();
                this.hideInChartForeignObject();
                this.renderVisualizationWithDH();
                this.canvas.select('#svg-canvas').on('mousedown', null)
                    .on('mousemove', null)
                    .on('mouseup', null);
                this.canvas.select('#manipulation-layer').selectAll('*').remove();
            });
    }

    private addSubmitButton(formDiv: SelectionType) {
        return formDiv.append('input').attr('type', 'button').attr('value', 'Submit');
    }

    private onHoverDH(dhContainer: SelectionType, event: any, data: Annotations) {
        dhContainer.selectAll('*').attr('opacity', 0.3);
        const selectedIndicator = dhContainer.selectAll('*').filter((d: any) => d.id === data.id);
        selectedIndicator.attr('opacity', 1);

        const xLoc = (pointer(event)[0] + 110) > this.width ? (pointer(event)[0] - 110) : pointer(event)[0] + 10;
        const yLoc = (pointer(event)[1] + 110) > this.height ? (pointer(event)[1] - 110) : pointer(event)[1];

        const tooltipContainer = this.canvas.select('#tooltip-container')
            .attr('x', xLoc)
            .attr('y', yLoc)
            .style('display', null)
            .select('#tooltip');

        tooltipContainer.select('#tooltip-title')
            .html(`${data.label} - ${data.content}`);

        tooltipContainer.select('#tooltip-reason')
            .html(data.reasoning);
    }

    setUserName = (newUsername: string) => {
        this.userName = newUsername;
        if (this.userName) {
            this.canvas.select('#general-controlbar').selectAll('button').attr('disabled', null);
        }
        this.renderVisualizationWithDH();
    };
}
