"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClpModel = void 0;
var utils_1 = require("../../utils");
/**
 * Clase que representa un peso chileno.
 * @property {number} value - Valor del peso.
 * @property {string} formatted - Valor del peso formateado con puntos.
 * @property {string} formattedWithSign - Valor del peso con signo peso y puntos.
 */
var ClpModel = /** @class */ (function () {
    /**
     * Crea el valor de un CLP usando un número entero.
     * Si es un float se truncara.
     *
     * @param value
     */
    function ClpModel(value) {
        this._value = Math.trunc(value);
    }
    Object.defineProperty(ClpModel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClpModel.prototype, "formatted", {
        /**
         * Obtiene el valor con puntos.
         *
         * Ejemplo:
         * ```js
         * const clp = new Clp(1000);
         * clp.formatted; // '1.000'
         * ```
         */
        get: function () {
            return (0, utils_1.addDotsToNumber)(this.value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClpModel.prototype, "formattedWithSign", {
        /**
         * Obtiene el valor con puntos y signo peso.
         *
         * Ejemplo:
         * ```js
         * const clp = new Clp(1000);
         * clp.formatted; // '$1.000'
         * ```
         */
        get: function () {
            return (0, utils_1.addSignAndDotsToNumber)(this.value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Crea un CLP usando un string con el valor.
     * Esta solución no acepta valores float, ya que los puntos se interpretan
     * como separaciones de miles.
     * @param value
     *
     * Ejemplo:
     * ```js
     * const clp = new Clp.fromString('$1.000');
     * clp.value; // 1000
     * ```
     */
    ClpModel.fromString = function (value) {
        return new ClpModel((0, utils_1.cleanNumber)(value));
    };
    return ClpModel;
}());
exports.ClpModel = ClpModel;
//# sourceMappingURL=Clp.model.js.map