"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = void 0;
var core_1 = require("@material-ui/core");
exports.useStyles = (0, core_1.makeStyles)(function (theme) {
    return (0, core_1.createStyles)({
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
