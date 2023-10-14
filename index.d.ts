declare module 'rgbaster' {
  export default function analyze(
    imageSrc: string,
    options?: { scale?: number; ignore?: string[] }
  ): Promise<any>
}
