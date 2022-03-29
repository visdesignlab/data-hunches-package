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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { firebaseSetup } from "../Interfaces/Constants";
import Store from "../Interfaces/Store";
var NewVolDialog = function (_a) {
    var open = _a.open, sendCloseSignal = _a.sendCloseSignal;
    var _b = useState(''), volName = _b[0], setVolName = _b[1];
    var store = useContext(Store);
    var confirmVol = function () { return __awaiter(void 0, void 0, void 0, function () {
        var attrRef, attrResult, numberOfSubs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    attrRef = doc(firebaseSetup, store.dbTag, 'attr');
                    return [4 /*yield*/, getDoc(attrRef)];
                case 1:
                    attrResult = _a.sent();
                    if (!attrResult.exists()) return [3 /*break*/, 4];
                    numberOfSubs = attrResult.data().subs;
                    return [4 /*yield*/, updateDoc(doc(firebaseSetup, store.dbTag, 'attr'), {
                            subs: numberOfSubs + 1
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, setDoc(doc(collection(firebaseSetup, store.dbTag), "sub".concat(numberOfSubs + 1)), { name: volName, nextIndex: 0 })];
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
    return (_jsxs(Dialog, __assign({ open: open, onClose: function () { sendCloseSignal(false); } }, { children: [_jsx(DialogTitle, { children: "Add new volume for data hunch" }, void 0), _jsx(DialogContent, { children: _jsx(TextField, { autoFocus: true, id: 'new_vol_name', label: 'New Volume Name', fullWidth: true, value: volName, onChange: handleNameChange }, void 0) }, void 0), _jsxs(DialogActions, { children: [_jsx(Button, __assign({ onClick: function () { sendCloseSignal(false); } }, { children: "Cancel" }), void 0), _jsx(Button, __assign({ color: 'primary', onClick: confirmVol }, { children: "Confirm" }), void 0)] }, void 0)] }), void 0));
};
export default observer(NewVolDialog);
