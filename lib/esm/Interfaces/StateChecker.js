export var stateUpdateWrapperUseJSON = function (oldState, newState, updateFunction) {
    if (JSON.stringify(oldState) !== JSON.stringify(newState)) {
        updateFunction(newState);
    }
};
