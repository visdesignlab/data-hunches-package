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
var mobx_react_lite_1 = require("mobx-react-lite");
var FormComponent = function () {
    return ((0, jsx_runtime_1.jsx)("foreignObject", __assign({ id: 'form-component' }, { children: (0, jsx_runtime_1.jsx)("div", {}, void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(FormComponent);
