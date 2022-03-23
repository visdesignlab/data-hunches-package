import { Theme, Tooltip, withStyles } from "@material-ui/core";
import { FC, ReactElement } from "react";
import { generateHunchText } from "../../HelperFunctions/GenerateHunchText";
import { DataHunch } from "../../Interfaces/Types";
type Props = {
    dataHunch: DataHunch;
    childrenComponent: ReactElement;
};
const StyledTooltip: FC<Props> = ({ dataHunch, childrenComponent }: Props) => {
    return (<LightTooltip
        children={childrenComponent}
        title={
            <div>
                <div>
                    Content: {generateHunchText(dataHunch.type, dataHunch.content, dataHunch.label)}
                </div>
                <div>
                    Reasoning: {dataHunch.reasoning}
                </div>
                <div>
                    Confidence:{dataHunch.confidenceLevel}
                </div>
                <div>
                    Author:{dataHunch.user}
                </div>

            </div>
        } />);
};

export default StyledTooltip;

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: '#0c0c0c',
        boxShadow: theme.shadows[1],
        fontSize: 20,
        fontFamily: "'Nanum Brush Script', cursive",
        fontWeight: 'bold'
    },
}))(Tooltip);