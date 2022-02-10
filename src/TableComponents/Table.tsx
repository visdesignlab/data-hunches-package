import { getDocs, collection } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { useContext, useMemo, useState } from "react";
import { FC, useEffect } from "react";
import { useTable, useSortBy } from 'react-table';
import Store from "../Interfaces/Store";
import CssBaseline from '@material-ui/core/CssBaseline';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DataHunch } from "../Interfaces/Types";

const Table: FC = () => {

    const store = useContext(Store);
    const [savedDH, setSavedDH] = useState<DataHunch[]>([]);

    useEffect(() => {
        // Retrieve saved DH from DB
        getDocs(collection(store.firebaseSetup, store.datasetName))
            .then(result => {
                const tempDHArray: DataHunch[] = [];
                store.setNextDHIndex(result.size);
                result.forEach((doc) => {
                    tempDHArray.push(doc.data() as DataHunch);
                    // if (!that.userColorProfile[doc.data().user]) {
                    //     that.userColorProfile[doc.data().user] = ColorPallate[Object.keys(that.userColorProfile).length];
                    // }
                });
                console.log(tempDHArray);
                setSavedDH(tempDHArray);


                // Object.keys(that.userColorProfile).forEach((userName) => {
                //     that.canvas
                //         .select('#user-filter-select')
                //         .append('option')
                //         .attr('value', userName)
                //         .html(userName);
                // });
                // this.renderVisualizationWithDH();
            });
    }, [store.nextDHIndex]);

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


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns: columns, data: savedDH }, useSortBy);

    return (
        <div>
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
                            <TableRow {...row.getRowProps()}>
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