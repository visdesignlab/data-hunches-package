import { AppBar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { FC } from "react";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useStyles } from "../Interfaces/StyledComponents";



const TopBar: FC = () => {
    const styles = useStyles();

    return <AppBar position="static" color="transparent" elevation={2} style={{ zIndex: 3 }}>
        <Toolbar>

            <Typography variant="h6" >
                Data Hunch Demo
            </Typography>
            <section className={styles.rightToolbar}>
                <IconButton>
                    <AccountCircle />
                </IconButton>
            </section>
        </Toolbar>
    </AppBar>;
};

export default observer(TopBar);