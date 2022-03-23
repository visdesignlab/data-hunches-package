import { createContext, FC, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BarChartDataPoint, DataHunch } from "./Interfaces/Types";
import Store from "./Interfaces/Store";
import TopBar from "./Controls/TopBar";
import { Grid } from "@material-ui/core";
import Table from "./TableComponents/Table";
import { getDocs, collection, getDoc, doc } from "firebase/firestore/lite";
import { stateUpdateWrapperUseJSON } from "./Interfaces/StateChecker";
import { DataPreset, firebaseSetup } from "./Interfaces/Constants";
import BarChart from "./BarChart";
import WelcomeDialog from "./WelcomeDialog";


export const DataContext = createContext<BarChartDataPoint[]>([]);

const BarChartWithDH: FC = () => {

    const store = useContext(Store);

    const [improvedDataSet, setImprovedDataSet] = useState<BarChartDataPoint[]>([]);

    useEffect(() => {
        if (DataPreset[store.dbTag].categories.length > 0) {
            store.setShowCategory(true);
        }
    }, [store.dbTag]);

    const [savedDH, setSavedDH] = useState<DataHunch[]>([]);

    useEffect(() => {
        //first time retrieve DH from DB
        getDoc(doc(firebaseSetup, store.dbTag, `sub${store.currentVol}`)).then((dhNextIndex) => {
            if (dhNextIndex.exists()) {
                store.setNextIndex(dhNextIndex.data().nextIndex);
            } else {
                store.setNextIndex(0);
            }
        });

        getDocs(collection(firebaseSetup, store.dbTag, `sub${store.currentVol}`, 'dhs')).then((dhResult) => {
            store.setTotalDH(dhResult.size);
        });


    }, [store.currentVol]);

    useEffect(() => {
        // Retrieve saved DH from DB
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
    }, [store.numOfDH, store.currentVol, store.dbTag]);

    return (
        <DataContext.Provider value={improvedDataSet}>
            <div>
                <TopBar />
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={6} >
                        <BarChart
                            dataHunchArray={savedDH}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Table dataHunchArray={savedDH} />
                    </Grid>
                </Grid>
                <WelcomeDialog />
            </div>
        </DataContext.Provider>
    );
};

export default observer(BarChartWithDH);