"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateUpdateWrapperUseJSON = void 0;
var stateUpdateWrapperUseJSON = function (oldState, newState, updateFunction) {
    if (JSON.stringify(oldState) !== JSON.stringify(newState)) {
        updateFunction(newState);
    }
};
exports.stateUpdateWrapperUseJSON = stateUpdateWrapperUseJSON;
