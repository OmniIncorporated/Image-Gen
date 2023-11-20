// eslint-disable-next-line no-unused-vars
import Pixel from "../pixel";

/**
 * Converts an array of pixels to a base64 string.
 * @param {Pixel[]} pixels - The pixels to convert.
 * @returns {string} The base64 string.
 */
export default function pixelsToBase64(pixels) {
    let base64 = "";
    for (const pixel of pixels) {
        base64 += pixel.width
        base64 += "|"
        base64 += pixel.height
        base64 += pixel.color.toHex();
    }
    return base64;
}