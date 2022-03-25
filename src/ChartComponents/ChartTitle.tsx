import { Typography, Link } from "@material-ui/core";
import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { margin, DarkGray, DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import { DataPreset } from "../Interfaces/Datasets";
import Store from "../Interfaces/Store";
import { ContainerDiv } from "../Interfaces/StyledComponents";

const ChartTitle: FC = () => {

    const store = useContext(Store);
    const placeFormLowerRightCorner = () => {
        select('#form-component')
            .attr('x', store.svgWidth - DefaultForeignObjectWidth)
            .attr('y', store.svgHeight - DefaultForeignObjectHeight);
        store.setCurrentSelectedDP(undefined);
    };
    return (
        <ContainerDiv>
            <div style={{ display: 'flow-root' }}>
                <Typography
                    style={{ fontSize: 'xx-large', color: DarkGray, float: 'left' }}
                >
                    {DataPreset[store.dbTag].name}
                </Typography>

                <div style={{ float: 'right', fontSize: 'smaller', }}>
                    <Link onClick={() => {
                        store.setInputMode('annotation');
                        placeFormLowerRightCorner();
                    }}>
                        Add an annotation about the chart
                    </Link>
                </div>
            </div>
            <div style={{ textAlign: 'start', color: DarkGray }}>
                {DataPreset[store.dbTag].explanation}
            </div>

        </ContainerDiv >
    );
};

export default observer(ChartTitle);