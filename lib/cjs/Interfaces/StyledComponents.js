"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerDiv = exports.NonCapButton = exports.NonRoughDHIndicatorRect = exports.DHIndicatorText = exports.useStyles = void 0;
var core_1 = require("@material-ui/core");
var styled_components_1 = __importDefault(require("styled-components"));
var Constants_1 = require("./Constants");
var WebFont = require('webfontloader');
WebFont.load({
    google: {
        families: ['Nanum Brush Script']
    }
});
exports.useStyles = (0, core_1.makeStyles)(function (theme) {
    return (0, core_1.createStyles)({
        noBulletsList: {
            listStyleType: 'none',
            columns: 2,
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
exports.DHIndicatorText = (0, styled_components_1.default)("text")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    cursor:pointer;\n    font-size:", ";\n    alignment-baseline:middle;\n    text-anchor: start;\n    stroke: ", ";\n    fill:", ";\n    color:", ";\n    font-weight:", ";\n    font-family: 'Nanum Brush Script', cursive;\n"], ["\n    cursor:pointer;\n    font-size:", ";\n    alignment-baseline:middle;\n    text-anchor: start;\n    stroke: ", ";\n    fill:", ";\n    color:", ";\n    font-weight:", ";\n    font-family: 'Nanum Brush Script', cursive;\n"])), function (props) { return props.fontSize; }, function (props) { return props.isHighlighted ? Constants_1.HighlightColor : (props.isSelected ? Constants_1.SelectionColor : Constants_1.DataHunchColor); }, function (props) { return props.isHighlighted ? Constants_1.HighlightColor : (props.isSelected ? Constants_1.SelectionColor : Constants_1.DataHunchColor); }, function (props) { return props.isHighlighted ? Constants_1.HighlightColor : (props.isSelected ? Constants_1.SelectionColor : Constants_1.DataHunchColor); }, function (props) { return props.needBold ? 'bold' : ''; });
exports.NonRoughDHIndicatorRect = (0, styled_components_1.default)("rect")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    cursor:pointer;\n    x:", "px;\n    y:", "px;\n    width:", "px;\n    height:4px;\n    fill:", ";\n    opacity:0.7;\n"], ["\n    cursor:pointer;\n    x:", "px;\n    y:", "px;\n    width:", "px;\n    height:4px;\n    fill:", ";\n    opacity:0.7;\n"])), function (props) { return props.x; }, function (props) { return props.y; }, function (props) { return props.width; }, Constants_1.DataHunchColor);
exports.NonCapButton = (0, styled_components_1.default)(core_1.Button)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    text-transform: none\n"], ["\n    text-transform: none\n"])));
exports.ContainerDiv = (0, styled_components_1.default)(core_1.Container)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    text-align:start;\n"], ["\n    text-align:start;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
