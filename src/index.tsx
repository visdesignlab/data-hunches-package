import { createContext, FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BarChartDataPoint, DataHunch } from "./Interfaces/Types";
import Store from "./Interfaces/Store";
import TopBar from "./Controls/TopBar";
import { Grid } from "@material-ui/core";
import Table from "./TableComponents/Table";
import { getDocs, collection, getDoc, doc } from "firebase/firestore/lite";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import { firebaseSetup, LargeNumber } from "./Interfaces/Constants";
import BarChart from "./BarChart";
import WelcomeDialog from "./WelcomeDialog";
import { DataPreset } from "./Interfaces/Datasets";


export const DataContext = createContext<BarChartDataPoint[]>([]);

const BarChartWithDH: FC = () => {

    const store = useContext(Store);

    const [showTable, setShowTable] = useState(false);

    const makeShowTable = (input: boolean) => {
        setShowTable(input);
    };

    const [improvedDataSet, setImprovedDataSet] = useState<BarChartDataPoint[]>([]);

    useEffect(() => {
        if (DataPreset[store.dbTag].categories.length > 0) {
            store.setShowCategory(true);
        } else {
            store.setShowCategory(false);
        }
    }, [store.dbTag]);

    const [savedDH, setSavedDH] = useState<DataHunch[]>([]);

    useEffect(() => {
        //first time retrieve DH from DB


        getDocs(collection(firebaseSetup, store.dbTag, `sub${store.currentVol}`, 'dhs')).then((dhResult) => {
            store.setTotalDH(dhResult.size);
        });

        getDoc(doc(firebaseSetup, store.dbTag, `sub${store.currentVol}`)).then((dhNextIndex) => {
            if (dhNextIndex.exists() && dhNextIndex.data().nextIndex >= (store.numOfDH - 1)) {
                store.setNextIndex(parseInt(dhNextIndex.data().nextIndex));
            } else if (store.numOfDH === 0) {
                store.setNextIndex(0);
            } else {
                store.setNextIndex(LargeNumber);
            }

        });


    }, [store.currentVol]);

    const retrieveData = () => {
        getDocs(collection(firebaseSetup, store.dbTag, `sub${store.currentVol}`, 'dhs'))
            .then(async result => {
                const tempDHArray: DataHunch[] = [];

                const dataSet = DataPreset[store.dbTag].data;

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
                tempDHArray.sort((a, b) => {
                    return (a.id - b.id);
                });
                setSavedDH(tempDHArray);
                stateUpdateWrapperUseJSON(improvedDataSet, copyOfImpDataSet, setImprovedDataSet);
            });
    };

    useEffect(() => {
        // Retrieve saved DH from DB
        retrieveData();
    }, [store.numOfDH, store.currentVol, store.dbTag]);

    return (
        <DataContext.Provider value={improvedDataSet}>
            <div style={{ height: `calc(100vh - 64px)`, width: '100vw' }} id='app-div' >
                <TopBar showTable={showTable} makeShowTable={makeShowTable} />
                <Grid container style={{ height: `calc(100vh - 64px)`, width: '100vw' }} spacing={1}>
                    <Grid item xs={showTable ? 8 : 12}  >
                        <BarChart
                            dataHunchArray={savedDH}
                            retrieveData={retrieveData}
                            showTable={showTable}
                        />
                    </Grid>
                    {showTable ? <Grid item xs={4} >
                        <Table dataHunchArray={savedDH} />
                    </Grid> : <></>}

                </Grid>
                <WelcomeDialog />
            </div>
        </DataContext.Provider>
    );
};

export default observer(BarChartWithDH);