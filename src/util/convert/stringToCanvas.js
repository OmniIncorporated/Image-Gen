export default function stringToCanvas(string, width, height) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height

  let x = 0
  let y = 0
  let i = 0
  while (i < string.length) {
    let w = ''
    while (string[i] !== '|' && i < string.length) {
      w += string[i++]
    }
    i++ // Skip the "|"
    let h = ''
    while (string[i] !== '#' && i < string.length) {
      h += string[i++]
    }
    i++ // Skip the "#"
    let color = ''
    for (let j = 0; j < 8 && i < string.length; j++) {
      color += string[i++]
    }

    // Parse integers from w and h
    const widthInt = parseInt(w, 10)
    const heightInt = parseInt(h, 10)

    // Set color and draw the rectangle
    context.fillStyle = '#' + color
    context.fillRect(x, y, widthInt, heightInt)

    // Update x and y for the next rectangle
    x += widthInt
    if (x >= canvas.width) {
      x = 0
      y += heightInt
    }
  }

  return canvas
}
