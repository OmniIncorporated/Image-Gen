/**
 * Converts a file object to an image object.
 * @param {File} file - The file object to convert.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the converted image object.
 */
export default function fileToImage(file) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = URL.createObjectURL(file);
    });
}