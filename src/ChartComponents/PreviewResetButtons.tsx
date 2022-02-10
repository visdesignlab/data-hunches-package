import { ButtonGroup, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC } from "react";

type Props = {
    labelToPreview: string;
    valueToPreview: number;
    disableButtons: boolean;
};

const PreviewResetButtons: FC<Props> = ({ labelToPreview, valueToPreview, disableButtons }: Props) => {

    const handlePreviewOnClick = () => {

    };

    const handleResetOnClick = () => {

    };

    return (<ButtonGroup>
        <Button size='small'
            disabled={disableButtons}
            onClick={handlePreviewOnClick}>
            Preview
        </Button>
        <Button size='small'
            disabled={disableButtons}
            onClick={handleResetOnClick}>
            Reset
        </Button>
    </ButtonGroup>);
};

export default observer(PreviewResetButtons);