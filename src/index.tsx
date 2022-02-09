import { FC, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import BarChart from "./BarChart";
import { BarChartDataPoint } from "./Interfaces/Types";
import Store from "./Interfaces/Store";
import TopBar from "./Controls/TopBar";
import { Grid } from "@material-ui/core";

type Props = {
    dataSet: BarChartDataPoint[];
    svgWidth: number;
    svgHeight: number;
};

const BarChartWithDH: FC<Props> = ({ dataSet, svgWidth, svgHeight }: Props) => {
    const store = useContext(Store);

    useEffect(() => {
        if (dataSet[0].categorical) {
            store.setContainCategory(true);
        }
    }, [dataSet]);

    store.setWidthHeight(svgWidth, svgHeight);

    return <div>
        <TopBar />
        <Grid container spacing={1}>
            <Grid item xs={12} lg={6} >
                <BarChart dataSet={dataSet} />
            </Grid>
            <Grid item xs={12} lg={6}>
                table
            </Grid>
        </Grid>



    </div>;
};

export default observer(BarChartWithDH);