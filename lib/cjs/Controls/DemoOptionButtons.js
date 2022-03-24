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
var StateChecker_1 = require("../Interfaces/StateChecker");
var Store_1 = __importDefault(require("../Interfaces/Store"));
var NewVolDialog_1 = __importDefault(require("./NewVolDialog"));
var StyledComponents_1 = require("../Interfaces/StyledComponents");
var DemoOptionButtons = function () {
    var store = (0, react_1.useContext)(Store_1.default);
    var styles = (0, StyledComponents_1.useStyles)();
    var _a = (0, react_1.useState)(false), openDialog = _a[0], setOpenDialog = _a[1];
    var _b = (0, react_1.useState)([]), subArray = _b[0], setSubArray = _b[1];
    var handleVolChange = function (e) {
        var result = e.target.value;
        if (result === 'new') {
            sendDialogSignal(true);
        }
        else {
            store.setCurrentVol(result);
        }
    };
    var sendDialogSignal = function (input) {
        setOpenDialog(input);
    };
    var handleDBChange = function (e) {
        store.setDBTag(e.target.value);
    };
    (0, react_1.useEffect)(function () {
        //get how many subs there are
        var attrRef = (0, lite_1.doc)(Constants_1.firebaseSetup, store.dbTag, 'attr');
        var tempSubArray = [];
        (0, lite_1.getDoc)(attrRef).then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
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
                        return [4 /*yield*/, (0, lite_1.getDoc)((0, lite_1.doc)(Constants_1.firebaseSetup, store.dbTag, "sub".concat(i)))];
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
                        (0, lite_1.setDoc)((0, lite_1.doc)((0, lite_1.collection)(Constants_1.firebaseSetup, store.dbTag), 'attr'), { subs: 1 });
                        (0, lite_1.setDoc)((0, lite_1.doc)((0, lite_1.collection)(Constants_1.firebaseSetup, store.dbTag), 'sub1'), { name: 'default1', nextIndex: 0 });
                        tempSubArray.push('default1');
                        _a.label = 6;
                    case 6:
                        (0, StateChecker_1.stateUpdateWrapperUseJSON)(subArray, tempSubArray, setSubArray);
                        return [2 /*return*/];
                }
            });
        }); });
    }, [openDialog, store.dbTag]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [Constants_1.DataPreset[store.dbTag].categories.length > 0 ?
                (0, jsx_runtime_1.jsx)(StyledComponents_1.NonCapButton, __assign({ size: 'small', variant: 'outlined', color: store.showCategory ? 'primary' : 'default', onClick: function () {
                        store.setShowCategory(!store.showCategory);
                    } }, { children: "Show Category" }), void 0) :
                (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}, void 0), (0, jsx_runtime_1.jsxs)(core_1.FormControl, __assign({ style: { marginRight: '5px', marginLeft: '5px' } }, { children: [(0, jsx_runtime_1.jsx)(core_1.InputLabel, { children: "Select Data" }, void 0), (0, jsx_runtime_1.jsx)(core_1.Select, __assign({ className: styles.inputSelect, native: true, value: store.dbTag, onChange: handleDBChange }, { children: Object.keys(Constants_1.DataPreset).map(function (d) {
                            return ((0, jsx_runtime_1.jsx)("option", __assign({ value: d }, { children: Constants_1.DataPreset[d].name }), "SelectDB".concat(d)));
                        }) }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)(core_1.FormControl, __assign({ style: { marginRight: '5px', marginLeft: '5px' } }, { children: [(0, jsx_runtime_1.jsx)(core_1.InputLabel, { children: "Data Hunch Demos" }, void 0), (0, jsx_runtime_1.jsxs)(core_1.Select, __assign({ className: styles.inputSelect, native: true, value: store.currentVol, onChange: handleVolChange }, { children: [subArray.map(function (d, i) {
                                return ((0, jsx_runtime_1.jsx)("option", __assign({ value: i + 1 }, { children: d }), "SubItem".concat(d)));
                            }), (0, jsx_runtime_1.jsx)("option", __assign({ value: 'new' }, { children: "Start new volume" }), void 0)] }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(NewVolDialog_1.default, { open: openDialog, sendCloseSignal: sendDialogSignal }, void 0)] }, void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(DemoOptionButtons);
