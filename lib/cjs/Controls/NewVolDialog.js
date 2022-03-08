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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var lite_1 = require("firebase/firestore/lite");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var Constants_1 = require("../Interfaces/Constants");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var NewVolDialog = function (_a) {
    var open = _a.open, sendCloseSignal = _a.sendCloseSignal;
    var _b = (0, react_1.useState)(''), volName = _b[0], setVolName = _b[1];
    var store = (0, react_1.useContext)(Store_1.default);
    var confirmVol = function () { return __awaiter(void 0, void 0, void 0, function () {
        var attrRef, attrResult, numberOfSubs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attrRef = (0, lite_1.doc)(Constants_1.firebaseSetup, store.datasetName, 'attr');
                    return [4 /*yield*/, (0, lite_1.getDoc)(attrRef)];
                case 1:
                    attrResult = _a.sent();
                    if (!attrResult.exists()) return [3 /*break*/, 4];
                    numberOfSubs = attrResult.data().subs;
                    return [4 /*yield*/, (0, lite_1.updateDoc)((0, lite_1.doc)(Constants_1.firebaseSetup, store.datasetName, 'attr'), {
                            subs: numberOfSubs + 1
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, lite_1.setDoc)((0, lite_1.doc)((0, lite_1.collection)(Constants_1.firebaseSetup, store.datasetName), "sub".concat(numberOfSubs + 1)), { name: volName })];
                case 3:
                    _a.sent();
                    sendCloseSignal(false);
                    store.setCurrentVol(numberOfSubs + 1);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleNameChange = function (e) {
        setVolName(e.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)(core_1.Dialog, __assign({ open: open, onClose: function () { sendCloseSignal(false); } }, { children: [(0, jsx_runtime_1.jsx)(core_1.DialogTitle, { children: "Add new volume for data hunch" }, void 0), (0, jsx_runtime_1.jsx)(core_1.DialogContent, { children: (0, jsx_runtime_1.jsx)(core_1.TextField, { autoFocus: true, id: 'new_vol_name', label: 'New Volume Name', fullWidth: true, value: volName, onChange: handleNameChange }, void 0) }, void 0), (0, jsx_runtime_1.jsxs)(core_1.DialogActions, { children: [(0, jsx_runtime_1.jsx)(core_1.Button, __assign({ onClick: function () { sendCloseSignal(false); } }, { children: "Cancel" }), void 0), (0, jsx_runtime_1.jsx)(core_1.Button, __assign({ color: 'primary', onClick: confirmVol }, { children: "Confirm" }), void 0)] }, void 0)] }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(NewVolDialog);
