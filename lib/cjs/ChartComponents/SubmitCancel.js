"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var mobx_react_1 = require("mobx-react");
var SubmitCancel = function (_a) {
    var dhToSubmit = _a.dhToSubmit;
    return ((0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, __assign({ size: 'small' }, { children: "Submit" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ size: 'small' }, { children: "Cancel" }), void 0)] }, void 0));
};
exports.default = (0, mobx_react_1.observer)(SubmitCancel);
