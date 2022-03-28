import { Theme, Tooltip, withStyles } from "@material-ui/core";
import { FC, ReactElement } from "react";
import { generateHunchText } from "../../HelperFunctions/GenerateHunchText";
import { DarkGray } from "../../Interfaces/Constants";
import { DataHunch } from "../../Interfaces/Types";
type Props = {
    dataHunch: DataHunch;
    childrenComponent: ReactElement;
};
const StyledTooltip: FC<Props> = ({ dataHunch, childrenComponent }: Props) => {
    return (<LightTooltip
        enterDelay={200}
        leaveDelay={200}
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
                <div>
                    Upvotes: <span style={{ textDecoration: 'underline' }}>{dataHunch.upvotes}</span>
                </div>
                <div>
                    Downvotes: <span style={{ textDecoration: 'underline' }}>{dataHunch.downvotes}</span>
                </div>

            </div>
        } />);
};

export default StyledTooltip;

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: DarkGray,
        boxShadow: theme.shadows[1],
        fontSize: 20,
        fontFamily: "'Nanum Brush Script', cursive",
        fontWeight: 'bold'
    },
}))(Tooltip);