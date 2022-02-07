import { pointer, select as d3select, select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { getFirestore, collection, getDocs, Firestore, setDoc, doc } from 'firebase/firestore/lite';
import { Annotations, AnnotationType, BarChartDataPoint, SelectionType } from './types';
import { BrightOrange, ColorPallate, ConfidenceInput, DarkBlue, FirebaseSetup, ForeignObjectHeight, ForeignObjectWidth, LargeNumber, LightGray, margin } from './Constants';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import 'd3-transition';
import { initializeApp } from "firebase/app";
import { manipulation } from './funcs/Manipulation';
import { addDataSpace } from './funcs/DataSpace';
import { renderVisualizationWithDH } from './funcs/RenderVisWithDH';
import { addRating } from './funcs/Ratings';
import { addInput } from './funcs/Annotations';
import { inclusionExclusion } from './funcs/InclusionExclusion';
import { makeGeneralControlPanel } from './funcs/Control/GeneralControlPanel';
import { makeDetailedControlPanel } from './funcs/Control/DetailedControlPanel';

export class BarChartWithDH {
    readonly data: BarChartDataPoint[];
    canvas: SelectionType;
    readonly width: number;
    readonly height: number;
    currentSelectedLabel: string;
    savedDataHunches: Annotations[];
    protected showDataHunches: boolean;
    protected currentDHID: number;
    protected userName: string;
    protected datasetName: string;
    protected firebase: Firestore;
    // {username : colorString}
    protected userColorProfile: any;

    protected selectedUser: string | null;

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
        this.selectedUser = null;
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

        const userFilter = this.canvas.append('div')
            .attr('id', 'record-board')
            .style('float', 'right')
            .style('height', '50vh')
            .style('overflow', 'auto')

            .style('font-size', 'small')
            .append('div');

        userFilter.append('label')
            .html('Filter User to Show')
            .attr('for', 'user-filter');

        userFilter.append('select')
            .attr('name', 'user-filter')
            .attr('id', 'user-filter-select')
            .on('change', (d) => {
                this.selectedUser = that.canvas.select('#user-filter-select').property("value");
                if (this.selectedUser === 'None') this.selectedUser = null;

                this.renderVisualizationWithDH();
            })
            .append('option')
            .attr('value', 'None')
            .html('None');

        this.canvas.select('#record-board').append('dl').style('background-color', LightGray);

        const svg = this.canvas.append("svg")
            .attr('id', 'svg-canvas')
            .attr("width", this.width)
            .attr("height", this.height);

        // add an arrow marker def


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
            .attr('id', 'band-axis')
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

        this.canvas.select('#specific-controlbar-container').style('display', 'none');

        const tooltipContainer = svg.append('foreignObject')
            .attr('id', 'tooltip-container')
            .attr('x', -1000)
            .attr('y', -1000)
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

        tooltipText
            .append('div')
            .attr('id', 'tooltip-author');

        tooltipText
            .append('div')
            .attr('id', 'tooltip-type');

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


                Object.keys(that.userColorProfile).forEach((userName) => {
                    that.canvas
                        .select('#user-filter-select')
                        .append('option')
                        .attr('value', userName)
                        .html(userName);
                });
                this.renderVisualizationWithDH();
            });
    }

    makeBandScale(newInputData?: BarChartDataPoint[]) {
        const that = this;

        if (newInputData) {
            return scaleBand().domain(newInputData.map(d => d.label)).range([margin.left, that.width]).paddingInner(0.1).paddingOuter(0.1);
        }
        return scaleBand().domain(this.data.map(d => d.label)).range([margin.left, that.width]).paddingInner(0.1).paddingOuter(0.1);
    }

    makeVerticalScale(newInputData?: BarChartDataPoint[]) {
        if (newInputData) {
            return scaleLinear()
                .domain([max(newInputData.map(d => d.value)) || LargeNumber, 0])
                .range([margin.top, this.height - margin.bottom]);
        }
        return scaleLinear()
            .domain([max(this.data.map(d => d.value)) || LargeNumber, 0])
            .range([margin.top, this.height - margin.bottom])
            .clamp(true);
    }



    hideInChartForeignObject = () => {
        this.canvas.select('#specific-controlbar-container').style('display', 'none');
    };

    selectADataPointEvent = () => {
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


    //Control Panel Construction

    makeGeneralControlPanel = makeGeneralControlPanel.bind(this);

    makeDetailedControlPanel = makeDetailedControlPanel.bind(this);

    removeRectSelection() {
        this.canvas.select('#rectangles').selectAll('rect').attr('cursor', 'default').on('click', null);
    }

    addReason(formDiv: SelectionType) {
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

    findForeignObject(removeAll: boolean) {
        const foreignObjectResult = this.canvas
            .select('#specific-controlbar-container')
            .select('div')
            .select('#specific-controlbar');

        if (removeAll) foreignObjectResult.selectAll('*').remove();

        return foreignObjectResult;
    }

    // Major Interaction Function

    inclusionExclusion = inclusionExclusion.bind(this);

    addRating = addRating.bind(this);

    manipulation = manipulation.bind(this);

    addDataSpace = addDataSpace.bind(this);



    addInput = addInput.bind(this);

    // Record Related

    generateRecordBoardList() {
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

    renderVisualizationWithDH = renderVisualizationWithDH.bind(this);

    async addNewDataHunch(content: string, type: AnnotationType, reasonInput: string, confidenceLevel: number, label?: string) {

        const newDHObj = {
            label: label ? label : (this.currentSelectedLabel || "all chart"),
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

        this.renderVisualizationWithDH();
    }

    clearHighlightRect() {
        this.canvas.select('#rectangles').selectAll('rect').attr('fill', DarkBlue);
    }

    addCancelButton(formDiv: SelectionType) {
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

    addSubmitButton(formDiv: SelectionType) {
        return formDiv.append('input').attr('type', 'button').attr('value', 'Submit');
    }

    protected onHoverDH(dhContainer: SelectionType, event: any, dataHunch: Annotations) {
        dhContainer.selectAll('*').attr('opacity', 0.3);
        const selectedIndicator = dhContainer.selectAll('*').filter((d: any) => d.id === dataHunch.id);
        selectedIndicator.attr('opacity', 1);

        const xLoc = (pointer(event)[0] + 110) > this.width ? (pointer(event)[0] - 110) : pointer(event)[0] + 10;
        const yLoc = (pointer(event)[1] + 110) > this.height ? (pointer(event)[1] - 110) : pointer(event)[1];

        const tooltipContainer = this.canvas.select('#tooltip-container')
            .attr('x', xLoc)
            .attr('y', yLoc)
            .style('display', null)
            .select('#tooltip');

        tooltipContainer.select('#tooltip-title')
            .html(`${dataHunch.label} - ${dataHunch.content}`);

        tooltipContainer.select('#tooltip-author')
            .html(`- ${dataHunch.user}`);

        tooltipContainer.select('#tooltip-type')
            .html(`${dataHunch.type}`);

        tooltipContainer.select('#tooltip-reason')
            .html(dataHunch.reasoning);
    }

    setUserName = (newUsername: string) => {
        this.userName = newUsername;
        if (this.userName) {
            this.canvas.select('#general-controlbar').selectAll('button').attr('disabled', null);

            if (!Object.keys(this.userColorProfile).includes(newUsername)) {

                this.userColorProfile[newUsername] = ColorPallate[Object.keys(this.userColorProfile).length];

                this.canvas
                    .select('#user-filter-select')
                    .append('option')
                    .attr('value', newUsername)
                    .html(newUsername);
            }
        }
    };

}
