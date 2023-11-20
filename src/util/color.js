/**
 * Represents a color with red, green, blue, and alpha channels.
 */
export default class Color {
    /**
     * Creates a new Color instance.
     * @param {number} r - The red channel value (0-255).
     * @param {number} g - The green channel value (0-255).
     * @param {number} b - The blue channel value (0-255).
     * @param {number} [a=255] - The alpha channel value (0-255). Defaults to 255 if not provided.
     */
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a ?? 255;
    }

    equals(other) {
        return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
    }

    /**
     * Converts the color to a hexadecimal representation.
     * @returns {string} The color in hexadecimal format.
     */
    toHex() {
        return '#' + this.r.toString(16).padStart(2, '0') + this.g.toString(16).padStart(2, '0') + this.b.toString(16).padStart(2, '0');
    }

    /**
     * Converts the color to an RGBA representation.
     * @returns {string} The color in RGBA format.
     */
    toRGBA() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    /**
     * Creates a Color instance from a hexadecimal color code.
     * @param {string} hex - The hexadecimal color code.
     * @returns {Color} The Color instance representing the given color code.
     * @throws {Error} If the provided hex code is invalid.
     */
    static fromHex(hex) {
        const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        if (!match) throw new Error('Invalid hex code.');
        return new Color(parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16));
    }

    /**
     * Creates a Color instance from an RGBA color code.
     * @param {string} rgba - The RGBA color code.
     * @returns {Color} The Color instance representing the given color code.
     * @throws {Error} If the provided RGBA code is invalid.
     */
    static fromRGBA(rgba) {
        const match = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/i);
        if (!match) throw new Error('Invalid RGBA code.');
        return new Color(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4]));
    }

    static fromColor(color) {
        return new Color(color.r, color.g, color.b, color.a);
    }
}