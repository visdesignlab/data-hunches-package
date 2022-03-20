import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo } from "react";
import { FC, useState } from "react";
import { DataHunch } from "../Interfaces/Types";
import Store from "../Interfaces/Store";
import { DataContext } from "..";
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { handlePreviewOnClick, handleResetOnClick } from "../HelperFunctions/PreviewReset";
import { useStyles } from "../Interfaces/StyledComponents";
import { previewSketch } from "../HelperFunctions/PreviewSketch";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import { collection, deleteDoc, doc } from "firebase/firestore/lite";
import { firebaseSetup } from "../Interfaces/Constants";

export type DHProps = {
    dataHunchArray: DataHunch[];
};
const Table: FC<DHProps> = ({ dataHunchArray }: DHProps) => {

    const store = useContext(Store);
    const styles = useStyles();
    interface DHwithDelete extends DataHunch {
        delete: string;
    }

    const [needReset, setNeedReset] = useState(false);
    const [dhWithDelete, setDHWithDelete] = useState<DHwithDelete[]>([]);
    // const [selectionArray, ]

    const dataSet = useContext(DataContext);

    useEffect(() => {
        const tempDHWithDelete = dataHunchArray.map((dataHunch) => {
            if (dataHunch.user === store.userName || dataHunch.user === 'Guest') {
                return { ...dataHunch, delete: 'x' };
            }
            else {
                return { ...dataHunch, delete: ' ' };
            }
        });
        stateUpdateWrapperUseJSON(dhWithDelete, tempDHWithDelete, setDHWithDelete);
    }, [dataHunchArray]);

    const columns: GridColDef[] = [

        { headerName: "Type", field: 'type', width: 90 },
        { headerName: "Username", field: 'user', width: 115 },
        { headerName: "Label", field: 'label', width: 90 },
        { headerName: "Reasoning", field: 'reasoning', width: 150 },
        { headerName: "Content", field: 'content', width: 150, },
        { headerName: "Confidence Level", field: 'confidenceLevel', },
        { headerName: 'Delete', width: 50, field: 'delete' }
    ];


    const rowHoverHandler = (dataHunch: DataHunch) => {
        // store.setSelectedDH([dataHunch.id]);
        store.setHighlightedDH(dataHunch.id);
        if (dataHunch.type === 'exclusion') {
            // setNeedReset(true);
            // store.setNeedToShowPreview(true);
            // handlePreviewOnClick(dataSet, dataHunch.label, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0, undefined);
        } else if (dataHunch.type === 'model') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, undefined, undefined, store.svgHeight, store.svgWidth, store.showCategory, dataHunch.content);
        } else if (dataHunch.type === 'sketch') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            previewSketch(dataHunch.content);
        }
    };

    const rowOutHandler = () => {
        // store.setSelectedDH([]);
        store.setHighlightedDH(-1);
        if (needReset) {
            store.setNeedToShowPreview(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.showCategory, store.selectedDP);
        }
    };

    const deleteDHHandler = (e: any) => {
        if (e.field === 'delete' && e.value === 'x') {
            //https://firebase.google.com/docs/firestore/manage-data/delete-data
            deleteDoc(doc(firebaseSetup, store.dbTag, `sub${store.currentVol}`, 'dhs', e.row.id.toString())).then(output => {
                store.setTotalDH(store.numOfDH - 1);
            }).catch(error => { console.log(error); });
        }
    };



    return (
        <div style={{ height: '80vh', overflow: 'auto' }}>
            <DataGrid
                className={styles.table}
                onRowEnter={(d) => { rowHoverHandler(d.row as DataHunch); }}
                onRowOut={rowOutHandler}
                columns={columns}
                checkboxSelection={true}
                onSelectionModelChange={(d) => { store.setSelectedDH(d as number[]); }}
                selectionModel={store.selectedDH}
                onCellClick={deleteDHHandler}
                rows={dhWithDelete} />
        </div>
    );
};


export default observer(Table);