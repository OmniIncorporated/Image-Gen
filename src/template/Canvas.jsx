export default function CanvasTemplate({ width, height, canvasData }) {
  const script = `
  const logo = '${canvasData}'
  var cnv = document.getElementById('logo')
  var ctx = cnv.getContext('2d')
  if (ctx == null) ctx = cnv.context2D
  base64ToCanvas(logo, cnv, ctx)

  function base64ToCanvas(base64, canvas, ctx) {
    let x = 0
    let y = 0
    let i = 0
    while (i < base64.length) {
      let w = ''
      while (base64[i] !== '|' && i < base64.length) {
        w += base64[i++]
      }
      i++ // Skip the "|"
      let h = ''
      while (base64[i] !== '#' && i < base64.length) {
        h += base64[i++]
      }
      i++ // Skip the "#"
      let color = ''
      for (let j = 0; j < 8 && i < base64.length; j++) {
        color += base64[i++]
      }

      // Parse integers from w and h
      const widthInt = parseInt(w, 10)
      const heightInt = parseInt(h, 10)

      // Set color and draw the rectangle
      ctx.fillStyle = '#' + color
      ctx.fillRect(x, y, widthInt, heightInt)

      // Update x and y for the next rectangle
      x += widthInt
      if (x >= canvas.width) {
        x = 0
        y += heightInt
      }
    }
  }
`

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>Image Gen By SkidMall - OMNI</title>
      </head>
      <body>
        <canvas width={width} height={height} id="logo"></canvas>
        <script dangerouslySetInnerHTML={{ __html: script }}></script>
      </body>
    </html>
  )
}
