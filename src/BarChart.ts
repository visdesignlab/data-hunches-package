import { create } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { BarChartDataPoint } from './types';

export function MakeBarChart(dataInput: BarChartDataPoint[],) {
  //   const canvas = create('div');
  //   const controlBar = canvas.append('div').attr('id', 'general-controlbar');
  //   controlBar.style("display", "table").style("background", "#eb9800");;
  //   const specificBar = canvas.append('div').attr('id', 'specific-controlbar');
  //   specificBar.style("display", "none").style("background", "#b87700");

  //   const [verticalScale, bandScale] = makeScales(dataInput);

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
  //     .attr("x", d => bandScale(d.label))
  //     .attr("y", d => verticalScale(d.value))
  //     .attr("width", bandScale.bandwidth())
  //     .attr("height", d => height - margin.bottom - verticalScale(d.value))
  //     .attr("fill", "#00468b")
  //     .attr("transform", `translate(${margin.left},0)`);

  //   // axis

  //   svg.append('g')
  //     .attr('class', 'axis')
  //     .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
  //     .call(d3.axisBottom(bandScale));

  //   svg.append('g')
  //     .attr('class', 'axis')
  //     .attr('id', 'vertical-axis')
  //     .attr('transform', `translate(${margin.left},0)`)
  //     .call(d3.axisLeft(verticalScale));
  // }

  // function makeScales(dataInput: BarChartDataPoint[]) {
  //   const verticalScale = scaleLinear()
  //     .domain([d3.max(dataInput.map(d => d.value)), 0])
  //     .range([margin.top, height - margin.bottom]);

  //   const bandScale = d3.scaleBand().domain(dataInput.map(d => d.label)).range([0, width - margin.left]).paddingInner(0.1).paddingOuter(0.1);

  //   return [verticalScale, bandScale];
}