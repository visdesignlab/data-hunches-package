import { Button, ButtonGroup, Container } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useContext, } from "react";
import { FC } from "react";
import { ControlFOHeight, ControlFOWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import { useStyles } from "../Interfaces/StyledComponents";

const SpecificControl: FC = () => {
    const store = useContext(Store);
    const styles = useStyles();

    const annotationOnClickHandler = () => {
        store.selectADataPointMode(false);
    };


    return (
        <foreignObject id='specific-control' display='none' width={ControlFOWidth} height={ControlFOHeight}>
            <Container className={styles.foreignObjectContainer} >
                <ButtonGroup
                    // ref={divRef}
                    orientation="vertical"
                    color="primary"
                    aria-label="vertical outlined primary button group"
                >
                    <Button onClick={annotationOnClickHandler}>
                        Annotation
                    </Button>
                    <Button>
                        Direct Manipulation
                    </Button>
                    <Button>
                        Rating
                    </Button>
                    <Button>
                        Data Space
                    </Button>
                </ButtonGroup>
            </Container>
        </foreignObject>
    );
};

export default observer(SpecificControl);