import { Button, ButtonGroup, FormControl, FormHelperText, InputLabel, Menu, MenuItem, Select } from "@material-ui/core";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { firebaseSetup } from "../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import Store from "../Interfaces/Store";
import NewVolDialog from "./NewVolDialog";
import { NonCapButton, useStyles } from "../Interfaces/StyledComponents";
import { DataPreset } from "../Interfaces/Datasets";

const DemoOptionButtons: FC = () => {
    const store = useContext(Store);

    const styles = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    const [subArray, setSubArray] = useState<string[]>([]);

    const handleVolChange = (e: any) => {
        const result = e.target.value;
        if (result === 'new') {
            sendDialogSignal(true);
        } else {
            store.setCurrentVol(result);
        }
    };

    const sendDialogSignal = (input: boolean) => {
        setOpenDialog(input);
    };

    const handleDBChange = (e: any) => {
        store.setDBTag(e.target.value);
    };

    useEffect(() => {
        //get how many subs there are
        const attrRef = doc(firebaseSetup, store.dbTag, 'attr');
        let tempSubArray: string[] = [];
        getDoc(attrRef).then(async result => {
            if (result.exists()) {
                const numberOfSubs = result.data().subs;
                for (let i = 1; i <= numberOfSubs; i++) {
                    //get the name of subs
                    const subName = await getDoc(doc(firebaseSetup, store.dbTag, `sub${i}`));
                    if (subName.exists()) {
                        tempSubArray.push(subName.data().name);
                    }
                }
            } else {
                // attr doesn't exist, this is a new DB, add it.
                setDoc(doc(collection(firebaseSetup, store.dbTag), 'attr'), { subs: 1 });

                setDoc(doc(collection(firebaseSetup, store.dbTag), 'sub1'), { name: 'default1', nextIndex: 0 });

                tempSubArray.push('default1');
            }
            stateUpdateWrapperUseJSON(subArray, tempSubArray, setSubArray);
        });
    }, [openDialog, store.dbTag]);

    return (<>
        {DataPreset[store.dbTag].categories.length > 0 ?
            <NonCapButton
                size='small'
                variant='outlined'
                color={store.showCategory ? 'primary' : 'default'}
                onClick={() => {
                    store.setShowCategory(!store.showCategory);
                }}

            >Show Category
            </NonCapButton> :
            <></>
        }

        <FormControl style={{ marginRight: '5px', marginLeft: '10px' }}>
            <InputLabel>Select Data</InputLabel>
            <Select className={styles.inputSelect}
                native
                value={store.dbTag}
                onChange={handleDBChange}>
                {
                    Object.keys(DataPreset).map((d) => {
                        return (
                            <option
                                value={d}
                                key={`SelectDB${d}`}
                            >
                                {DataPreset[d].name}
                            </option>
                        );
                    })
                }
            </Select>

        </FormControl>

        <FormControl style={{ marginRight: '5px', marginLeft: '5px' }}>
            <InputLabel>Data Hunch Demos</InputLabel>
            <Select className={styles.inputSelect}
                native
                value={store.currentVol}
                onChange={handleVolChange}>
                {subArray.map((d, i) => {
                    return (
                        <option
                            key={`SubItem${d}`}
                            value={i + 1}
                        >
                            {d}
                        </option>
                    );
                })}
                <option value='new' >
                    Start new volume
                </option>
            </Select>

        </FormControl>
        <NewVolDialog open={openDialog} sendCloseSignal={sendDialogSignal} />
    </>);
};

export default observer(DemoOptionButtons);