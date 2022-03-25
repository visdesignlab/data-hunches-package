import { Container, ButtonGroup, IconButton } from "@material-ui/core";
import Store from "../../Interfaces/Store";
import { updateDoc, doc, collection } from "firebase/firestore/lite";
import { FC, useContext, useLayoutEffect } from "react";
import { firebaseSetup, UpDownVoteFOHeight, UpDownVoteFOWidth } from "../../Interfaces/Constants";
import { useStyles } from "../../Interfaces/StyledComponents";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { observer } from "mobx-react-lite";
import { pointer, select } from "d3-selection";

type Props = {
    retrieveData: () => void;
};

const UpvotesDownvotes: FC<Props> = ({ retrieveData, }: Props) => {
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
            store.setVotingDH(undefined);
        }



    };

    useLayoutEffect(() => {
        if (!store.votingDH) {
            select('#upvote-downvote')
                .style('display', 'none');
        }
    }, [store.votingDH]);



    return (
        <Container id='upvote-downvote' style={{
            textAlign: 'start',
            zIndex: 1000,
            position: 'absolute',
            display: 'none',
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

export const toVoteDH = (e: any, svgWidth: number, svgHeight: number,) => {
    e.preventDefault();
    let xLoc, yLoc;

    select('#upvote-downvote')
        .style('display', 'none');


    xLoc = pointer(e, select('#app-div').node())[0];
    yLoc = pointer(e, select('#app-div').node())[1];

    select('#upvote-downvote')
        .style('display', null)
        .style('left', `${xLoc}px`)
        .style('top', `${yLoc}px`);


};