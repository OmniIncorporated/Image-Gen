import { useState, useRef } from 'react'
import imageToCanvas from './util/convert/imageToCanvas'
import fileToImage from './util/convert/fileToImage'
import canvasToPixels from './util/convert/canvasToPixels'
import runLengthEncoding from './util/optimize/runLengthEncoding'
import pixelsToString from './util/convert/pixelsToString'
import stringToCanvas from './util/convert/stringToCanvas'
import { useEffect } from 'react'
import scaleCanvas from './util/convert/scaleCanvas'
import increasePixelSize from './util/convert/increasePixelSize'
import optimizePalate from './util/optimize/optimizePalate'
import { renderToString } from 'react-dom/server'
import CanvasTemplate from './template/Canvas'
// import groupBy from "./util/groupBy"

function App() {
  const [canvas, setCanvas] = useState(null)
  const [redrawCanvas, setRedrawCanvas] = useState(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [pixelSize, setPixelSize] = useState(1)
  const [palateScale, setPalateScale] = useState(1)

  const originalCanvas = useRef(null)
  const canvasHolderRef = useRef(null)
  const reDrawCanvasHolderRef = useRef(null)

  useEffect(() => {
    if (canvas && canvasHolderRef.current) {
      canvasHolderRef.current.innerHTML = ''
      canvasHolderRef.current.appendChild(canvas)

      setRedrawCanvas(null)
    }
  }, [canvas])

  useEffect(() => {
    if (redrawCanvas && reDrawCanvasHolderRef.current) {
      reDrawCanvasHolderRef.current.innerHTML = ''
      reDrawCanvasHolderRef.current.appendChild(redrawCanvas)
    } else {
      reDrawCanvasHolderRef.current.innerHTML = ''
    }
  }, [redrawCanvas])

  function handleCopyData() {
    const pixels = canvasToPixels(canvas)
    const palateOptimize =
      palateScale === 1 ? pixels : optimizePalate(pixels, palateScale)
    const optimize = runLengthEncoding(palateOptimize)
    const pixelSizeChanged = increasePixelSize(optimize, pixelSize)
    const base64 = pixelsToString(pixelSizeChanged)
    console.log(base64.length)
    navigator.clipboard.writeText(base64)
  }

  function handleCopyAsExample() {
    const pixels = canvasToPixels(canvas)
    const palateOptimize =
      palateScale === 1 ? pixels : optimizePalate(pixels, palateScale)
    const optimize = runLengthEncoding(palateOptimize)
    const pixelSizeChanged = increasePixelSize(optimize, pixelSize)
    const base64 = pixelsToString(pixelSizeChanged)
    const canvasTemplate = renderToString(
      <CanvasTemplate
        width={canvas.width * pixelSize}
        height={canvas.height * pixelSize}
        canvasData={base64}
      />
    )
    navigator.clipboard.writeText(canvasTemplate)
  }

  function handleReDraw() {
    const pixels = canvasToPixels(canvas)
    const palateOptimize =
      palateScale === 1 ? pixels : optimizePalate(pixels, palateScale)
    const optimize = runLengthEncoding(palateOptimize)
    const pixelSizeChanged = increasePixelSize(optimize, pixelSize)
    const base64 = pixelsToString(pixelSizeChanged)
    const newCanvas = stringToCanvas(
      base64,
      canvas.width === 0 ? width : canvas.width * pixelSize,
      canvas.height === 0 ? height : canvas.height * pixelSize
    )
    setRedrawCanvas(newCanvas)
  }

  async function handleImageChange(e) {
    const data = e.target.files[0]
    const image = await fileToImage(data)
    setCanvas(imageToCanvas(image))
    setWidth(image.width)
    setHeight(image.height)
    originalCanvas.current = imageToCanvas(image)
  }

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        name="image"
        onChange={handleImageChange}
      />
      <label>width: </label>
      <input
        type="number"
        placeholder="width"
        value={width}
        min={1}
        step={1}
        onChange={e => setWidth(Math.floor(Math.abs(e.target.value)))}
      />
      <label>height: </label>
      <input
        type="number"
        placeholder="height"
        value={height}
        min={1}
        step={1}
        onChange={e => setHeight(Math.floor(Math.abs(e.target.value)))}
      />
      <label>palate scale: </label>
      <input
        type="number"
        placeholder="palet scale"
        value={palateScale}
        min={1}
        step={1}
        onChange={e => setPalateScale(Math.floor(Math.abs(e.target.value)))}
      />
      <button
        onClick={() =>
          setCanvas(scaleCanvas(originalCanvas.current, width, height))
        }
      >
        scale
      </button>
      <label>pixel size: </label>
      <input
        type="number"
        placeholder="pixel size"
        value={pixelSize}
        min={1}
        step={1}
        onChange={e => setPixelSize(Math.floor(Math.abs(e.target.value)))}
      />
      <button onClick={handleCopyData}>copy data</button>
      <button onClick={handleReDraw}>Re Draw</button>
      <button onClick={handleCopyAsExample}>Copy As Example</button>
      <div ref={canvasHolderRef} />
      <div ref={reDrawCanvasHolderRef} />
    </>
  )
}

export default App
