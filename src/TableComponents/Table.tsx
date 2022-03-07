import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import { FC, useState } from "react";
import { DataHunch } from "../Interfaces/Types";
import Store from "../Interfaces/Store";
import { DataContext } from "..";
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { handlePreviewOnClick, handleResetOnClick } from "../HelperFunctions/PreviewReset";
import { useStyles } from "../Interfaces/StyledComponents";
import { previewSketch } from "../HelperFunctions/PreviewSketch";

export type DHProps = {
    dataHunchArray: DataHunch[];
};
const Table: FC<DHProps> = ({ dataHunchArray }: DHProps) => {

    const store = useContext(Store);
    const styles = useStyles();

    const [needReset, setNeedReset] = useState(false);

    const dataSet = useContext(DataContext);

    const columns: GridColDef[] = [

        { headerName: "Type", field: 'type', width: 90 },
        { headerName: "Username", field: 'user', width: 115 },
        { headerName: "Label", field: 'label', width: 90 },
        { headerName: "Reasoning", field: 'reasoning', width: 150 },
        { headerName: "Content", field: 'content', width: 150, },
        { headerName: "Confidence Level", field: 'confidenceLevel', }
    ];


    const rowHoverHandler = (dataHunch: DataHunch) => {
        store.setSelectedDH([dataHunch.id]);
        store.setHighlightedDH(dataHunch.id);
        if (dataHunch.type === 'exclusion') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, dataHunch.label, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0, undefined);
        } else if (dataHunch.type === 'model') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, undefined, undefined, store.svgHeight, store.svgWidth, store.containCategory.length > 0, dataHunch.content);
        } else if (dataHunch.type === 'sketch') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            previewSketch(dataHunch.content);
        }
    };

    const rowOutHandler = () => {
        store.setSelectedDH([]);
        store.setHighlightedDH(-1);
        if (needReset) {
            store.setNeedToShowPreview(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory.length > 0, store.selectedDP);
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
                rows={dataHunchArray} />
        </div>
    );
};


export default observer(Table);