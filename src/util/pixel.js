// eslint-disable-next-line no-unused-vars
import Color from "./color";

/**
 * Represents a pixel with its position, size, and color.
 */
export default class Pixel {
    /**
     * Creates a new instance of the Pixel class.
     * @param {number} x - The x-coordinate of the pixel.
     * @param {number} y - The y-coordinate of the pixel.
     * @param {number} width - The width of the pixel.
     * @param {number} height - The height of the pixel.
     * @param {Color} color - The color of the pixel.
     */
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}