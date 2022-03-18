import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { firebaseSetup } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";

type Props = {
    open: boolean;
    sendCloseSignal: (input: any) => void;
};
const NewVolDialog: FC<Props> = ({ open, sendCloseSignal }: Props) => {

    const [volName, setVolName] = useState('');

    const store = useContext(Store);

    const confirmVol = async () => {

        const attrRef = doc(firebaseSetup, store.dbTag, 'attr');
        const attrResult = await getDoc(attrRef);
        if (attrResult.exists()) {
            const numberOfSubs = attrResult.data().subs;
            await updateDoc(doc(firebaseSetup, store.dbTag, 'attr'), {
                subs: numberOfSubs + 1
            });

            await setDoc(doc(collection(firebaseSetup, store.dbTag), `sub${numberOfSubs + 1}`), { name: volName });

            sendCloseSignal(false);
            store.setCurrentVol(numberOfSubs + 1);
        }



    };

    const handleNameChange = (e: any) => {
        setVolName(e.target.value);
    };

    return (
        <Dialog open={open} onClose={() => { sendCloseSignal(false); }}>
            <DialogTitle>Add new volume for data hunch</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    id='new_vol_name'
                    label='New Volume Name'
                    fullWidth
                    value={volName}
                    onChange={handleNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { sendCloseSignal(false); }}>
                    Cancel
                </Button>
                <Button color='primary' onClick={confirmVol}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(NewVolDialog);