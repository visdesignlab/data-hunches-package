import { createContext, FC, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import BarChart from "./BarChart";
import { BarChartDataPoint } from "./Interfaces/Types";
import Store from "./Interfaces/Store";
import TopBar from "./Controls/TopBar";
import { Grid } from "@material-ui/core";
import Table from "./TableComponents/Table";

type Props = {
    dataSet: BarChartDataPoint[];
    datasetName: string;
    svgWidth: number;
    svgHeight: number;
};

export const DataContext = createContext<BarChartDataPoint[]>([]);

const BarChartWithDH: FC<Props> = ({ datasetName, dataSet, svgWidth, svgHeight }: Props) => {
    const store = useContext(Store);

    useEffect(() => {
        if (dataSet[0].categorical) {
            store.setContainCategory(true);
        }
    }, [dataSet]);

    store.setWidthHeight(svgWidth, svgHeight);
    store.setDataSetName(datasetName);

    return (
        <DataContext.Provider value={dataSet}>
            <div>
                <TopBar />
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={6} >
                        <BarChart />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Table />
                    </Grid>
                </Grid>
            </div>
        </DataContext.Provider>
    );
};

export default observer(BarChartWithDH);