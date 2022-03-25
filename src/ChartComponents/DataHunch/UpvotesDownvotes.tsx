import { Container, ButtonGroup, IconButton } from "@material-ui/core";
import Store from "../../Interfaces/Store";
import { updateDoc, doc, collection } from "firebase/firestore/lite";
import { FC, useContext } from "react";
import { firebaseSetup, UpDownVoteFOHeight, UpDownVoteFOWidth } from "../../Interfaces/Constants";
import { useStyles } from "../../Interfaces/StyledComponents";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { observer } from "mobx-react-lite";
import { pointer, select } from "d3-selection";

type Props = {
    retrieveData: () => void;
    idAssignment: string;
};

const UpvotesDownvotes: FC<Props> = ({ retrieveData, idAssignment }: Props) => {
    const store = useContext(Store);


    const onClickVote = async (isUpvote: boolean) => {

        if (store.votingDH) {
            let updateResult;
            if (isUpvote) {
                updateResult = { upvotes: (parseInt(store.votingDH.upvotes as any) + 1).toString() };
            } else {
                updateResult = { downvotes: (parseInt(store.votingDH.downvotes as any) + 1).toString() };
            }

            await updateDoc(doc(collection(firebaseSetup, store.dbTag, `sub${store.currentVol}`, `dhs`), store.votingDH.id.toString()), updateResult);

            retrieveData();
        }
        store.setVotingDH(undefined);

        select('#upvote-downvote-FO')
            .attr('display', 'none');
        select('#upvote-downvote')
            .style('display', 'none');
    };



    return (
        <Container id={idAssignment} style={{
            textAlign: 'start',
            zIndex: 1000,
            position: 'absolute',
            display: idAssignment ? 'none' : undefined,
            width: UpDownVoteFOWidth,
            backgroundColor: 'rgb(238, 238, 238, 0.8)'
        }}>
            <ButtonGroup>
                <IconButton onClick={() => { onClickVote(true); }}>
                    <ThumbUpIcon />
                </IconButton>
                <IconButton onClick={() => { onClickVote(false); }}>
                    <ThumbDownIcon />
                </IconButton>
            </ButtonGroup>
        </Container>
    );
};
export default observer(UpvotesDownvotes);

export const toVoteDH = (e: any, svgWidth: number, svgHeight: number, isFO: boolean) => {
    e.preventDefault();
    let xLoc, yLoc;

    select('#upvote-downvote-FO')
        .attr('display', 'none');
    select('#upvote-downvote')
        .style('display', 'none');

    if (isFO) {
        xLoc = (pointer(e)[0] + UpDownVoteFOWidth) > svgWidth ? (pointer(e)[0] - UpDownVoteFOWidth) : pointer(e)[0];
        yLoc = (pointer(e)[1] + UpDownVoteFOHeight) > svgHeight ? (pointer(e)[1] - UpDownVoteFOHeight) : pointer(e)[1];
    } else {
        xLoc = pointer(e, select('#app-div').node())[0];
        yLoc = pointer(e, select('#app-div').node())[1];

    }
    if (isFO) {
        select('#upvote-downvote-FO')
            .attr('display', null)
            .attr('x', xLoc)
            .attr('y', yLoc);
    } else {
        select('#upvote-downvote')
            .style('display', null)
            .style('left', `${xLoc}px`)
            .style('top', `${yLoc}px`);
    }

};