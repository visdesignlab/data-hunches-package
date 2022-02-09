import { createStyles, makeStyles } from "@material-ui/core";
export var useStyles = makeStyles(function (theme) {
    return createStyles({
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
        }
    });
});
