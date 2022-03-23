import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useTheme } from "@material-ui/core";

import { observer } from "mobx-react-lite";
import { FC, useState } from "react";

const WelcomeDialog: FC = () => {

    const [open, setOpen] = useState(true);

    const theme = useTheme();

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    return (<Dialog open={open}>
        <DialogTitle>
            Welcome to Data Hunch Demo
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                <p>
                    Welcome to the the demonstrator for the paper "Data Hunches: Incorporating Personal Knowledge into Visualizations".
                </p>
                <p>
                    A <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>data hunch</span> is an analyst's knowledge about how and why the data is an imperfect and partial representation of the phenomena of interest.
                </p>
                <p>
                    In this demonstrator, we show some ideas how data hunches could be recorded and visualized, on top of but distinct from data visualizations.
                </p>
                <p>
                    Browse through the different types of demonstration hunches we pre-recorded, or try recording some of your own by right-clicking a bar or using one of the buttons.
                </p>
                <p>
                    To record a data hunch, use the <span style={{ color: theme.palette.primary.main }}>"Continue as Guest"</span> feature on the top right.
                </p>
                <p>
                    Note that <u>we do not track anything about visitors to this website</u>!
                </p>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='contained' color="primary">
                Proceed
            </Button>
        </DialogActions>
    </Dialog>);
};

export default observer(WelcomeDialog);