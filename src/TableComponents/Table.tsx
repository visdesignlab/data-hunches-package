import { observer } from "mobx-react-lite";
import { useContext, useMemo } from "react";
import { FC, useState } from "react";
import { useTable, useSortBy } from 'react-table';
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DataHunch } from "../Interfaces/Types";
import Store from "../Interfaces/Store";
import { DataContext } from "..";
import { handlePreviewOnClick, handleResetOnClick } from "../HelperFunctions/PreviewReset";

export type DHProps = {
    dataHunchArray: DataHunch[];
};
const Table: FC<DHProps> = ({ dataHunchArray }: DHProps) => {

    const store = useContext(Store);

    const [needReset, setNeedReset] = useState(false);

    const dataSet = useContext(DataContext);

    const columns = useMemo(
        () => [{ Header: "Type", accessor: 'type' },
        { Header: "ID", accessor: 'id' },
        { Header: "User Name", accessor: 'user' },
        { Header: "Data Label", accessor: 'label' },
        { Header: "Data Hunch Content", accessor: 'content' },
        { Header: "Data Hunch Reasoning", accessor: 'reasoning' },
        { Header: "Confidence Level", accessor: 'confidenceLevel' }]
        , []
    );

    const rowHoverHandler = (dataHunch: DataHunch) => {
        store.setSelectedDH(dataHunch.id);
        store.setHighlightedDH(dataHunch.id);
        if (dataHunch.type === 'exclusion') {
            setNeedReset(true);
            store.setNeedToShowPreview(true);
            handlePreviewOnClick(dataSet, dataHunch.label, undefined, store.svgHeight, store.svgWidth, store.containCategory);
        }
    };

    const rowOutHandler = () => {
        store.setSelectedDH(-1);
        store.setHighlightedDH(-1);
        if (needReset) {
            store.setNeedToShowPreview(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
        }
    };


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns: columns, data: dataHunchArray }, useSortBy);

    return (
        <div style={{ height: '80vh', overflow: 'auto' }}>
            <CssBaseline />
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: any) => (
                                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <TableRow
                                {...row.getRowProps()}
                                onMouseOver={() => { rowHoverHandler(row.values as DataHunch); }}
                                style={{
                                    cursor: 'pointer',
                                    background: store.highlightedDH === row.values.id ? 'aliceblue' : undefined
                                }}
                                onMouseOut={rowOutHandler}

                            >
                                {row.cells.map(cell => {
                                    return <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>;
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </MaUTable>
        </div>
    );
};


export default observer(Table);