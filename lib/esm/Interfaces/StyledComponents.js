var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { Button, createStyles, makeStyles, Tooltip, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { SelectionColor, HighlightColor, DataHunchColor } from "./Constants";
var WebFont = require('webfontloader');
WebFont.load({
    google: {
        families: ['Nanum Brush Script']
    }
});
export var LightTooltip = withStyles(function (theme) { return ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 20,
        fontFamily: "'Nanum Brush Script', cursive",
        fontWeight: 'bold'
    },
}); })(Tooltip);
export var useStyles = makeStyles(function (theme) {
    return createStyles({
        noBulletsList: {
            listStyleType: 'none',
            padding: '0px',
            margin: '0px'
        },
        table: {
            '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: 'small',
                fontWeight: 'bold !important',
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
                paddingLeft: '0px !important',
                paddingRight: '0px !important'
            },
            '& .MuiDataGrid-columnHeader': {
                paddingLeft: '5px !important',
                paddingRight: '5px !important'
            },
            '& .MuiDataGrid-cell': {
                paddingLeft: '5px !important',
                paddingRight: '5px !important'
            }
        },
        inputSelect: {
            '& .MuiInputBase-input': {
                paddingBottom: '0px',
                paddingTop: '0px'
            },
        },
        rightToolbar: {
            marginLeft: "auto",
            marginRight: -12,
            display: 'inline-flex',
            alignItems: 'center',
            height: 'fit-content'
        },
        menuButton: {
            marginRight: 16,
            marginLeft: -12,
        },
        foreignObjectContainer: {
            backgroundColor: 'rgb(238, 238, 238, 0.8)',
            padding: '5px !important',
        },
        specificControlContainer: {
            backgroundColor: 'rgb(238, 238, 238, 0.8)',
            padding: '0px !important',
        },
        radioStyle: {
            marginTop: -7,
            marginBottom: -7
        },
        catText: {
            color: '#787878',
        },
        colorBox: {
            float: 'left',
            height: '20px',
            width: '20px',
            border: '1px solid black',
            clear: 'both',
            margin: '2px'
        },
        overrideButton: {
            textTransform: "none",
        }
    });
});
export var DHIndicatorText = styled("text")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    cursor:pointer;\n    font-size:", ";\n    alignment-baseline:middle;\n    text-anchor: start;\n    stroke: ", ";\n    fill:", ";\n    color:", ";\n    font-weight:", ";\n    font-family: 'Nanum Brush Script', cursive;\n"], ["\n    cursor:pointer;\n    font-size:", ";\n    alignment-baseline:middle;\n    text-anchor: start;\n    stroke: ", ";\n    fill:", ";\n    color:", ";\n    font-weight:", ";\n    font-family: 'Nanum Brush Script', cursive;\n"])), function (props) { return props.fontSize; }, function (props) { return props.isHighlighted ? HighlightColor : (props.isSelected ? SelectionColor : DataHunchColor); }, function (props) { return props.isHighlighted ? HighlightColor : (props.isSelected ? SelectionColor : DataHunchColor); }, function (props) { return props.isHighlighted ? HighlightColor : (props.isSelected ? SelectionColor : DataHunchColor); }, function (props) { return props.needBold ? 'bold' : ''; });
export var NonRoughDHIndicatorRect = styled("rect")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    cursor:pointer;\n    x:", "px;\n    y:", "px;\n    width:", "px;\n    height:4px;\n    fill:", ";\n    opacity:0.7;\n"], ["\n    cursor:pointer;\n    x:", "px;\n    y:", "px;\n    width:", "px;\n    height:4px;\n    fill:", ";\n    opacity:0.7;\n"])), function (props) { return props.x; }, function (props) { return props.y; }, function (props) { return props.width; }, DataHunchColor);
export var NonCapButton = styled(Button)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    text-transform: none\n"], ["\n    text-transform: none\n"])));
var templateObject_1, templateObject_2, templateObject_3;
