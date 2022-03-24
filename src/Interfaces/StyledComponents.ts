import { Button, Container, createStyles, makeStyles, Theme, Tooltip, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { SelectionColor, HighlightColor, DataHunchColor } from "./Constants";

let WebFont = require('webfontloader');
WebFont.load({
    google: {
        families: ['Nanum Brush Script']
    }
});



export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }));

interface FontProps {
    fontSize: 'larger' | 'small';
    isHighlighted: boolean;
    isSelected: boolean;
    needBold: boolean;
}

export const DHIndicatorText = styled(`text`) <FontProps>`
    cursor:pointer;
    font-size:${props => props.fontSize};
    alignment-baseline:middle;
    text-anchor: start;
    stroke: ${props => props.isHighlighted ? HighlightColor : (props.isSelected ? SelectionColor : DataHunchColor)};
    fill:${props => props.isHighlighted ? HighlightColor : (props.isSelected ? SelectionColor : DataHunchColor)};
    color:${props => props.isHighlighted ? HighlightColor : (props.isSelected ? SelectionColor : DataHunchColor)};
    font-weight:${props => props.needBold ? 'bold' : ''};
    font-family: 'Nanum Brush Script', cursive;
`;

interface RectProps {
    x: number;
    y: number;
    width: number;
}

export const NonRoughDHIndicatorRect = styled(`rect`) <RectProps>`
    cursor:pointer;
    x:${props => props.x}px;
    y:${props => props.y}px;
    width:${props => props.width}px;
    height:4px;
    fill:${DataHunchColor};
    opacity:0.7;
`;

export const NonCapButton = styled(Button)`
    text-transform: none
`;

export const ContainerDiv = styled(Container)`
    text-align:start;
`;