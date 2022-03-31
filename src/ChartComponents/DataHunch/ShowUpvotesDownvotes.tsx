import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { DataHunch } from "../../Interfaces/Types";
import { DataHunchColor } from '../../Interfaces/Constants';

type Prop = {
    dataHunch: DataHunch;
    xPos: number;
    yPos: number;

};
const ShowUpvotesDownvotes: FC<Prop> = ({ dataHunch, xPos, yPos }: Prop) => {
    return (
        <foreignObject x={xPos} y={yPos} width={50} height={55}>
            <div id="UpDownVotes-Tooltip" >
                {dataHunch.upvotes > 0 ? <div style={{ color: DataHunchColor }} >
                    <i className="fa-solid fa-thumbs-up"></i>{dataHunch.upvotes}
                </div> : <></>}
                {dataHunch.downvotes > 0 ? <div style={{ color: DataHunchColor }}>
                    <i className="fa-solid fa-thumbs-down"></i>{dataHunch.downvotes}
                </div> : <></>}

            </div>
        </foreignObject>

    );
};
export default observer(ShowUpvotesDownvotes);

// export const placeShowVotesWindow = (xLoc: number, yLoc: number) => {
//     select('#UpDownVotes-Tooltip')
//         .style('display', null)
//         .style('left', `${xLoc}px`)
//         .style('top', `${yLoc}px`);
// };

// export const hideShowVotesWindow = () => {
//     select('#UpDownVotes-Tooltip')
//         .style('display', 'none');
// };