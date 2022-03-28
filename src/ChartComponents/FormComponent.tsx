import { select } from "d3-selection";
import { observer } from "mobx-react-lite";
import { useContext, useLayoutEffect } from "react";
import { FC } from "react";
import { DefaultForeignObjectHeight, DefaultForeignObjectWidth } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
import AnnotationForm from "./Forms/AnnotationForm";
import CategoricalForm from "./Forms/CategoricalForm";
import DataSpaceForm from "./Forms/DataSpaceForm";
import ManipulationForm from "./Forms/ManipulationForm";
import ModelInputForm from "./Forms/ModelInputForm";
import RatingForm from "./Forms/RatingForm";

const FormComponent: FC = () => {

    const store = useContext(Store);


    const decide = () => {
        switch (store.inputMode) {
            case 'categorical':
                return <CategoricalForm />;
            case 'model':
                return <ModelInputForm />;
            case 'rating':
                return <RatingForm />;
            case 'data space':
            case 'inclusion':
                return <DataSpaceForm isInc={store.inputMode === 'inclusion'} />;
            case 'annotation':
                return <AnnotationForm />;
            default:
                return <ManipulationForm manipulationOutput={store.selectedDP ? store.selectedDP : ''} type='exclusion' />;
        }
    };

    useLayoutEffect(() => {
        if (store.inputMode === 'none') {
            select('#form-component')
                .style('display', 'none');
        } else {
            select('#form-component')
                .style('display', null);
        }
    }, [store.inputMode]);

    return (
        <div id='form-component'
            style={{
                textAlign: 'start',
                zIndex: 1000,
                position: 'absolute',
                display: 'none',
                // width: UpDownVoteFOWidth,
                backgroundColor: 'rgb(238, 238, 238, 0.8)'
            }}
        // display={!['none', 'manipulations', 'sketch', 'range'].includes(store.inputMode) ? undefined : 'none'}
        // width={DefaultForeignObjectWidth}
        // height={DefaultForeignObjectHeight}
        >
            {/* {formContent[store.inputMode]} */}
            {decide()}
        </div>
    );
};

export default observer(FormComponent);