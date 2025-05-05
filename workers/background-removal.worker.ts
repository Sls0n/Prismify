self.onmessage = async (event: MessageEvent<{ src: string }>) => {
  const { src } = event.data

  if (!src) {
    self.postMessage({ type: 'error', error: 'No image source provided.' })
    return
  }

  try {
    const { removeBackground } = await import('@imgly/background-removal')

    const blob = await removeBackground(src, {
      output: {
        format: 'image/png',
        quality: 1,
      },
      device: 'gpu',
    })
    const url = URL.createObjectURL(blob)
    self.postMessage({ type: 'success', url })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error removing background in worker.'
    console.error('Worker error:', error)
    self.postMessage({ type: 'error', error: errorMessage })
  }
}
