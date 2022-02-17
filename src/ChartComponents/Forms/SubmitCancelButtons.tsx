import { Button, ButtonGroup } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import Store from "../../Interfaces/Store";
import { DataHunch } from "../../Interfaces/Types";

type Props = {
    dhToSubmit: DataHunch;
    disableSubmit: boolean;
};
const SubmitCancelButtons: FC<Props> = ({ dhToSubmit, disableSubmit }: Props) => {

    const store = useContext(Store);
    const cancelClickHandler = () => {
        store.setInputMode('none');
        store.setCurrentSelectedDP(undefined);
    };

    const submitClickHandler = () => {
        store.submitDH(dhToSubmit);
        store.setInputMode('none');
        store.setCurrentSelectedDP(undefined);
    };

    return <ButtonGroup>
        <Button size='small'
            onClick={submitClickHandler}
            disabled={disableSubmit}
        >
            Submit
        </Button>
        <Button size='small' onClick={cancelClickHandler} variant='outlined'>
            Cancel
        </Button>
    </ButtonGroup>;
};

export default observer(SubmitCancelButtons);