/**
 * Clase que representa un peso chileno.
 * @property {number} value - Valor del peso.
 * @property {string} formatted - Valor del peso formateado con puntos.
 * @property {string} formattedWithSign - Valor del peso con signo peso y puntos.
 */
export declare class ClpModel {
    private _value;
    get value(): number;
    set value(value: number);
    /**
     * Obtiene el valor con puntos.
     *
     * Ejemplo:
     * ```js
     * const clp = new Clp(1000);
     * clp.formatted; // '1.000'
     * ```
     */
    get formatted(): string;
    /**
     * Obtiene el valor con puntos y signo peso.
     *
     * Ejemplo:
     * ```js
     * const clp = new Clp(1000);
     * clp.formatted; // '$1.000'
     * ```
     */
    get formattedWithSign(): string;
    /**
     * Crea el valor de un CLP usando un número entero.
     * Si es un float se truncara.
     *
     * @param value
     */
    constructor(value: number);
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
    static fromString(value: string): ClpModel;
}
