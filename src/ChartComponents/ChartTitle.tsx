import { Container, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { DataPreset, margin, DarkGray } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";

const ChartTitle: FC = () => {

    const store = useContext(Store);
    return (
        <Container>

            <Typography
                style={{ fontSize: 'xx-large', color: DarkGray }}
            >
                {DataPreset[store.dbTag].name}
            </Typography>

            <div style={{ textAlign: 'start', color: DarkGray }}>
                {DataPreset[store.dbTag].explanation}
            </div>

        </Container >
    );
};

export default observer(ChartTitle);