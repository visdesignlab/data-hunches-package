import { FC, ReactElement } from "react";
import { DataHunch } from "../../Interfaces/Types";
declare type Props = {
    dataHunch: DataHunch;
    childrenComponent: ReactElement;
};
declare const StyledTooltip: FC<Props>;
export default StyledTooltip;
