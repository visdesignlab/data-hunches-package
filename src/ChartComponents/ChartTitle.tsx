import { Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { DataPreset, margin, DarkGray } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { ContainerDiv } from "../Interfaces/StyledComponents";

const ChartTitle: FC = () => {

    const store = useContext(Store);
    return (
        <ContainerDiv>

            <Typography
                style={{ fontSize: 'xx-large', color: DarkGray }}
            >
                {DataPreset[store.dbTag].name}
            </Typography>

            <div style={{ textAlign: 'start', color: DarkGray }}>
                {DataPreset[store.dbTag].explanation}
            </div>

        </ContainerDiv >
    );
};

export default observer(ChartTitle);