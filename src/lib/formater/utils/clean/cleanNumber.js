"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanNumber = void 0;
var utils_1 = require("../../utils");
/**
 * Limpia un string de caracteres que no sean números y lo retorna como numero.
 * En caso de que el resultado no sea numérico, arroja un TypeError.
 *
 * @param value
 * @throws {TypeError}
 */
var cleanNumber = function (value) {
    var cleaned = Number.parseFloat(value.replace(utils_1.onlyNumbersRegex, ''));
    if (Number.isInteger(cleaned)) {
        return cleaned;
    }
    throw new TypeError('El valor no es numérico');
};
exports.cleanNumber = cleanNumber;
//# sourceMappingURL=cleanNumber.js.map