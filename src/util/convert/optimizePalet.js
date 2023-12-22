// eslint-disable-next-line
import Pixel from '../pixel'

/**
 * @description optimize palate of pixels
 * @param {Pixel[]} pixels
 * @param {number} factor
 * @returns {Pixel[]}
 */
export default function optimizePalate(pixels, factor = 10) {
  const map = new Map()

  for (const pixel of pixels) {
    const { r, g, b } = pixel.color
    const key = `${Math.floor(r / factor) * factor},${
      Math.floor(g / factor) * factor
    },${Math.floor(b / factor) * factor}`
    if (map.has(key)) {
      map.get(key).push(pixel)
    } else {
      map.set(key, [pixel])
    }
  }

  const mapMostCommon = new Map()

  for (const [key, value] of map) {
    const counts = new Map()
    for (const pixel of value) {
      const { r, g, b } = pixel.color
      const key = `${r},${g},${b}`
      if (counts.has(key)) {
        counts.set(key, counts.get(key) + 1)
      } else {
        counts.set(key, 1)
      }
    }
    let max = 0
    let maxKey = null
    for (const [key, value] of counts) {
      if (value > max) {
        max = value
        maxKey = key
      }
    }
    mapMostCommon.set(key, maxKey)
  }

  for (const [key, value] of mapMostCommon) {
    const [r, g, b] = value.split(',').map(v => parseInt(v, 10))
    for (const pixel of map.get(key)) {
      pixel.color.r = r
      pixel.color.g = g
      pixel.color.b = b
    }
  }

  return pixels
}
