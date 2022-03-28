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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, ButtonGroup, IconButton } from "@material-ui/core";
import Store from "../../Interfaces/Store";
import { updateDoc, deleteDoc, doc, collection } from "firebase/firestore/lite";
import { useContext, useLayoutEffect } from "react";
import { firebaseSetup } from "../../Interfaces/Constants";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { observer } from "mobx-react-lite";
import { pointer, select } from "d3-selection";
var UpvotesDownvotes = function (_a) {
    var retrieveData = _a.retrieveData;
    var store = useContext(Store);
    var onClickVote = function (isUpvote) { return __awaiter(void 0, void 0, void 0, function () {
        var updateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!store.votingDH) return [3 /*break*/, 2];
                    updateResult = void 0;
                    if (isUpvote) {
                        updateResult = { upvotes: (parseInt(store.votingDH.upvotes) + 1).toString() };
                    }
                    else {
                        updateResult = { downvotes: (parseInt(store.votingDH.downvotes) + 1).toString() };
                    }
                    return [4 /*yield*/, updateDoc(doc(collection(firebaseSetup, store.dbTag, "sub".concat(store.currentVol), "dhs"), store.votingDH.id.toString()), updateResult)];
                case 1:
                    _a.sent();
                    retrieveData();
                    store.setVotingDH(undefined);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    useLayoutEffect(function () {
        if (!store.votingDH) {
            select('#upvote-downvote')
                .style('display', 'none');
        }
    }, [store.votingDH]);
    var deleteDH = function (e) {
        var _a;
        //https://firebase.google.com/docs/firestore/manage-data/delete-data
        if (store.votingDH) {
            deleteDoc(doc(firebaseSetup, store.dbTag, "sub".concat(store.currentVol), 'dhs', (_a = store.votingDH) === null || _a === void 0 ? void 0 : _a.id.toString())).then(function (output) {
                store.setTotalDH(store.numOfDH - 1);
            }).catch(function (error) { console.log(error); });
        }
    };
    return (_jsx(Container, __assign({ id: 'upvote-downvote', style: {
            textAlign: 'start',
            zIndex: 1000,
            position: 'absolute',
            display: 'none',
            width: 'auto',
            backgroundColor: 'rgb(238, 238, 238, 0.8)'
        } }, { children: _jsxs(ButtonGroup, { children: [_jsx(IconButton, __assign({ onClick: function () { onClickVote(true); } }, { children: _jsx(ThumbUpIcon, {}, void 0) }), void 0), _jsx(IconButton, __assign({ onClick: function () { onClickVote(false); } }, { children: _jsx(ThumbDownIcon, {}, void 0) }), void 0), store.votingDH ? ((store.votingDH.user === store.userName || store.votingDH.user === 'Guest') ?
                    _jsx(IconButton, __assign({ onClick: deleteDH }, { children: _jsx(DeleteForeverIcon, {}, void 0) }), void 0) : _jsx(_Fragment, {}, void 0))
                    : _jsx(_Fragment, {}, void 0)] }, void 0) }), void 0));
};
export default observer(UpvotesDownvotes);
export var toVoteDH = function (e, svgWidth, svgHeight) {
    e.preventDefault();
    var xLoc, yLoc;
    select('#upvote-downvote')
        .style('display', 'none');
    xLoc = pointer(e, select('#app-div').node())[0];
    yLoc = pointer(e, select('#app-div').node())[1];
    select('#upvote-downvote')
        .style('display', null)
        .style('left', "".concat(xLoc, "px"))
        .style('top', "".concat(yLoc, "px"));
};
