export default function base64ToCanvas(base64, width, height) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    let x = 0;
    let y = 0;
    let i = 0;
    while (i < base64.length) {
        let w = "";
        while (base64[i] !== "|" && i < base64.length) {
            w += base64[i++];
        }
        i++; // Skip the "|"
        let h = "";
        while (base64[i] !== "#" && i < base64.length) {
            h += base64[i++];
        }
        i++; // Skip the "#"
        let color = "";
        for (let j = 0; j < 6 && i < base64.length; j++) {
            color += base64[i++];
        }

        // Parse integers from w and h
        const widthInt = parseInt(w, 10);
        const heightInt = parseInt(h, 10);

        // Set color and draw the rectangle
        context.fillStyle = "#" + color;
        context.fillRect(x, y, widthInt, heightInt);

        // Update x and y for the next rectangle
        x += widthInt;
        if (x >= canvas.width) {
            x = 0;
            y += heightInt;
        }
    }

    return canvas;
}
