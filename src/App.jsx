import { useState, useRef } from 'react'
import imageToCanvas from './util/convert/imageToCanvas'
import fileToImage from './util/convert/fileToImage'
import canvasToPixels from './util/convert/canvasToPixels'
import runLengthEncoding from './util/optimize/runLengthEncoding'
import pixelsToBase64 from './util/convert/pixelToBase64'
import base64ToCanvas from './util/convert/base64ToCanvas'
import { useEffect } from 'react'
import scaleCanvas from './util/convert/scaleCanvas'
import increasePixelSize from './util/convert/increasePixelSize'
// import groupBy from "./util/groupBy"

function App() {
  const [canvas, setCanvas] = useState(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [pixelSize, setPixelSize] = useState(1)

  useEffect(() => {
    if (canvas && canvasHolderRef.current) {
      canvasHolderRef.current.innerHTML = ''
      canvasHolderRef.current.appendChild(canvas)
    }
  }, [canvas])

  const canvasHolderRef = useRef(null)

  function handleCopyData() {
    const pixels = canvasToPixels(canvas)
    const optimize = runLengthEncoding(pixels)
    const pixelSizeChanged = increasePixelSize(optimize, pixelSize)
    const base64 = pixelsToBase64(pixelSizeChanged)
    console.log(base64.length)
    navigator.clipboard.writeText(base64)
  }

  function handleReDraw() {
    const pixels = canvasToPixels(canvas)
    const optimize = runLengthEncoding(pixels)
    const base64 = pixelsToBase64(optimize)
    const newCanvas = base64ToCanvas(base64, canvas.width, canvas.height)
    canvasHolderRef.current.appendChild(newCanvas)
  }

  async function handleImageChange(e) {
    const data = e.target.files[0]
    const image = await fileToImage(data)
    setCanvas(imageToCanvas(image))
    setWidth(image.width)
    setHeight(image.height)
  }

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        name="image"
        onChange={handleImageChange}
      />
      <input
        type="number"
        placeholder="width"
        value={width}
        onChange={e => setWidth(e.target.value)}
      />
      <input
        type="number"
        placeholder="height"
        value={height}
        onChange={e => setHeight(e.target.value)}
      />
      <button onClick={() => setCanvas(scaleCanvas(canvas, width, height))}>
        scale
      </button>
      <input
        type="number"
        placeholder="pixel size"
        onChange={e => setPixelSize(e.target.value)}
      />
      <button onClick={handleCopyData}>copy data</button>
      <button onClick={handleReDraw}>Re Draw</button>
      <div ref={canvasHolderRef} />
    </>
  )
}

export default App
