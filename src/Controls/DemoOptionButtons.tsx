import { Button, ButtonGroup, FormControl, FormHelperText, InputLabel, Menu, MenuItem, Select } from "@material-ui/core";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { DataPreset, firebaseSetup } from "../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import Store from "../Interfaces/Store";
import NewVolDialog from "./NewVolDialog";
import { NonCapButton, useStyles } from "../Interfaces/StyledComponents";

const DemoOptionButtons: FC = () => {
    const store = useContext(Store);

    const styles = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    // const [anchorVol, setAnchorVol] = useState(null);
    // const [anchorDB, setAnchorDB] = useState(null);

    const [subArray, setSubArray] = useState<string[]>([]);

    // const handleVolMenu = (event: any) => {
    //     setAnchorVol(event.currentTarget);
    // };

    // const handleDBMenu = (event: any) => {
    //     setAnchorDB(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorVol(null);
    //     setAnchorDB(null);
    // };

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
        {DataPreset[store.dbTag].categories ?
            <NonCapButton
                size='small'
                variant='outlined'
                style={{ paddingRight: '5px' }}
                color={store.showCategory ? 'primary' : 'default'}
                onClick={() => {
                    store.setShowCategory(!store.showCategory);
                }}

            >Show Category
            </NonCapButton> :
            <></>
        }
        {/* <ButtonGroup
            style={{ paddingRight: '5px' }}>
            {/* <NonCapButton
                size='small'
                variant="outlined"
                color="primary"
                onClick={handleDBMenu}
            >
                Select Data
            </NonCapButton> */}

        <FormControl style={{ paddingRight: '5px' }}>
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
        {/* <NonCapButton
            size='small'
            variant="outlined"
            onClick={handleVolMenu}
            color="primary">
            Select Vol
        </NonCapButton > */}

        <FormControl style={{ paddingRight: '5px' }}>
            <InputLabel>Select Collection</InputLabel>
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
        {/* <Menu
            anchorEl={anchorVol}
            keepMounted
            open={Boolean(anchorVol)}
            onClose={handleClose}
        >
            {subArray.map((d, i) => {
                return (
                    <MenuItem
                        key={`SubItem${d}`}
                        onClick={() => {
                            store.setCurrentVol(i + 1);
                            handleClose();
                        }}>
                        {store.currentVol === (i + 1) ? '> ' : ''}{d}
                    </MenuItem>
                );
            })}
            <MenuItem onClick={() => { sendDialogSignal(true); }}>
                <AddIcon />Start new volume
            </MenuItem>
        </Menu> */}


        {/* <Menu
            anchorEl={anchorDB}
            keepMounted
            open={Boolean(anchorDB)}
            onClose={handleClose}>
            {
                Object.keys(DataPreset).map((d) => {
                    return (
                        <MenuItem
                            key={`SelectDB${d}`}
                            onClick={() => {
                                store.setDBTag(d);
                                handleClose();
                            }}>
                            {DataPreset[d].name}
                        </MenuItem>
                    );
                })
            }
        </Menu> */}

        {/* </ButtonGroup> */}
        <NewVolDialog open={openDialog} sendCloseSignal={sendDialogSignal} />
    </>);
};

export default observer(DemoOptionButtons);