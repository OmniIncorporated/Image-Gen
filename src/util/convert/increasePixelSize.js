import Pixel from '../pixel'

export default function increasePixelSize(pixels, amount) {
  const newPixels = []
  for (const pixel of pixels) {
    newPixels.push(
      new Pixel(
        pixel.x,
        pixel.y,
        pixel.width * amount,
        pixel.height * amount,
        pixel.color
      )
    )
  }
  return newPixels
}
