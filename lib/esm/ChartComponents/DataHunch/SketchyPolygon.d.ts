/// <reference types="react" />
import { DataHunch } from "../../Interfaces/Types";
import { Point } from "react-rough";
declare type Props = {
    dataHunch: DataHunch;
    points: Point[];
    fill: string;
    opacity: number;
    highlighted: boolean;
    selected: boolean;
};
declare const _default: import("react").FunctionComponent<Props>;
export default _default;
