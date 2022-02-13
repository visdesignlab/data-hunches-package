import { ButtonGroup, Button } from "@material-ui/core";
import { } from "@material-ui/icons";
import { axisLeft, axisBottom } from "d3-axis";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { DataContext } from "..";
import { getRectFill, makeBandScale, makeCategoricalScale, makeVerticalScale } from "../HelperFunctions/ScaleGenerator";
import { BrightOrange, margin, TransitionDuration } from "../Interfaces/Constants";
import 'd3-transition';
import Store from "../Interfaces/Store";
import { BarChartDataPoint } from "../Interfaces/Types";

type Props = {
    labelToPreview: string;
    valueToPreview: number | undefined;
    disableButtons: boolean;
};

const PreviewResetButtons: FC<Props> = ({ labelToPreview, valueToPreview, disableButtons }: Props) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);



    const handlePreviewOnClick = () => {
        // bind the data with all the rectangles first
        // select('#rectangles-preview').selectAll('rect')
        //     .data(dataSet);

        const verticalScale = makeVerticalScale(dataSet, store.svgHeight);
        const bandScale = makeBandScale(dataSet, store.svgWidth);

        // make new data
        const newData = dataSet.map(d => {
            if (d.label === labelToPreview && valueToPreview === undefined) {
                return null;
            }
            else if (d.label === labelToPreview && valueToPreview !== undefined) {
                return { ...d, value: valueToPreview };
            } return d;
        }).filter(d => d) as BarChartDataPoint[];

        if (!bandScale.domain().includes(labelToPreview) && valueToPreview !== undefined) {
            newData.push({ label: labelToPreview, value: valueToPreview });
        }

        const newBandScale = makeBandScale(newData, store.svgWidth);
        const newVertScale = makeVerticalScale(newData, store.svgHeight);

        const oldVerScale = scaleLinear().domain(verticalScale.domain()).range([newVertScale(verticalScale.domain()[0]), newVertScale(verticalScale.domain()[1])]);



        if (valueToPreview === undefined) {

            select('#rectangles-preview')
                .selectAll('rect')
                .filter((d: any) => d.label === labelToPreview)
                .attr('class', 'toremove');
            select('#rectangles-preview')
                .selectAll('.toremove')
                .remove();
        }

        const rectangles = select('#rectangles-preview')
            .selectAll('rect')
            .data(newData)
            .join(
                enter => enter.append('rect')
                    .attr('fill', BrightOrange)
                    .attr('x', d => newBandScale(d.label) || 0)
                    .attr('width', newBandScale.bandwidth())
                    .attr('height', store.svgHeight - margin.bottom - newVertScale(0))
                    .attr('y', newVertScale(0)).selection()
            );

        rectangles.transition()
            .attr('x', d => newBandScale(d.label) || 0)
            .attr('width', newBandScale.bandwidth())
            .duration(TransitionDuration)
            .attr('y', d => newVertScale(d.value))
            .attr('height', d => store.svgHeight - margin.bottom - newVertScale(d.value));

        // moveDH.bind(this)(newBandScale, newVertScale, true);

        // Matching Ticks Begin
        // domain [0] because it was oposite?
        const filteredTickArray = newVertScale.ticks().filter(d => d <= oldVerScale.domain()[0]);

        //if the domain end is not in the tick array, we add it so it shows up
        if (filteredTickArray.indexOf(oldVerScale.domain()[0]) < 0) filteredTickArray.push(oldVerScale.domain()[0]);

        //Matching Ticks End

        select('#vertical-axis')
            .transition()
            .duration(TransitionDuration)
            //Remove tickValues to remove matching ticks
            .call((axisLeft(oldVerScale).tickValues(filteredTickArray) as any));

        const newScale = select('#axis-mask')
            .call(axisLeft(verticalScale) as any)
            .transition()
            .duration(TransitionDuration)
            .call((axisLeft(newVertScale) as any));

        newScale.selectAll('path')
            .attr('stroke', BrightOrange);
        newScale.selectAll('g').selectAll('line').attr('stroke', BrightOrange);
        newScale.selectAll('g').selectAll('text').attr('fill', BrightOrange);

        select('#band-axis').transition().duration(TransitionDuration).call(axisBottom(newBandScale) as any);
    };

    const handleResetOnClick = () => {
        const verticalScale = makeVerticalScale(dataSet, store.svgHeight);
        const bandScale = makeBandScale(dataSet, store.svgWidth);
        const categoricalScale = makeCategoricalScale(dataSet);

        // moveDH.bind(this)(bandScale, verticalScale);

        select('#axis-mask')
            .selectAll('*')
            .interrupt()
            .remove();

        select('#vertical-axis')
            .selectAll('*')
            .interrupt();

        select('#band-axis')
            .selectAll('*')
            .interrupt();

        select('#vertical-axis')
            .call((axisLeft(verticalScale) as any));

        select('#band-axis')
            .interrupt()
            .call(axisBottom(bandScale) as any);

        select('#rectangles-preview')
            .selectAll('rect')
            .interrupt()
            .data(dataSet)
            .join('rect')
            .attr('fill', d => getRectFill(d, store.containCategory, store.selectedDP, categoricalScale))
            .attr('x', (d: any) => bandScale(d.label) || 0)
            .attr('width', bandScale.bandwidth())
            .attr('y', (d: any) => verticalScale(d.value))
            .attr('height', (d: any) => store.svgHeight - margin.bottom - verticalScale(d.value));
    };

    return (<ButtonGroup>
        <Button size='small'
            disabled={disableButtons}
            onClick={handlePreviewOnClick}>
            Preview
        </Button>
        <Button size='small'
            disabled={disableButtons}
            onClick={handleResetOnClick}>
            Reset
        </Button>
    </ButtonGroup>);
};

export default observer(PreviewResetButtons);