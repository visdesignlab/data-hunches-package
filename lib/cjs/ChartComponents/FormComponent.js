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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var AnnotationForm_1 = __importDefault(require("./AnnotationForm"));
var FormComponent = function () {
    var store = (0, react_1.useContext)(Store_1.default);
    var styles = (0, StyledComponents_1.useStyles)();
    var formContent = {
        annotation: (0, jsx_runtime_1.jsx)(AnnotationForm_1.default, {}, void 0),
    };
    return ((0, jsx_runtime_1.jsx)("foreignObject", __assign({ id: 'form-component', display: store.inputMode !== 'none' ? undefined : 'none', width: Constants_1.DefaultForeignObjectWidth, height: Constants_1.DefaultForeignObjectHeight }, { children: formContent[store.inputMode] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(FormComponent);