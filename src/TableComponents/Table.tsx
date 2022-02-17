import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import { FC, useState } from "react";
import { DataHunch } from "../Interfaces/Types";
import Store from "../Interfaces/Store";
import { DataContext } from "..";
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { handlePreviewOnClick, handleResetOnClick } from "../HelperFunctions/PreviewReset";

export type DHProps = {
    dataHunchArray: DataHunch[];
};
const Table: FC<DHProps> = ({ dataHunchArray }: DHProps) => {

    const store = useContext(Store);

    const [needReset, setNeedReset] = useState(false);

    const dataSet = useContext(DataContext);

    const columns: GridColDef[] = [
        { headerName: "Type", field: 'type' },
        { headerName: "ID", field: 'id' },
        { headerName: "User Name", field: 'user' },
        { headerName: "Data Label", field: 'label' },
        { headerName: "Data Hunch Content", field: 'content' },
        { headerName: "Data Hunch Reasoning", field: 'reasoning' },
        { headerName: "Confidence Level", field: 'confidenceLevel' }
    ];


    const rowHoverHandler = (dataHunch: DataHunch) => {
        store.setSelectedDH(dataHunch.id);
        store.setHighlightedDH(dataHunch.id);
        if (dataHunch.type === 'exclusion') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, dataHunch.label, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0);
        }
    };

    const rowOutHandler = () => {
        store.setSelectedDH(-1);
        store.setHighlightedDH(-1);
        if (needReset) {
            store.setNeedToShowPreview(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory.length > 0, store.selectedDP);
        }
    };



    return (
        <div style={{ height: '80vh', overflow: 'auto' }}>
            <DataGrid
                onRowEnter={(d) => { rowHoverHandler(d.row as DataHunch); }}
                onRowOut={rowOutHandler}
                columns={columns}
                rows={dataHunchArray} />
        </div>
    );
};


export default observer(Table);