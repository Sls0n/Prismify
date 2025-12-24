// Editor constants for consistent values across components

// Canvas padding for automatic resolution calculation
export const DEFAULT_CANVAS_PADDING = 200

// Frame height padding values for Arc frames
export const FRAME_PADDING = {
  small: '10px',
  medium: '13px',
  large: '15px',
} as const

// Z-index defaults
export const DEFAULT_Z_INDEX = 2

// Slider ranges for image transformations
export const SLIDER_RANGES = {
  perspective: { min: 0, max: 6500, default: 2000, incrementStep: 500 },
  rotateX: { min: -180, max: 180, default: 0.0001 },
  rotateY: { min: -180, max: 180, default: 0 },
  rotateZ: { min: -180, max: 180, default: 0 },
  translateX: { min: -1000, max: 1000, default: 0 },
  translateY: { min: -500, max: 500, default: 0 },
  imageRoundness: { min: 0, max: 4, default: 0.5 },
  insetSize: { min: 0, max: 100, default: 0 },
  imageSize: { min: 0.1, max: 2, default: 0.8 },
} as const

// Shadow presets
export const SHADOW_PRESETS = {
  none: '0 0 0 0',
  medium: '0px 18px 88px -4px',
  mediumSecondary: '0px 8px 28px -6px',
} as const

// Color extraction settings
export const COLOR_EXTRACTION = {
  scale: 0.5,
  maxColors: 12,
} as const
