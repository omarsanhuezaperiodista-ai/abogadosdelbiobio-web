"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDotsToNumber = void 0;
/**
 * Agrega puntos a un número.
 * Si es float, lo truncará.
 *
 * @param number
 */
var addDotsToNumber = function (number) {
    return Math.trunc(number)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
exports.addDotsToNumber = addDotsToNumber;
//# sourceMappingURL=addDotsToNumber.js.map