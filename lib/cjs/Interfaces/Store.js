"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootStore = void 0;
var d3_selection_1 = require("d3-selection");
var mobx_1 = require("mobx");
var react_1 = require("react");
var lite_1 = require("firebase/firestore/lite");
var Constants_1 = require("./Constants");
var RootStore = /** @class */ (function () {
    function RootStore() {
        this.showDataHunches = true;
        this.containCategory = [];
        this.svgHeight = 500;
        this.svgWidth = 500;
        this.selectingADataPoint = false;
        this.needToShowPreview = false;
        this.selectedDP = undefined;
        this.inputMode = 'none';
        this.userName = '';
        this.selectedDH = [];
        this.highlightedDH = -1;
        this.datasetName = '';
        this.nextIndex = 0;
        this.numOfDH = 0;
        this.currentVol = 1;
        (0, mobx_1.makeAutoObservable)(this);
    }
    RootStore.prototype.setUserName = function (input) {
        this.userName = input;
    };
    RootStore.prototype.setSelectedDH = function (input) {
        this.selectedDH = input;
    };
    RootStore.prototype.setHighlightedDH = function (input) {
        this.highlightedDH = input;
    };
    RootStore.prototype.setNeedToShowPreview = function (input) {
        this.needToShowPreview = input;
    };
    RootStore.prototype.setDataSetName = function (input) {
        this.datasetName = input;
    };
    RootStore.prototype.setNextIndex = function (input) {
        this.nextIndex = input;
    };
    RootStore.prototype.setTotalDH = function (input) {
        this.numOfDH = input;
    };
    RootStore.prototype.setCurrentVol = function (input) {
        this.currentVol = input;
    };
    RootStore.prototype.submitDH = function (dataHunchToSubmit) {
        return __awaiter(this, void 0, void 0, function () {
            var databaseRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inputMode = 'none';
                        databaseRef = (0, lite_1.collection)(Constants_1.firebaseSetup, this.datasetName, "sub".concat(this.currentVol), 'dhs');
                        return [4 /*yield*/, (0, lite_1.setDoc)((0, lite_1.doc)((0, lite_1.collection)(Constants_1.firebaseSetup, this.datasetName), "sub".concat(this.currentVol)), { nextIndex: this.nextIndex + 1 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, lite_1.setDoc)((0, lite_1.doc)(databaseRef, this.nextIndex.toString()), dataHunchToSubmit)];
                    case 2:
                        _a.sent();
                        this.setNextIndex(this.nextIndex + 1);
                        this.setTotalDH(this.numOfDH + 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    RootStore.prototype.setWidth = function (newWidth) {
        this.svgWidth = newWidth;
    };
    RootStore.prototype.setHeight = function (newHeight) {
        this.svgHeight = newHeight;
    };
    RootStore.prototype.setContainCategory = function (input) {
        this.containCategory = input;
    };
    RootStore.prototype.setShowDH = function (input) {
        this.showDataHunches = input;
    };
    RootStore.prototype.setInputMode = function (input) {
        this.inputMode = input;
    };
    RootStore.prototype.selectADataPointMode = function (input) {
        this.selectingADataPoint = input;
        // if it is false, hiding elemtns
        if (!input) {
            (0, d3_selection_1.select)('#specific-control')
                .attr('display', 'none');
        }
    };
    RootStore.prototype.setCurrentSelectedDP = function (input) {
        this.selectedDP = input;
    };
    return RootStore;
}());
exports.RootStore = RootStore;
var Store = (0, react_1.createContext)(new RootStore());
exports.default = Store;
