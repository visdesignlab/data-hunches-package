import { ButtonGroup, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { DataContext } from "../..";
import 'd3-transition';
import Store from "../../Interfaces/Store";
import { handlePreviewOnClick, handleResetOnClick } from "../../HelperFunctions/PreviewReset";
import { NonCapButton } from "../../Interfaces/StyledComponents";

type Props = {
    labelToPreview: string | undefined;
    valueToPreview: number | undefined;
    disableButtons: boolean;
    modelInput: string | undefined;
};

const PreviewResetButtons: FC<Props> = ({ labelToPreview, valueToPreview, disableButtons, modelInput }: Props) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const previewHandler = () => {
        store.setNeedToShowPreview(true);

        handlePreviewOnClick(dataSet, labelToPreview, valueToPreview, store.svgHeight, store.svgWidth, store.showCategory, modelInput);

    };

    const resetHandler = () => {
        store.setNeedToShowPreview(false);
        handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.showCategory, store.selectedDP);
    };

    return (<ButtonGroup>
        <NonCapButton size='small'
            disabled={disableButtons}
            onClick={previewHandler}>
            Preview
        </NonCapButton>
        <NonCapButton size='small'
            disabled={disableButtons}
            onClick={resetHandler}>
            Reset
        </NonCapButton>
    </ButtonGroup>);
};

export default observer(PreviewResetButtons);

