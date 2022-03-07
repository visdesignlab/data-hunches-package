import { Button, ButtonGroup, Menu, MenuItem } from "@material-ui/core";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { firebaseSetup } from "../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import Store from "../Interfaces/Store";
import AddIcon from '@material-ui/icons/Add';
import NewVolDialog from "./NewVolDialog";

const VolSelector: FC = () => {
    const store = useContext(Store);

    const [openDialog, setOpenDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [subArray, setSubArray] = useState<string[]>([]);

    const open = Boolean(anchorEl);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sendDialogSignal = (input: boolean) => {
        setOpenDialog(input);
    };


    useEffect(() => {
        //get how many subs there are

        const attrRef = doc(firebaseSetup, store.datasetName, 'attr');
        let tempSubArray: string[] = [];
        getDoc(attrRef).then(async result => {
            if (result.exists()) {
                const numberOfSubs = result.data().subs;
                for (let i = 1; i <= numberOfSubs; i++) {
                    //get the name of subs
                    const subName = await getDoc(doc(firebaseSetup, store.datasetName, `sub${i}`));
                    if (subName.exists()) {
                        tempSubArray.push(subName.data().name);
                    }
                }
            } else {
                // attr doesn't exist, this is a new DB, add it.
                setDoc(doc(collection(firebaseSetup, store.datasetName), 'attr'), { subs: 1 });

                setDoc(doc(collection(firebaseSetup, store.datasetName), 'sub1'), { name: 'default1' });

                tempSubArray.push('default1');
            }
            stateUpdateWrapperUseJSON(subArray, tempSubArray, setSubArray);
        });
    }, [openDialog]);

    return (<>
        <ButtonGroup
            style={{ paddingRight: '5px' }}>
            <Button
                size='small'
                variant="outlined"
                onClick={handleMenu}
                color="primary">
                Select Vol
            </Button >
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
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
                            {d}
                        </MenuItem>
                    );
                })}
                <MenuItem onClick={() => { sendDialogSignal(true); }}>
                    <AddIcon />Start new volume
                </MenuItem>
            </Menu>
        </ButtonGroup>
        <NewVolDialog open={openDialog} sendCloseSignal={sendDialogSignal} />
    </>);
};

export default observer(VolSelector);