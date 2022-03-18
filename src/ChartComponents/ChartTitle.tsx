import { Grid, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { DataPreset, margin } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";

const ChartTitle: FC = () => {

    const store = useContext(Store);
    return (
        <Grid container>
            <Grid item xs={4}>
                {/* <Tooltip title={datasetExplanation} >
                <text
                    x={store.svgWidth * 0.5}
                    y={store.svgHeight - margin.bottom}
                    alignmentBaseline='hanging'
                    textAnchor="middle"
                    fontSize='large'
                >{store.datasetName}{datasetExplanation.length > 0 ? '*' : ''}</text>
            </Tooltip> */}
                <Typography
                    style={{ fontSize: 'xxx-large' }}
                >
                    {DataPreset[store.dbTag].name}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <div>
                    {DataPreset[store.dbTag].explanation}
                </div>
            </Grid>
        </Grid >
    );
};

export default observer(ChartTitle);