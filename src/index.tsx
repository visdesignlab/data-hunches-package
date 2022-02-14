import { createContext, FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BarChart from "./BarChart";
import { BarChartDataPoint, DataHunch } from "./Interfaces/Types";
import Store from "./Interfaces/Store";
import TopBar from "./Controls/TopBar";
import { Grid } from "@material-ui/core";
import Table from "./TableComponents/Table";
import { getDocs, collection } from "firebase/firestore/lite";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";


type Props = {
    dataSet: BarChartDataPoint[];
    datasetName: string;
    svgWidth: number;
    svgHeight: number;
};

export const DataContext = createContext<BarChartDataPoint[]>([]);

const BarChartWithDH: FC<Props> = ({ datasetName, dataSet, svgWidth, svgHeight }: Props) => {
    const store = useContext(Store);

    const [improvedDataSet, setImprovedDataSet] = useState(dataSet);

    useEffect(() => {
        if (dataSet[0].categorical) {
            store.setContainCategory(true);
        }
    }, [dataSet]);

    store.setWidth(svgWidth);
    store.setHeight(svgHeight);
    store.setDataSetName(datasetName);






    const [savedDH, setSavedDH] = useState<DataHunch[]>([]);

    useEffect(() => {
        // Retrieve saved DH from DB
        getDocs(collection(store.firebaseSetup, store.datasetName))
            .then(result => {
                const tempDHArray: DataHunch[] = [];
                store.setNextDHIndex(result.size);
                let copyOfImpDataSet = JSON.parse(JSON.stringify(dataSet));
                result.forEach((doc) => {
                    if (!(doc.data().label === 'all chart')) {
                        if (copyOfImpDataSet.filter((d: any) => d.label === doc.data().label).length === 0) {
                            copyOfImpDataSet.push({
                                label: doc.data().label,
                                value: 0,
                                // categorical?: string;
                                dataHunchArray: [doc.data() as DataHunch]
                            });
                        }
                        else if (copyOfImpDataSet.filter((d: any) => d.label === doc.data().label)[0].dataHunchArray) {
                            copyOfImpDataSet.filter((d: any) => d.label === doc.data().label)[0].dataHunchArray!.push(doc.data() as DataHunch);
                        } else {
                            copyOfImpDataSet.filter((d: any) => d.label === doc.data().label)[0].dataHunchArray = [doc.data() as DataHunch];
                        }
                    }
                    tempDHArray.push(doc.data() as DataHunch);
                });
                setSavedDH(tempDHArray);
                stateUpdateWrapperUseJSON(improvedDataSet, copyOfImpDataSet, setImprovedDataSet);
            });
    }, [store.nextDHIndex]);

    return (
        <DataContext.Provider value={improvedDataSet}>
            <div>
                <TopBar />
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={6} >
                        <BarChart dataHunchArray={savedDH} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Table dataHunchArray={savedDH} />
                    </Grid>
                </Grid>
            </div>
        </DataContext.Provider>
    );
};

export default observer(BarChartWithDH);