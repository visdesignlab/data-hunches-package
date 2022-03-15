var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { createStyles, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import { SelectionColor, DarkGray, HighlightColor } from "./Constants";
var WebFont = require('webfontloader');
WebFont.load({
    google: {
        families: ['Nanum Brush Script']
    }
});
export var useStyles = makeStyles(function (theme) {
    return createStyles({
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
            padding: '5px !important',
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
        }
    });
});
export var DHIndicatorText = styled("text")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    cursor:pointer;\n    font-size:", ";\n    alignment-baseline:middle;\n    text-anchor: start;\n    stroke: ", ";\n    fill:", ";\n    font-family: 'Nanum Brush Script', cursive;\n"], ["\n    cursor:pointer;\n    font-size:", ";\n    alignment-baseline:middle;\n    text-anchor: start;\n    stroke: ", ";\n    fill:", ";\n    font-family: 'Nanum Brush Script', cursive;\n"])), function (props) { return props.fontSize; }, function (props) { return props.isHighlighted ? HighlightColor : (props.isSelected ? SelectionColor : DarkGray); }, function (props) { return props.isHighlighted ? HighlightColor : (props.isSelected ? SelectionColor : DarkGray); });
export var NonRoughDHIndicatorRect = styled("rect")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    cursor:pointer;\n    x:", "px;\n    y:", "px;\n    width:", "px;\n    height:4px;\n    fill:", ";\n    opacity:0.7;\n\n"], ["\n    cursor:pointer;\n    x:", "px;\n    y:", "px;\n    width:", "px;\n    height:4px;\n    fill:", ";\n    opacity:0.7;\n\n"])), function (props) { return props.x; }, function (props) { return props.y; }, function (props) { return props.width; }, DarkGray);
var templateObject_1, templateObject_2;
