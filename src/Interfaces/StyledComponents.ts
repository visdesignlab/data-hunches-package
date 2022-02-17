import { createStyles, makeStyles, Theme } from "@material-ui/core";
import styled from "styled-components";
import { BrightOrange, DarkGray } from "./Constants";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        }
        ,
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
    }));

interface FontProps {
    fontSize: 'large' | 'small';
    isHighlighted: boolean;
}

export const DHIndicatorText = styled(`text`) <FontProps>`
    cursor:pointer;
    font-size:${props => props.fontSize};
    alignment-baseline:middle;
    text-anchor: middle;
    stroke: ${props => props.isHighlighted ? BrightOrange : DarkGray};
`;

interface RectProps {
    x: number;
    y: number;
    width: number;
}

export const DHIndicatorRect = styled(`rect`) <RectProps>`
    cursor:pointer;
    x:${props => props.x}px;
    y:${props => props.y}px;
    width:${props => props.width}px;
    height:4px;
    fill:${DarkGray};
    opacity:0.7;

`;