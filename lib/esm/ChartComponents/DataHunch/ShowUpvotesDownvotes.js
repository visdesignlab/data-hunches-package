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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { observer } from "mobx-react-lite";
var ShowUpvotesDownvotes = function (_a) {
    var dataHunch = _a.dataHunch, xPos = _a.xPos, yPos = _a.yPos;
    return (_jsx("foreignObject", __assign({ x: xPos, y: yPos, width: 50, height: 55 }, { children: _jsxs("div", __assign({ id: "UpDownVotes-Tooltip" }, { children: [_jsxs("div", { children: [_jsx(ThumbUpIcon, {}, void 0), dataHunch ? dataHunch.upvotes : 0] }, void 0), _jsxs("div", { children: [_jsx(ThumbDownIcon, {}, void 0), dataHunch ? dataHunch.downvotes : 0] }, void 0)] }), void 0) }), void 0));
};
export default observer(ShowUpvotesDownvotes);
