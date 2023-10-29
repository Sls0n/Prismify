export function splitWidthHeight(resolution: string) {
  const [width, height] = resolution.split('x')
  return { width, height }
}

export function convertHex(hexCode: string, opacity = 1) {
  var hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  var r = parseInt(hex.substring(0, 2), 16),
    g = parseInt(hex.substring(2, 4), 16),
    b = parseInt(hex.substring(4, 6), 16)

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100
  }

  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'
}

export function calculateEqualCanvasSize(
  imgWidth: number,
  imgHeight: number,
  padding: number
) {
  const aspectRatio = imgWidth / imgHeight
  let canvasWidth, canvasHeight

  if (aspectRatio > 1) {
    canvasWidth = imgWidth + 2 * padding
    canvasHeight = imgHeight + 2 * padding
  } else {
    canvasHeight = imgHeight + 2 * padding
    canvasWidth = imgWidth + 2 * padding
  }

  return `${canvasWidth}x${canvasHeight}`
}
