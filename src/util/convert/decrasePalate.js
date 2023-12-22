// eslint-disable-next-line no-unused-vars
import Pixel from '../pixel'

/**
 * @description decrease palate of pixels
 * @param {Pixel[]} pixels
 * @param {number} factor
 * @returns {Pixel[]}
 */
export default function decreasePalate(pixels, factor = 10) {
  return pixels.map(pixel => {
    pixel.color.r = Math.floor(pixel.color.r / factor) * factor
    pixel.color.g = Math.floor(pixel.color.g / factor) * factor
    pixel.color.b = Math.floor(pixel.color.b / factor) * factor
    return pixel
  })
}
