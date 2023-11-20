export default function scaleCanvas(canvas, width, height) {
    const newCanvas = document.createElement('canvas');
    const context = newCanvas.getContext('2d');
    newCanvas.width = width;
    newCanvas.height = height;
    context.drawImage(canvas, 0, 0, width, height);
    return newCanvas;
}