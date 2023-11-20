import Pixel from "../pixel";
import Color from "../color";

/**
 * Converts a canvas region to an array of pixels.
 * 
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @returns {Pixel[]} An array of pixels representing the region.
 */
export default function canvasToPixels(canvas) {
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        pixels.push(new Pixel(
            (i / 4) % canvas.width,
            Math.floor((i / 4) / canvas.width),
            1,
            1,
            new Color(
                imageData.data[i],
                imageData.data[i + 1],
                imageData.data[i + 2],
                imageData.data[i + 3]
            )
        ));
    }
    return pixels;
}