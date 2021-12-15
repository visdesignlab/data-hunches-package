import { create, pointer } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Annotations, BarChartDataPoint, SelectionType } from './types';
import { LargeNumber, margin } from './Constants';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';

export class BarChartWithDH {
    data: BarChartDataPoint[];
    canvas: SelectionType;
    width: number;
    height: number;
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
        const controlBar = this.canvas.append('div').attr('id', 'general-controlbar');
        controlBar.style("display", "table").style("background", "#eb9800");;
        const specificBar = this.canvas.append('div').attr('id', 'specific-controlbar');
        specificBar.style("display", "none").style("background", "#b87700");

        // const [verticalScale, bandScale] = makeScales(dataInput, width);

        const bandScale = this.makeBandScale();
        const verticalScale = this.makeVerticalScale();

        // makeDetailedControlPanel(specificBar);
        // makeGeneralControlPanel(controlBar);



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
            .attr("height", d => this.height - margin.bottom - verticalScale(d.value))
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

        return scaleBand().domain(this.data.map(d => d.label)).range([0, this.width - margin.left]).paddingInner(0.1).paddingOuter(0.1);
    }

    private makeVerticalScale() {
        return scaleLinear()
            .domain([max(this.data.map(d => d.value)) || LargeNumber, 0])
            .range([margin.top, this.height - margin.bottom]);
    }

    //     private makeDetailedControlPanel(controlBar: SelectionType) {

    //         // get the control bar set up

    //         controlBar.append('button')
    //             .html('Annotation')
    //             .attr('class', 'dh-button')
    //             .attr('id', 'dp_annotation_button')
    //             .attr('disabled', 'true')
    //             .on('click', () => {
    //                 removeRectSelection(canvas);
    //                 addInput(canvas);
    //             });

    //         controlBar.append('button')
    //             .html('Direct Manipulation')
    //             .attr('class', 'dh-button')
    //             .attr('id', 'dp_manipulation_button').attr('disabled', 'true')
    //             .on('click', () => {
    //                 removeRectSelection(canvas);
    //                 manipulation(canvas, height, dataInput);
    //             });

    //         controlBar.append('button')
    //             .html('Rating')
    //             .attr('id', 'dp_rating_button')
    //             .attr('class', 'dh-button')
    //             .attr('disabled', 'true')
    //             .on('click', () => {
    //                 removeRectSelection(canvas);
    //                 addRating(canvas);
    //             });

    //         controlBar.append('button')
    //             .html('Data Space')
    //             .attr('id', 'dp_dataspace_button')
    //             .attr('disabled', 'true')
    //             .attr('class', 'dh-button')
    //             .on('click', () => {
    //                 removeRectSelection(canvas);
    //                 addDataSpace(canvas, height, dataInput);
    //             });
    //     }

    // private makeGeneralControlPanel(controlBar: SelectionType, canvas: SelectionType) {


    //     controlBar.append('button').html('Annotation').attr('id', 'annotation_button')
    //         .on('click', () => {
    //             // telling that there is no selection
    //             currentSelectLabel = '';
    //             addInput(canvas);
    //         });

    //     controlBar.append('button')
    //         .html('Select Data Point')
    //         .attr('id', 'selection_button')
    //         .on("click", () => {
    //             canvas.select('#specific-controlbar').style('display', 'table');
    //             controlBar.style('display', 'none');
    //             const rectangles = canvas.select('svg').select('#rectangles').selectAll('rect');
    //             rectangles.attr('cursor', 'pointer')
    //                 .on('click', (e, data: any) => {
    //                     rectangles.attr('fill', "#00468b");
    //                     rectangles.filter((d: any) => d.label === data.label).attr('fill', "#eb9800");
    //                     //selection for annotation
    //                     currentSelectLabel = data.label;
    //                     canvas.select('#specific-controlbar').selectAll('.dh-button').attr('disabled', null);
    //                 });

    //         });
    // }
}

// export function MakeBarChart(dataInput: BarChartDataPoint[], width: number, height: number) {
//   const canvas = create('div');
//   const controlBar = canvas.append('div').attr('id', 'general-controlbar');
//   controlBar.style("display", "table").style("background", "#eb9800");;
//   const specificBar = canvas.append('div').attr('id', 'specific-controlbar');
//   specificBar.style("display", "none").style("background", "#b87700");

//   // const [verticalScale, bandScale] = makeScales(dataInput, width);

//   const bandScale = makeBandScale(dataInput, width);
//   const verticalScale = makeVerticalScale(dataInput, height);

//   makeDetailedControlPanel(specificBar, canvas, height, dataInput);
//   makeGeneralControlPanel(controlBar, canvas);



//   controlBar.selectAll('button').style('margin', '10px');
//   specificBar.selectAll('button').style('margin', '10px');

//   // get the SVG set up

//   const svg = canvas.append("svg")
//     .attr("width", width)
//     .attr("height", height);

//   // Construct Scales

//   svg.append('g').attr('id', 'rectangles')
//     .selectAll("rect")
//     .data(dataInput)
//     .join("rect")
//     .attr("x", (d) => (bandScale(d.label) || 0))
//     .attr("y", d => verticalScale(d.value))
//     .attr("width", bandScale.bandwidth())
//     .attr("height", d => height - margin.bottom - verticalScale(d.value))
//     .attr("fill", "#00468b")
//     .attr("transform", `translate(${margin.left},0)`);

//   // axis

//   svg.append('g')
//     .attr('class', 'axis')
//     .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
//     .call(axisBottom(bandScale));

//   svg.append('g')
//     .attr('class', 'axis')
//     .attr('id', 'vertical-axis')
//     .attr('transform', `translate(${margin.left},0)`)
//     .call(axisLeft(verticalScale));
// }



// function addRating(canvas: SelectionType) {
//   canvas.select('#input_form').remove();

//   const currentLabel = currentSelectLabel[currentSelectLabel.length - 1];
//   const formDiv = canvas
//     .append('div').attr('id', 'input_form');

//   formDiv.attr('class', 'rate').style('display', 'flex').style('flex-wrap', 'wrap');

//   const rateDivs = formDiv.selectAll('.rateDiv')
//     .data([1, 2, 3, 4, 5])
//     .join('div')
//     .attr('class', 'rateDiv')
//     .style('flex', ' 1 0 20%');

//   rateDivs.append('input')
//     .attr('type', 'radio')
//     .attr('id', d => `star${d}`)
//     .attr('name', 'rating')
//     .attr('value', d => `${d} star rating`);


//   rateDivs.append('label')
//     .attr('for', d => `star${d}`)
//     .html(d => '★'.repeat(d));

//   formDiv.append('input').attr('type', 'button').attr('value', 'Submit')
//     .on('click', () => {
//       // save the form input to array
//       arrayToSaveValue.push({ label: currentLabel || "all chart", content: (formDiv.select('input[name="rating"]:checked').node() as any).value });
//       //remove the form
//       finishDataPointEntry(canvas);
//       formDiv.remove();
//     });

// }


// function makeDetailedControlPanel(controlBar: SelectionType, canvas: SelectionType, height: number, dataInput: BarChartDataPoint[]) {

//   // get the control bar set up

//   controlBar.append('button')
//     .html('Annotation')
//     .attr('class', 'dh-button')
//     .attr('id', 'dp_annotation_button')
//     .attr('disabled', 'true')
//     .on('click', () => {
//       removeRectSelection(canvas);
//       addInput(canvas);
//     });

//   controlBar.append('button')
//     .html('Direct Manipulation')
//     .attr('class', 'dh-button')
//     .attr('id', 'dp_manipulation_button').attr('disabled', 'true')
//     .on('click', () => {
//       removeRectSelection(canvas);
//       manipulation(canvas, height, dataInput);
//     });

//   controlBar.append('button')
//     .html('Rating')
//     .attr('id', 'dp_rating_button')
//     .attr('class', 'dh-button')
//     .attr('disabled', 'true')
//     .on('click', () => {
//       removeRectSelection(canvas);
//       addRating(canvas);
//     });

//   controlBar.append('button')
//     .html('Data Space')
//     .attr('id', 'dp_dataspace_button')
//     .attr('disabled', 'true')
//     .attr('class', 'dh-button')
//     .on('click', () => {
//       removeRectSelection(canvas);
//       addDataSpace(canvas, height, dataInput);
//     });
// }

// function makeGeneralControlPanel(controlBar: SelectionType, canvas: SelectionType) {


//   controlBar.append('button').html('Annotation').attr('id', 'annotation_button')
//     .on('click', () => {
//       // telling that there is no selection
//       currentSelectLabel = '';
//       addInput(canvas);
//     });

//   controlBar.append('button')
//     .html('Select Data Point')
//     .attr('id', 'selection_button')
//     .on("click", () => {
//       canvas.select('#specific-controlbar').style('display', 'table');
//       controlBar.style('display', 'none');
//       const rectangles = canvas.select('svg').select('#rectangles').selectAll('rect');
//       rectangles.attr('cursor', 'pointer')
//         .on('click', (e, data: any) => {
//           rectangles.attr('fill', "#00468b");
//           rectangles.filter((d: any) => d.label === data.label).attr('fill', "#eb9800");
//           //selection for annotation
//           currentSelectLabel = data.label;
//           canvas.select('#specific-controlbar').selectAll('.dh-button').attr('disabled', null);
//         });

//     });
// }

// function removeRectSelection(canvas: SelectionType) {
//   canvas.select('svg').select('#rectangles').selectAll('rect').attr('cursor', 'default').on('click', null);
// }

// function finishDataPointEntry(canvas: SelectionType) {
//   canvas.select('svg').select('#rectangles').selectAll('rect').attr('fill', "#00468b");
//   canvas.select('#specific-controlbar').style('display', 'none').selectAll('.dh-button').attr('disabled', 'true');
//   canvas.select('#general-controlbar').style('display', 'table');
// }

// function manipulation(canvas: SelectionType, width: number, height: number, dataInput: BarChartDataPoint[]) {
//   const currentLabel = currentSelectLabel[currentSelectLabel.length - 1];
//   let dragging = false;
//   const selectedRect = canvas.select('svg').select('#rectangles').selectAll('rect').filter(d => d.label === currentLabel);

//   const heightScale = makeVerticalScale(dataInput, height);
//   const bandScale = makeBandScale(dataInput, width);

//   canvas.select('#input_form').remove();
//   const form = canvas
//     .append('div').attr('id', 'input_form')
//     .append("form");

//   canvas.select('svg')
//     .on('mousedown', () => { dragging = true; })
//     .on('mousemove', (e, d) => {
//       if (dragging) {
//         selectedRect.attr('y', pointer(e)[1]);
//         selectedRect.attr('height', height - margin.bottom - pointer(e)[1]);
//       }
//     })
//     .on('mouseup', () => { dragging = false; });

//   //need to save the manipulation data. a submit button perhaps?

//   form.append('input').attr('type', 'button').attr('value', 'Submit')
//     .on('click', () => {
//       // save the form input to array
//       // console.log(selectedRect.attr('height'), selectedRect.attr('y'))
//       arrayToSaveValue.push({label:currentLabel || "all chart", content:heightScale.invert(height - margin.bottom - selectedRect.attr('height')).toFixed(2)});
//       //remove the form
//       finishDataPointEntry(canvas);
//       renderWithOriginalData(dataInput, canvas, height, heightScale);
//       form.remove();
//     });
// }

// function addInput(canvasInput: SelectionType) {
//   canvasInput.select('#input_form').remove();

//   const currentLabel = currentSelectLabel[currentSelectLabel.length - 1];
//   const form = canvasInput
//     .append('div').attr('id', 'input_form')
//     .append("form");

//   const textfield = form.append('input').attr('type', 'text').attr('id', 'input');
//   if (currentLabel) {
//     textfield.attr('placeholder', currentLabel);
//   } else {
//     textfield.attr('placeholder', 'Annotation on the chart');
//   }

//   form.append('input').attr('type', 'button').attr('value', 'Submit')
//     .on('click', () => {
//       // save the form input to array
//       arrayToSaveValue.push({ label: currentLabel || "all chart", content: textfield.node().value });
//       //remove the form
//       finishDataPointEntry(canvasInput);
//       form.remove();
//     });
// }

// let currentSelectLabel = "";

// let arrayToSaveValue: Annotations[] = [];

// export const getArray = () => arrayToSaveValue;