import { createStyles, makeStyles, Theme } from "@material-ui/core";
import styled from "styled-components";
import { DarkGray } from "./Constants";

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

interface FontProps {
    fontSize: 'large' | 'small';
}

export const DHIndicatorText = styled(`text`) <FontProps>`
    cursor:pointer;
    font-size:${props => props.fontSize};
    alignment-baseline:middle;
    text-anchor: middle;
    stroke: ${DarkGray};
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