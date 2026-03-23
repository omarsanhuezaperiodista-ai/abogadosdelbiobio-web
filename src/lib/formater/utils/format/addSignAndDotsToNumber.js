"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSignAndDotsToNumber = void 0;
var utils_1 = require("../../utils");
/**
 * Agrega puntos y signo peso a un número.
 * Si es float, lo truncará.
 *
 * @param number
 */
var addSignAndDotsToNumber = function (number) {
    return "$".concat((0, utils_1.addDotsToNumber)(number));
};
exports.addSignAndDotsToNumber = addSignAndDotsToNumber;
//# sourceMappingURL=addSignAndDotsToNumber.js.map