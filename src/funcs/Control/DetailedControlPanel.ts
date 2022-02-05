import { BarChartWithDH } from "../../BarChartWithDH";
import { SelectionType } from "../../types";

export function makeDetailedControlPanel(this: BarChartWithDH, controlBar: SelectionType) {

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