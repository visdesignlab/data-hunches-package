/// <reference types="react" />
import { DataHunch } from "../../Interfaces/Types";
declare type Props = {
    dataHunch: DataHunch;
    points: [number, number][];
    fill: string;
    opacity: number;
    highlighted: boolean;
    selected: boolean;
};
declare const _default: import("react").FunctionComponent<Props>;
export default _default;
