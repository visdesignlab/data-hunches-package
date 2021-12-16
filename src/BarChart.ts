import { create, pointer } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Annotations, BarChartDataPoint, SelectionType } from './types';
import { LargeNumber, margin } from './Constants';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';

export class BarChartWithDH {
    readonly data: BarChartDataPoint[];
    readonly canvas: SelectionType;
    readonly width: number;
    readonly height: number;
    currentSelectedLabel: string;
    savedDataHunches: Annotations[];

    constructor(dataInput: BarChartDataPoint[], width: number, height: number) {
        this.data = dataInput;
        this.canvas = create('div');
        this.width = width;
        this.height = height;
        this.currentSelectedLabel = "";
        this.savedDataHunches = [];
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
            .attr("fill", "#00468b")
            .attr("transform", `translate(${margin.left},0)`);

        // axis

        svg.append('g')
            .attr('class', 'axis')
            .attr("transform", `translate(${margin.left},${this.height - margin.bottom})`)
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

        return scaleBand().domain(this.data.map(d => d.label)).range([0, that.width - margin.left]).paddingInner(0.1).paddingOuter(0.1);
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

        formDiv.append('input').attr('type', 'button').attr('value', 'Submit')
            .on('click', () => {
                // save the form input to array
                that.savedDataHunches.push({ label: that.currentSelectedLabel || "all chart", content: (formDiv.select('input[name="rating"]:checked').node() as any).value });
                //remove the form
                that.finishDataPointEntry();
                formDiv.remove();
            });

    }

    private addDataSpace() {
        const that = this;
        this.canvas.select('#input_form').remove();

        const verticalScale = this.makeVerticalScale();

        let rectangles = this.canvas.select('svg').select('#rectangles')
            .selectAll("rect");


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

        form.append('input').attr('type', 'button').attr('value', 'Submit')
            .on('click', () => {
                // save the form input to array
                that.savedDataHunches.push({ label: that.currentSelectedLabel, content: textfield.node()!.value });
                //remove the form
                that.renderWithOriginalData();
                that.canvas.select('svg').select('#vertical-axis').call((axisLeft(verticalScale) as any));
                that.finishDataPointEntry();
                form.remove();
            });
    }

    private removeRectSelection() {
        this.canvas.select('svg').select('#rectangles').selectAll('rect').attr('cursor', 'default').on('click', null);
    }

    private finishDataPointEntry() {
        this.canvas.select('svg').select('#rectangles').selectAll('rect').attr('fill', "#00468b");
        this.canvas.select('#specific-controlbar').style('display', 'none').selectAll('.dh-button').attr('disabled', 'true');
        this.canvas.select('#general-controlbar').style('display', 'table');
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

        //need to save the manipulation data. a submit button perhaps?

        form.append('input').attr('type', 'button').attr('value', 'Submit')
            .on('click', () => {
                // save the form input to array
                // console.log(selectedRect.attr('height'), selectedRect.attr('y'))
                that.savedDataHunches.push(
                    {
                        label: that.currentSelectedLabel || "all chart",
                        content: heightScale.invert(that.height - margin.bottom - (selectedRect.attr('height') as any)).toFixed(2)
                    });
                //remove the form
                that.finishDataPointEntry();
                that.renderWithOriginalData();
                form.remove();
            });
    }


    private addInput() {
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

        const that = this;

        form.append('input').attr('type', 'button').attr('value', 'Submit')
            .on('click', () => {
                // save the form input to array
                that.savedDataHunches.push({ label: that.currentSelectedLabel || "all chart", content: textfield.node()!.value });
                //remove the form
                that.finishDataPointEntry();
                form.remove();
            });
    }

    private renderWithOriginalData() {

        const verticalScale = this.makeVerticalScale();
        this.canvas.select('svg').select('#rectangles')
            .selectAll("rect")
            .data(this.data)
            .join("rect")
            .attr("y", d => verticalScale(d.value))
            .attr("height", d => this.height - margin.bottom - verticalScale(d.value))
            .attr("fill", "#00468b");
    }
}
