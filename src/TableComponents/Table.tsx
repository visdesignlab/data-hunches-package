import { getDocs, collection } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { useContext, useMemo, useState } from "react";
import { FC, useEffect } from "react";
import { useTable } from 'react-table';
import Store from "../Interfaces/Store";
import { DataHunch } from "../Interfaces/Types";

const Table: FC = () => {

    const store = useContext(Store);
    const [savedDH, setSavedDH] = useState<DataHunch[]>([]);

    useEffect(() => {
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
        () => [{
            Header: "Data Hunch",
            columns: [{ Header: "Type", accessor: 'type' },
            { Header: "ID", accessor: 'id' },
            { Header: "User Name", accessor: 'user' },
            { Header: "Data Label", accessor: 'label' },
            { Header: "Data Hunch Content", accessor: 'content' },
            { Header: "Data Hunch Reasoning", accessor: 'reasoning' },
            { Header: "Confidence Level", accessor: 'confidenceLevel' }]
        }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns: columns, data: savedDH });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};


export default observer(Table);