import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
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

    const honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);


    return (
        <g
            cursor='pointer'
            onMouseOver={() => {
                store.setNeedToShowPreview(true);
                handlePreviewOnClick(dataSet, dataHunch.label, parseFloat(dataHunch.content), store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP,);
            }}
            onMouseOut={() => {
                store.setNeedToShowPreview(false);
                handleResetOnClick(dataSet, store.svgHeight, store.svgWidth, store.containCategory, store.selectedDP);
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

                // onMouseOver={() => { store.setHighlightedDH(d.id); }}
                x={honrizontalBandScale(dataHunch.label) || 0}
                width={honrizontalBandScale.bandwidth()}
                y={margin.top - 5}

            />
        </g>
    );
};

export default observer(OverAxisIndicator);