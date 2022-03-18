import { Button, ButtonGroup, Menu, MenuItem } from "@material-ui/core";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { DataPreset, firebaseSetup } from "../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import Store from "../Interfaces/Store";
import AddIcon from '@material-ui/icons/Add';
import NewVolDialog from "./NewVolDialog";

const VolSelector: FC = () => {
    const store = useContext(Store);

    const [openDialog, setOpenDialog] = useState(false);
    const [anchorVol, setAnchorVol] = useState(null);
    const [anchorDB, setAnchorDB] = useState(null);

    const [subArray, setSubArray] = useState<string[]>([]);

    const handleVolMenu = (event: any) => {
        setAnchorVol(event.currentTarget);
    };

    const handleDBMenu = (event: any) => {
        setAnchorDB(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorVol(null);
        setAnchorDB(null);
    };

    const sendDialogSignal = (input: boolean) => {
        setOpenDialog(input);
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
        <ButtonGroup
            style={{ paddingRight: '5px' }}>
            <Button
                size='small'
                variant="outlined"
                onClick={handleDBMenu}
                color="primary">
                Select Data
            </Button>
            <Button
                size='small'
                variant="outlined"
                onClick={handleVolMenu}
                color="primary">
                Select Vol
            </Button >
            <Menu
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
            </Menu>
            <Menu
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
            </Menu>

        </ButtonGroup>
        <NewVolDialog open={openDialog} sendCloseSignal={sendDialogSignal} />
    </>);
};

export default observer(VolSelector);