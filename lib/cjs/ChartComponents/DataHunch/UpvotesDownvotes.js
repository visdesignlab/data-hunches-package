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
exports.toVoteDH = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var core_1 = require("@material-ui/core");
var Store_1 = __importDefault(require("../../Interfaces/Store"));
var lite_1 = require("firebase/firestore/lite");
var react_1 = require("react");
var Constants_1 = require("../../Interfaces/Constants");
var ThumbUp_1 = __importDefault(require("@material-ui/icons/ThumbUp"));
var ThumbDown_1 = __importDefault(require("@material-ui/icons/ThumbDown"));
var mobx_react_lite_1 = require("mobx-react-lite");
var d3_selection_1 = require("d3-selection");
var UpvotesDownvotes = function (_a) {
    var retrieveData = _a.retrieveData, idAssignment = _a.idAssignment;
    var store = (0, react_1.useContext)(Store_1.default);
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
                    return [4 /*yield*/, (0, lite_1.updateDoc)((0, lite_1.doc)((0, lite_1.collection)(Constants_1.firebaseSetup, store.dbTag, "sub".concat(store.currentVol), "dhs"), store.votingDH.id.toString()), updateResult)];
                case 1:
                    _a.sent();
                    retrieveData();
                    _a.label = 2;
                case 2:
                    store.setVotingDH(undefined);
                    (0, d3_selection_1.select)('#upvote-downvote-FO')
                        .attr('display', 'none');
                    (0, d3_selection_1.select)('#upvote-downvote')
                        .style('display', 'none');
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(core_1.Container, __assign({ id: idAssignment, style: {
            textAlign: 'start',
            zIndex: 1000,
            position: 'absolute',
            display: idAssignment ? 'none' : undefined,
            width: Constants_1.UpDownVoteFOWidth,
            backgroundColor: 'rgb(238, 238, 238, 0.8)'
        } }, { children: (0, jsx_runtime_1.jsxs)(core_1.ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(core_1.IconButton, __assign({ onClick: function () { onClickVote(true); } }, { children: (0, jsx_runtime_1.jsx)(ThumbUp_1.default, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)(core_1.IconButton, __assign({ onClick: function () { onClickVote(false); } }, { children: (0, jsx_runtime_1.jsx)(ThumbDown_1.default, {}, void 0) }), void 0)] }, void 0) }), void 0));
};
exports.default = (0, mobx_react_lite_1.observer)(UpvotesDownvotes);
var toVoteDH = function (e, svgWidth, svgHeight, isFO) {
    e.preventDefault();
    var xLoc, yLoc;
    (0, d3_selection_1.select)('#upvote-downvote-FO')
        .attr('display', 'none');
    (0, d3_selection_1.select)('#upvote-downvote')
        .style('display', 'none');
    if (isFO) {
        xLoc = ((0, d3_selection_1.pointer)(e)[0] + Constants_1.UpDownVoteFOWidth) > svgWidth ? ((0, d3_selection_1.pointer)(e)[0] - Constants_1.UpDownVoteFOWidth) : (0, d3_selection_1.pointer)(e)[0];
        yLoc = ((0, d3_selection_1.pointer)(e)[1] + Constants_1.UpDownVoteFOHeight) > svgHeight ? ((0, d3_selection_1.pointer)(e)[1] - Constants_1.UpDownVoteFOHeight) : (0, d3_selection_1.pointer)(e)[1];
    }
    else {
        xLoc = (0, d3_selection_1.pointer)(e, (0, d3_selection_1.select)('#app-div').node())[0];
        yLoc = (0, d3_selection_1.pointer)(e, (0, d3_selection_1.select)('#app-div').node())[1];
    }
    if (isFO) {
        (0, d3_selection_1.select)('#upvote-downvote-FO')
            .attr('display', null)
            .attr('x', xLoc)
            .attr('y', yLoc);
    }
    else {
        (0, d3_selection_1.select)('#upvote-downvote')
            .style('display', null)
            .style('left', "".concat(xLoc, "px"))
            .style('top', "".concat(yLoc, "px"));
    }
};
exports.toVoteDH = toVoteDH;
