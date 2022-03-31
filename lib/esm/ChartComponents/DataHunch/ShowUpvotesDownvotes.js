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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { DataHunchColor } from '../../Interfaces/Constants';
var ShowUpvotesDownvotes = function (_a) {
    var dataHunch = _a.dataHunch, xPos = _a.xPos, yPos = _a.yPos;
    return (_jsx("foreignObject", __assign({ x: xPos, y: yPos, width: 50, height: 55 }, { children: _jsxs("div", __assign({ id: "UpDownVotes-Tooltip" }, { children: [dataHunch.upvotes > 0 ? _jsxs("div", __assign({ style: { color: DataHunchColor } }, { children: [_jsx("i", { className: "fa-solid fa-thumbs-up" }, void 0), dataHunch.upvotes] }), void 0) : _jsx(_Fragment, {}, void 0), dataHunch.downvotes > 0 ? _jsxs("div", __assign({ style: { color: DataHunchColor } }, { children: [_jsx("i", { className: "fa-solid fa-thumbs-down" }, void 0), dataHunch.downvotes] }), void 0) : _jsx(_Fragment, {}, void 0)] }), void 0) }), void 0));
};
export default observer(ShowUpvotesDownvotes);
