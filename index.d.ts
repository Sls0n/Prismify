/**
 * Represents a type that can be null or undefined.
 */
type Maybe = null | undefined

declare module 'rgbaster' {
  /**
   * Analyzes the colors in an image.
   * @param imageSrc - The source of the image to analyze.
   * @param options - Optional settings for the analysis.
   * @returns A promise that resolves to the analysis result.
   */
  export default function analyze(
    imageSrc: string,
    options?: { scale?: number; ignore?: string[] }
  ): Promise<any>
}

declare module 'colorthief' {
  /**
   * Class for extracting colors from an image.
   */
  export default class ColorThief {
    /**
     * Gets the dominant color from an image.
     * @param sourceImage - The source image. Can be an HTMLImageElement or a string (path to the image when run in Node).
     * @param quality - Optional. Determines how many pixels are skipped before the next one is sampled. Defaults to 10.
     * @returns A promise that resolves to an array of three integers representing red, green, and blue values.
     */
    getColor(
      sourceImage: HTMLImageElement | string,
      quality?: number
    ): Promise<[number, number, number]>

    /**
     * Gets a color palette from an image.
     * @param sourceImage - The source image. Can be an HTMLImageElement or a string (path to the image when run in Node).
     * @param colorCount - Optional. Determines the size of the returned palette. Defaults to 10.
     * @param quality - Optional. Determines how many pixels are skipped before the next one is sampled. Defaults to 10.
     * @returns A promise that resolves to an array of colors, each color itself an array of three integers.
     */
    getPalette(
      sourceImage: HTMLImageElement | string,
      colorCount?: number,
      quality?: number
    ): Promise<Array<[number, number, number]>>
  }
}

declare module 'sanitize-html'