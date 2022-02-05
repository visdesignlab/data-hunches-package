import { BarChartWithDH } from "../../BarChartWithDH";
import { ForeignObjectWidth, ForeignObjectHeight } from "../../Constants";
import { SelectionType } from "../../types";

export function makeGeneralControlPanel(this: BarChartWithDH, controlBar: SelectionType) {

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

    controlBar.append('button')
        .html('Inclusion/Exclusion')
        .attr('id', 'add-ignore')
        .on("click", () => {
            that.inclusionExclusion();
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