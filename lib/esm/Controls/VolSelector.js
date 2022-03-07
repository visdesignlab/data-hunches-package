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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, ButtonGroup, Menu, MenuItem } from "@material-ui/core";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { firebaseSetup } from "../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import Store from "../Interfaces/Store";
import AddIcon from '@material-ui/icons/Add';
import NewVolDialog from "./NewVolDialog";
var VolSelector = function () {
    var store = useContext(Store);
    var _a = useState(false), openDialog = _a[0], setOpenDialog = _a[1];
    var _b = useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var _c = useState([]), subArray = _c[0], setSubArray = _c[1];
    var open = Boolean(anchorEl);
    var handleMenu = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var sendDialogSignal = function (input) {
        setOpenDialog(input);
    };
    useEffect(function () {
        //get how many subs there are
        var attrRef = doc(firebaseSetup, store.datasetName, 'attr');
        var tempSubArray = [];
        getDoc(attrRef).then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
            var numberOfSubs, i, subName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!result.exists()) return [3 /*break*/, 5];
                        numberOfSubs = result.data().subs;
                        i = 1;
                        _a.label = 1;
                    case 1:
                        if (!(i <= numberOfSubs)) return [3 /*break*/, 4];
                        return [4 /*yield*/, getDoc(doc(firebaseSetup, store.datasetName, "sub".concat(i)))];
                    case 2:
                        subName = _a.sent();
                        if (subName.exists()) {
                            tempSubArray.push(subName.data().name);
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        // attr doesn't exist, this is a new DB, add it.
                        setDoc(doc(collection(firebaseSetup, store.datasetName), 'attr'), { subs: 1 });
                        setDoc(doc(collection(firebaseSetup, store.datasetName), 'sub1'), { name: 'default1' });
                        tempSubArray.push('default1');
                        _a.label = 6;
                    case 6:
                        stateUpdateWrapperUseJSON(subArray, tempSubArray, setSubArray);
                        return [2 /*return*/];
                }
            });
        }); });
    }, [openDialog]);
    return (_jsxs(_Fragment, { children: [_jsxs(ButtonGroup, __assign({ style: { paddingRight: '5px' } }, { children: [_jsx(Button, __assign({ size: 'small', variant: "outlined", onClick: handleMenu, color: "primary" }, { children: "Select Vol" }), void 0), _jsxs(Menu, __assign({ id: "menu-appbar", anchorEl: anchorEl, keepMounted: true, open: open, onClose: handleClose }, { children: [subArray.map(function (d, i) {
                                return (_jsx(MenuItem, __assign({ onClick: function () {
                                        store.setCurrentVol(i + 1);
                                        handleClose();
                                    } }, { children: d }), "SubItem".concat(d)));
                            }), _jsxs(MenuItem, __assign({ onClick: function () { sendDialogSignal(true); } }, { children: [_jsx(AddIcon, {}, void 0), "Start new volume"] }), void 0)] }), void 0)] }), void 0), _jsx(NewVolDialog, { open: openDialog, sendCloseSignal: sendDialogSignal }, void 0)] }, void 0));
};
export default observer(VolSelector);
