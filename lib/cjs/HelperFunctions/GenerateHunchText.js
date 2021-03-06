"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHunchText = void 0;
var generateHunchText = function (type, content, label) {
    switch (type) {
        case 'categorical':
            return "The category should be ".concat(content);
        case 'manipulations':
        case 'data space':
            return "The value should be ".concat(content);
        case 'exclusion':
            return "".concat(label, " should not exist");
        case 'inclusion':
            return "There should be ".concat(label, " with value of ").concat(content);
        case 'range':
            var parsedRange = JSON.parse('[' + content + ']');
            return "The value should be between ".concat(parsedRange[0], " and ").concat(parsedRange[1]);
        case 'model':
            return "All values should move as ".concat(content);
        case 'sketch':
            return 'A sketch';
        default: {
            return content;
        }
    }
};
exports.generateHunchText = generateHunchText;
