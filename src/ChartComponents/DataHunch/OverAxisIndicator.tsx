import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { DataContext } from "../..";
import { makeBandScale, makeVerticalScale } from "../../HelperFunctions/ScaleGenerator";
import { margin, DarkGray } from "../../Interfaces/Constants";
import Store from "../../Interfaces/Store";
import { DHIndicatorRect } from "../../Interfaces/StyledComponents";
import { DataHunch } from "../../Interfaces/Types";
import { handlePreviewOnClick, handleResetOnClick } from "../Forms/PreviewResetButtons";
type Props = {
    dataHunch: DataHunch;
};
const OverAxisIndicator: FC<Props> = ({ dataHunch }: Props) => {
    const store = useContext(Store);

    const dataSet = useContext(DataContext);

    const [needReset, setNeedReset] = useState(false);

    const honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);

    useEffect(() => {
        if (store.selectedDH === dataHunch.id) {
            store.setNeedToShowPreview(true);
            setNeedReset(true);
            handlePreviewOnClick(dataSet, dataHunch.label, parseFloat(dataHunch.content), store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP,);
        } else if (store.selectedDH !== dataHunch.id && needReset) {
            store.setNeedToShowPreview(false);
            setNeedReset(false);
            handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
        }
    }, [store.selectedDH]);

    return (
        <g
            cursor='pointer'
            onMouseOver={() => {
                store.setSelectedDH(dataHunch.id);
                store.setHighlightedDH(dataHunch.id);
            }}
            onMouseOut={() => {
                store.setSelectedDH(-1);
                store.setHighlightedDH(-1);
            }}
        >
            <line
                x1={(honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth()}
                x2={(honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth()}
                stroke={DarkGray}
                strokeWidth={4}
                y1={margin.top - 5}
                y2={margin.top - 20} />
            <polygon
                points="0,0 7,5 -7,5"
                fill={DarkGray}
                stroke='none'
                transform={`translate(${(honrizontalBandScale(dataHunch.label) || 0) + 0.5 * honrizontalBandScale.bandwidth()},${margin.top - 20})`}
            />
            <DHIndicatorRect

                x={honrizontalBandScale(dataHunch.label) || 0}
                width={honrizontalBandScale.bandwidth()}
                y={margin.top - 5}

            />
        </g>
    );
};

export default observer(OverAxisIndicator);