export function splitWidthHeight(resolution: string) {
  const [width, height] = resolution.split('x')
  return { width, height }
}

export function convertHexToRgba(hexCode: string, opacity = 1) {
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

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length)}...`
}

export const separateCommas = (str: string) => {
  if (!str) return

  const strArr = str.split(',')

  return strArr.map((item) => capitalize(item.trim()))
}

export const generateBadgeVariant = (str: string) => {
  if (!str) return

  const helpVariant = ['help', 'support', 'question', 'faq', 'tutorial', 'guide']
  const destructiveVariant = [
    'error',
    'critical',
    'important',
    'caution',
    'alert',
    'important',
  ]
  const successVariant = [
    'trends',
    'announcement',
    'sale',
    'new',
    'update',
    'feature',
  ]

  if (helpVariant.includes(str.toLowerCase())) return 'help'
  if (successVariant.includes(str.toLowerCase())) return 'success'
  if (destructiveVariant.includes(str.toLowerCase())) return 'destructive'
  return 'default'
}

export function formatDate(date: Date | string | number | undefined): string {
  // format date as 29 May, 2021
  if (!date) return 'N/A'

  if (typeof date === 'number' || typeof date === 'string')
    date = new Date(date)

  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.toLocaleString('default', { month: 'short' })
  const day = d.getDate()

  return `${day} ${month}, ${year}`
}

export function generateFormattedBlogDate(
  createdAt: string | Date,
  updatedAt: string | Date
): string {
  const createdDate: Date = new Date(createdAt)
  const updatedDate: Date = new Date(updatedAt)

  // Check if the dates are the same
  const datesAreEqual: boolean = createdDate.getTime() === updatedDate.getTime()

  // Format the date string
  const formattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  if (datesAreEqual) {
    // If the dates are the same, show 'Published on'
    return `Published on ${formattedDate(createdDate)}`
  } else {
    // If the dates are different, show 'Updated on'
    return `Updated on ${formattedDate(updatedDate)}`
  }
}
