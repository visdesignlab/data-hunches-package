import { create, pointer } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Annotations, BarChartDataPoint, SelectionType } from './types';
import { ColorPallate, DarkGray, IndicatorSize, LargeNumber, LightGray, margin } from './Constants';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';

export class BarChartWithDH {
    readonly data: BarChartDataPoint[];
    readonly canvas: SelectionType;
    readonly width: number;
    readonly height: number;
    currentSelectedLabel: string;
    savedDataHunches: Annotations[];
    private showDataHunches: boolean;
    private currentDHID: number;
    // Add a way to select a DH from the drop down?
    private selectedDataHunch: number | null;

    constructor(dataInput: BarChartDataPoint[], width: number, height: number) {
        this.data = dataInput;
        this.canvas = create('div');
        this.width = width;
        this.height = height;
        this.currentSelectedLabel = "";
        this.savedDataHunches = [];
        this.showDataHunches = true;
        this.currentDHID = 0;
        this.selectedDataHunch = null;
    }

    createBarChart() {
        const that = this;

        const controlBar = this.canvas.append('div').attr('id', 'general-controlbar');
        controlBar.style("display", "table").style("background", "#eb9800");;
        const specificBar = this.canvas.append('div').attr('id', 'specific-controlbar');
        specificBar.style("display", "none").style("background", "#b87700");


        const bandScale = this.makeBandScale();
        const verticalScale = this.makeVerticalScale();

        this.makeDetailedControlPanel(specificBar);
        this.makeGeneralControlPanel(controlBar);

        controlBar.selectAll('button').style('margin', '10px');
        specificBar.selectAll('button').style('margin', '10px');

        // get the SVG set up

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
            .attr("fill", "#00468b");

        // axis

        svg.append('g')
            .attr('class', 'axis')
            .attr("transform", `translate(0,${this.height - margin.bottom})`)
            .call(axisBottom(bandScale));

        svg.append('g')
            .attr('class', 'axis')
            .attr('id', 'vertical-axis')
            .attr('transform', `translate(${margin.left},0)`)
            .call(axisLeft(verticalScale));

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

        controlBar.append('button')
            .html('Annotation')
            .attr('class', 'dh-button')
            .attr('id', 'dp_annotation_button')
            .attr('disabled', 'true')
            .on('click', () => {
                that.removeRectSelection();
                that.addInput();
            });

        controlBar.append('button')
            .html('Direct Manipulation')
            .attr('class', 'dh-button')
            .attr('id', 'dp_manipulation_button').attr('disabled', 'true')
            .on('click', () => {
                that.removeRectSelection();
                that.manipulation();
            });

        controlBar.append('button')
            .html('Rating')
            .attr('id', 'dp_rating_button')
            .attr('class', 'dh-button')
            .attr('disabled', 'true')
            .on('click', () => {
                that.removeRectSelection();
                that.addRating();
            });

        controlBar.append('button')
            .html('Data Space')
            .attr('id', 'dp_dataspace_button')
            .attr('disabled', 'true')
            .attr('class', 'dh-button')
            .on('click', () => {
                that.removeRectSelection();
                that.addDataSpace();
            });
    }

    private makeGeneralControlPanel(controlBar: SelectionType) {

        const that = this;

        controlBar.append('button').html('Annotation').attr('id', 'annotation_button')
            .on('click', () => {
                // telling that there is no selection
                that.currentSelectedLabel = '';
                that.addInput();
            });

        controlBar.append('button')
            .html('Select Data Point')
            .attr('id', 'selection_button')
            .on("click", () => {
                that.canvas.select('#specific-controlbar').style('display', 'table');
                controlBar.style('display', 'none');
                const rectangles = that.canvas.select('svg').select('#rectangles').selectAll('rect');
                rectangles.attr('cursor', 'pointer')
                    .on('click', (e, data: any) => {
                        rectangles.attr('fill', "#00468b");
                        rectangles.filter((d: any) => d.label === data.label).attr('fill', "#eb9800");
                        //selection for annotation
                        that.currentSelectedLabel = data.label;
                        that.canvas.select('#specific-controlbar').selectAll('.dh-button').attr('disabled', null);
                    });
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

    private addRating() {
        this.canvas.select('#input_form').remove();
        const that = this;

        const formDiv = this.canvas
            .append('div')
            .attr('id', 'input_form');


        formDiv.attr('class', 'rate').style('display', 'flex').style('flex-wrap', 'wrap');

        const rateDivs = formDiv.selectAll('.rateDiv')
            .data([1, 2, 3, 4, 5])
            .join('div')
            .attr('class', 'rateDiv')
            .style('flex', ' 1 0 20%');

        rateDivs.append('input')
            .attr('type', 'radio')
            .attr('id', d => `star${d}`)
            .attr('name', 'rating')
            .attr('value', d => `${d} star rating`);


        rateDivs.append('label')
            .attr('for', d => `star${d}`)
            .html(d => '★'.repeat(d));

        this.addReason(formDiv);

        formDiv.append('input').attr('type', 'button').attr('value', 'Submit')
            .on('click', () => {
                const reasonInput = (this.canvas.select('#input_form').select('#reason-field') as any).node()!.value;
                if (reasonInput) {

                    // save the form input to array
                    that.addNewDataHunch((formDiv.select('input[name="rating"]:checked').node() as any).value, "annotation", reasonInput);
                    //remove the form
                    formDiv.remove();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });

    }

    private addDataSpace() {
        const that = this;
        this.canvas.select('#input_form').remove();

        const verticalScale = this.makeVerticalScale();

        const form = this.canvas
            .append('div').attr('id', 'input_form')
            .append("form");

        const textfield = form.append('input').attr('type', 'number').attr('step', '0.01').attr('id', 'input-field');
        textfield.attr('placeholder', `suggest alternative for ${this.currentSelectedLabel}`);

        form.append('input').attr('type', 'button').attr('value', 'Preview')
            .on('click', () => {
                const newData = that.data.map(d => {
                    if (d.label === this.currentSelectedLabel && textfield.node()) {
                        return { ...d, value: parseFloat(textfield.node()!.value) };
                    } return d;
                });

                const newVertScale = that.makeVerticalScale(newData);
                that.canvas.select('svg').select('#rectangles')
                    .selectAll("rect")
                    .data(newData)
                    .join("rect")
                    .attr("y", d => newVertScale(d.value))
                    .attr("height", d => that.height - margin.bottom - newVertScale(d.value));

                that.canvas.select('svg').select('#vertical-axis').call((axisLeft(newVertScale) as any));
            });

        form.append('input').attr('type', 'button').attr('value', 'Reset')
            .on('click', () => {
                // somehow .attr('value','') doesn't work.
                if (document.getElementById('input-field') !== null) (document.getElementById('input-field')! as any).value = '';

                textfield.attr('placeholder', `suggest alternative for ${that.currentSelectedLabel}`);

                that.canvas.select('svg').select('#vertical-axis').call((axisLeft(verticalScale) as any));

                that.canvas.select('svg')
                    .select('#rectangles')
                    .selectAll("rect")
                    .data(that.data)
                    .join("rect")
                    .attr("y", d => verticalScale(d.value))
                    .attr("height", d => that.height - margin.bottom - verticalScale(d.value));
            });

        this.addReason(form);

        form.append('input').attr('type', 'button').attr('value', 'Submit')
            .on('click', () => {
                // save the form input to array
                const reasonInput = (this.canvas.select('#input_form').select('#reason-field') as any).node()!.value;
                if (reasonInput) {

                    that.addNewDataHunch(textfield.node()!.value, "data space", reasonInput);

                    //remove the form
                    that.canvas.select('svg').select('#vertical-axis').call((axisLeft(verticalScale) as any));
                    form.remove();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });
    }

    private removeRectSelection() {
        this.canvas.select('svg').select('#rectangles').selectAll('rect').attr('cursor', 'default').on('click', null);
    }

    private manipulation() {
        const that = this;
        let dragging = false;


        const selectedRect = this.canvas.select('svg').select('#rectangles').selectAll('rect').filter((d: any) => d.label === that.currentSelectedLabel);

        const heightScale = this.makeVerticalScale();

        this.canvas.select('#input_form').remove();
        const form = this.canvas
            .append('div').attr('id', 'input_form')
            .append("form");

        this.canvas.select('svg')
            .on('mousedown', () => { dragging = true; })
            .on('mousemove', (e, d) => {
                if (dragging) {
                    selectedRect.attr('y', pointer(e)[1]);
                    selectedRect.attr('height', that.height - margin.bottom - pointer(e)[1]);
                }
            })
            .on('mouseup', () => { dragging = false; });

        this.addReason(form);

        form.append('input').attr('type', 'button').attr('value', 'Submit')
            .on('click', () => {
                // save the form input to array
                const reasonInput = (this.canvas.select('#input_form').select('#reason-field') as any).node()!.value;
                if (reasonInput) {

                    that.addNewDataHunch(heightScale.invert(that.height - margin.bottom - (selectedRect.attr('height') as any)).toFixed(2), "manipulations", reasonInput);

                    //remove the form
                    that.canvas.select('svg').on('mousedown', null)
                        .on('mousemove', null)
                        .on('mouseup', null);
                    form.remove();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });
    }


    private addInput() {
        const that = this;
        this.canvas.select('#input_form').remove();

        const form = this.canvas
            .append('div').attr('id', 'input_form')
            .append("form");

        const textfield = form.append('input').attr('type', 'text').attr('id', 'input');
        if (this.currentSelectedLabel) {
            textfield.attr('placeholder', this.currentSelectedLabel);
        } else {
            textfield.attr('placeholder', 'Annotation on the chart');
        }

        this.addReason(form);



        form.append('input').attr('type', 'button').attr('value', 'Submit')
            .on('click', () => {
                const reasonInput = (this.canvas.select('#input_form').select('#reason-field') as any).node()!.value;
                if (reasonInput) {
                    // save the form input to  array
                    that.addNewDataHunch(textfield.node()!.value, "annotation", reasonInput);
                    //remove the form
                    form.remove();
                } else {
                    alert('Please enter a reason for the data hunch!');
                }
            });
    }

    private addReason(formDiv: SelectionType) {
        formDiv.append('input').attr('type', 'text').attr('id', 'reason-field').attr('placeholder', `Add reason for the data hunch`);
    }

    private addNewDataHunch(content: string, type: "annotation" | "data space" | "manipulations", reasonInput: string) {

        this.savedDataHunches.push({
            label: this.currentSelectedLabel || "all chart",
            content: content,
            type: type,
            id: this.currentDHID,
            reasoning: reasonInput
        });
        this.currentDHID += 1;

        this.canvas.select('svg').select('#rectangles').selectAll('rect').attr('fill', "#00468b");
        this.canvas.select('#specific-controlbar').style('display', 'none').selectAll('.dh-button').attr('disabled', 'true');
        this.canvas.select('#general-controlbar')
            .style('display', 'table')
            .select('#hunches-dropdown')
            .selectAll('option')
            .data(this.savedDataHunches)
            .join("option")
            .text(d => d.label) // text showed in the menu
            .attr("value", (d, i) => i); // corresponding value returned by the button

        this.renderVisualizationWithDH();

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

        const SVGSelection = this.canvas.select('svg');

        SVGSelection.selectAll('.annotation-marker').remove();
        SVGSelection.selectAll('.annotation-rects').remove();

        SVGSelection.select('#rectangles')
            .selectAll("rect")
            .data(this.data)
            .join("rect")
            .attr("y", d => verticalScale(d.value))
            .attr("height", d => this.height - margin.bottom - verticalScale(d.value))
            .attr("fill", "#00468b");

        // Show all existing data hunches

        if (this.showDataHunches) {
            // only show the last 5 data hunches
            this.savedDataHunches.slice(-5).forEach((dataHunch, index) => {
                if (dataHunch.type === "annotation") {
                    // an indicator for annotation data hunches
                    if (dataHunch.label === "all chart") {
                        const currentAnnotationIndex = existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.length;
                        existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.push(dataHunch.content);

                        SVGSelection
                            .append('circle')
                            .datum(dataHunch)
                            .attr('class', 'annotation-marker')
                            .attr('cx', that.width - (currentAnnotationIndex + 1) * (IndicatorSize * 2 + 4))
                            .attr('cy', IndicatorSize * 2);
                    } else {
                        const currentAnnotationIndex = existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.length;
                        existingAnnotation.filter(d => d.label === dataHunch.label)[0].annotaiton.push(dataHunch.content);

                        SVGSelection
                            .append('circle')
                            .datum(dataHunch)
                            .attr('class', 'annotation-marker')
                            .attr('cx', (0.2 * bandScale.bandwidth()) + (bandScale(dataHunch.label) || 0) + 2 * (IndicatorSize + 4) * (currentAnnotationIndex % 2))
                            .attr('cy', (that.height - margin.bottom) + 2 * (IndicatorSize + 2) * Math.floor(currentAnnotationIndex / 2))
                            .attr('transform', `translate(0, 25)`);
                    }
                }
                // else if (dataHunch.type === "data space") {


                // }
                else {
                    // // data space data hunches and Manipulation data hunches
                    SVGSelection.append('rect')
                        .datum(dataHunch)
                        .attr('class', 'annotation-rects')
                        .attr("x", (d) => (bandScale(d.label) || 0))
                        .attr("y", d => verticalScale(parseFloat(d.content)))
                        .attr("width", bandScale.bandwidth())
                        .attr("height", d => that.height - margin.bottom - verticalScale(parseFloat(d.content)))
                        .attr('stroke', ColorPallate[index]);

                }
            });
        }

        //styling all the rectangle indicators and make interactions

        SVGSelection.selectAll('.annotation-rects')
            .attr("fill", "none")
            .attr('cursor', 'pointer')
            .attr('stroke-width', 4)
            .on('mouseover', (event, data: any) => {
                SVGSelection.selectAll('.annotation-marker').attr('opacity', 0.3);
                SVGSelection.selectAll('.annotation-rects').attr('opacity', 0.3);
                const selectedIndicator = SVGSelection.selectAll('.annotation-rects').filter((d: any) => d.id === data.id);
                selectedIndicator.attr('opacity', 1);

                // display the annotation in a
                const foreignObject = SVGSelection.append('foreignObject')
                    .attr('id', 'indicator-text')
                    .attr('x', (parseFloat(selectedIndicator.attr('x')) - 100) < 0 ? parseFloat(selectedIndicator.attr('x')) : (parseFloat(selectedIndicator.attr('x')) - 100))
                    .attr('y', (parseFloat(selectedIndicator.attr('y')) + 110) < that.height ? (parseFloat(selectedIndicator.attr('y')) + 10) : (parseFloat(selectedIndicator.attr('y')) - 100))
                    .attr('z', -1)
                    .attr('width', 100)
                    .attr('height', 100);

                foreignObject.append('xhtml:div')
                    .append('div')
                    .html(`${data.label} - ${data.content}`);

                foreignObject.append('xhtml:div')
                    .append('div')
                    .html(data.reasoning);


                foreignObject.selectAll('div')
                    .style('background', LightGray)
                    .style('padding', '1px');

            })
            .on('mouseout', () => {
                SVGSelection.select('#indicator-text').remove();
                SVGSelection.selectAll('.annotation-marker').attr('opacity', 1);
                SVGSelection.selectAll('.annotation-rects').attr('opacity', 1);
            });

        // Styling all indicators and make indicator interactions

        SVGSelection.selectAll('.annotation-marker')
            .attr('r', IndicatorSize)
            .attr('fill', DarkGray)
            .attr('cursor', 'pointer')
            .on('mouseover', (event, data: any) => {
                SVGSelection.selectAll('.annotation-marker').attr('opacity', 0.3);
                SVGSelection.selectAll('.annotation-rects').attr('opacity', 0.3);
                const selectedIndicator = SVGSelection.selectAll('.annotation-marker').filter((d: any) => d.id === data.id);
                selectedIndicator.attr('opacity', 1);

                // display the annotation in a
                const foreignObject = SVGSelection.append('foreignObject')
                    .attr('id', 'indicator-text')
                    .attr('x', (parseFloat(selectedIndicator.attr('cx')) - 100) < 0 ? parseFloat(selectedIndicator.attr('cx')) : (parseFloat(selectedIndicator.attr('cx')) - 100))
                    .attr('y', (parseFloat(selectedIndicator.attr('cy')) + 100) > that.height ? (parseFloat(selectedIndicator.attr('cy')) - 100) : parseFloat(selectedIndicator.attr('cy')))
                    .attr('z', -1)
                    .attr('width', 100)
                    .attr('height', 100);


                foreignObject.append('xhtml:div')
                    .append('div')
                    .html(`${data.label} - ${data.content}`)
                    .style('background', LightGray);

                foreignObject.append('xhtml:div')
                    .append('div')
                    .html(data.reasoning)
                    .style('background', LightGray);
            })
            .on('mouseout', () => {

                SVGSelection.select('#indicator-text').remove();
                SVGSelection.selectAll('.annotation-marker').attr('opacity', 1);
                SVGSelection.selectAll('.annotation-rects').attr('opacity', 1);

            });
    }


}
