import { ButtonGroup, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { DataContext } from "../..";
import 'd3-transition';
import Store from "../../Interfaces/Store";
import { handlePreviewOnClick, handleResetOnClick } from "../../HelperFunctions/PreviewReset";

type Props = {
    labelToPreview: string;
    valueToPreview: number | undefined;
    disableButtons: boolean;
};

const PreviewResetButtons: FC<Props> = ({ labelToPreview, valueToPreview, disableButtons }: Props) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const previewHandler = () => {
        store.setNeedToShowPreview(true);
        handlePreviewOnClick(dataSet, labelToPreview, valueToPreview, store.svgHeight, store.svgWidth, store.containCategory.length > 0);
    };

    const resetHandler = () => {
        store.setNeedToShowPreview(false);
        handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory.length > 0, store.selectedDP);
    };

    return (<ButtonGroup>
        <Button size='small'
            disabled={disableButtons}
            onClick={previewHandler}>
            Preview
        </Button>
        <Button size='small'
            disabled={disableButtons}
            onClick={resetHandler}>
            Reset
        </Button>
    </ButtonGroup>);
};

export default observer(PreviewResetButtons);

