import { gradients } from '@/utils/presets/gradients'

export const generateUniqueGradient = (id: string) => {
  if (!id) return

  const filteredGradients = gradients.filter(
    (gradient) => gradient.type === 'Normal'
  )

  const sumAscii = id
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const gradientIndex = sumAscii % filteredGradients.length

  const gradient = filteredGradients[gradientIndex].gradient
  return gradient
}
