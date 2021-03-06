/// <reference types="react" />
import 'roughjs';
import { DataHunch } from "../../Interfaces/Types";
declare type Props = {
    xPos: number;
    yPos: number;
    height: number;
    dataHunch: DataHunch;
    highlighted: boolean;
    selected: boolean;
};
declare const _default: import("react").FunctionComponent<Props>;
export default _default;
