import sharp from "sharp"

export interface BlurPlaceholder {
  dataURI: string
  width: number
  height: number
}

async function fromBuffer(buffer: Buffer): Promise<BlurPlaceholder> {
  const image = sharp(buffer)
  const { width = 0, height = 0 } = await image.metadata()

  const placeholderBuffer = await image
    .resize(40, null, { withoutEnlargement: true })
    .webp({ quality: 20 })
    .toBuffer()

  const dataURI = `data:image/webp;base64,${placeholderBuffer.toString("base64")}`
  return { dataURI, width, height }
}

export async function getBlurPlaceholderFromURL(url: string): Promise<BlurPlaceholder> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch image ${url}: ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  return fromBuffer(buffer)
}

export async function getBlurPlaceholderFromFile(filePath: string): Promise<BlurPlaceholder> {
  const image = sharp(filePath)
  const { width = 0, height = 0 } = await image.metadata()

  const placeholderBuffer = await image
    .resize(40, null, { withoutEnlargement: true })
    .webp({ quality: 20 })
    .toBuffer()

  const dataURI = `data:image/webp;base64,${placeholderBuffer.toString("base64")}`
  return { dataURI, width, height }
}
