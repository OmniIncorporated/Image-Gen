// eslint-disable-next-line no-unused-vars
import Color from "../color";
// eslint-disable-next-line no-unused-vars
import Pixel from "../pixel";

/**
 * Run length encoding
 * @param {Pixel[]} pixels - The pixels to encode.
 * @returns {Pixel[][]}} The encoded pixels.
 */
export default function runLengthEncoding(pixels) {
    const optimizedPixels = [];
    let currentColor = null;
    let startX = 0;
    let startY = 0;
    let width = 0;
    let height = 0;
    for (const pixel of pixels) {
        if (startY !== pixel.y) {
            optimizedPixels.push(new Pixel(startX, startY, width, height, currentColor));
            currentColor = null;
        }

        if (currentColor === null) {
            currentColor = pixel.color;
            startX = pixel.x;
            startY = pixel.y;
            width = pixel.width;
            height = pixel.height;
        } else if (currentColor.equals(pixel.color)) {
            width += pixel.width;
        } else {
            optimizedPixels.push(new Pixel(startX, startY, width, height, currentColor));
            currentColor = pixel.color;
            startX = pixel.x;
            startY = pixel.y;
            width = pixel.width;
            height = pixel.height;
        }
    }

    if (currentColor !== null) {
        optimizedPixels.push(new Pixel(startX, startY, width, height, currentColor));
    }

    return optimizedPixels;
}
