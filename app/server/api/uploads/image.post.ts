import { mkdir, writeFile } from 'node:fs/promises'
import { extname, resolve } from 'node:path'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif'])

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const file = parts?.find((p) => p.type && p.name === 'file')

  if (!file || !file.data || !file.type) {
    throw createError({ statusCode: 400, statusMessage: 'Missing file' })
  }

  if (!ALLOWED.has(file.type)) {
    throw createError({ statusCode: 415, statusMessage: 'Unsupported media type' })
  }

  if (file.data.length > MAX_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'File too large' })
  }

  const ext = extname(file.filename || '') || (file.type === 'image/png' ? '.png' : file.type === 'image/webp' ? '.webp' : file.type === 'image/gif' ? '.gif' : '.jpg')
  const dir = resolve(process.cwd(), 'public', 'uploads')
  await mkdir(dir, { recursive: true })

  const name = `${crypto.randomUUID()}${ext}`
  const abs = resolve(dir, name)
  await writeFile(abs, file.data)

  return { url: `/uploads/${name}` }
})

