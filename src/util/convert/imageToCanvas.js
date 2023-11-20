/**
 * Converts an image to a canvas element.
 * @param {HTMLImageElement} image - The image to convert.
 * @returns {HTMLCanvasElement} The canvas element containing the image.
 */
export default function imageToCanvas(image) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    return canvas;
}