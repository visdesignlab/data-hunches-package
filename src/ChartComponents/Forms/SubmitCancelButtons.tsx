import { Button, ButtonGroup } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { FC } from "react";
import Store from "../../Interfaces/Store";
import { NonCapButton } from "../../Interfaces/StyledComponents";
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
        store.setNeedToShowPreview(false);

        select('#categorical-preview').selectAll('*').remove();
    };

    const submitClickHandler = () => {
        store.submitDH(dhToSubmit);
        store.setInputMode('none');
        store.setCurrentSelectedDP(undefined);
        store.setNeedToShowPreview(false);

        select('#categorical-preview').selectAll('*').remove();

    };

    return <ButtonGroup style={{ display: 'block' }}>
        <NonCapButton size='small'
            onClick={submitClickHandler}
            disabled={disableSubmit} >
            Submit
        </NonCapButton>
        <NonCapButton size='small' onClick={cancelClickHandler} variant='outlined'>
            Cancel
        </NonCapButton>
    </ButtonGroup>;
};

export default observer(SubmitCancelButtons);