import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { LightGray } from "./Constants";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rightToolbar: {
            marginLeft: "auto",
            marginRight: -12
        },
        menuButton: {
            marginRight: 16,
            marginLeft: -12
        },
        foreignObjectContainer: {
            backgroundColor: 'rgb(238, 238, 238, 0.8)',
            padding: '5px',
            // borderStyle: 'groove',
            // borderColor: LightGray
        },
        radioStyle: {
            marginTop: -7,
            marginBottom: -7
        }
    }));
