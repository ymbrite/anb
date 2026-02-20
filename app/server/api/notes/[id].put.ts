import { getNotesDb } from '../../utils/notes-db'
import { readingMinutesFromText, sanitizeHtml, stripHtmlToText } from '../../utils/reading-time'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }

  const body = await readBody<{
    title?: string
    mood?: string
    contentHtml?: string
  }>(event)

  const title = (body.title || '').trim()
  const mood = (body.mood || '').trim() || null
  const contentHtml = (body.contentHtml || '').trim()

  if (!title || !contentHtml) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
  }

  const safeHtml = sanitizeHtml(contentHtml)
  const contentText = stripHtmlToText(safeHtml)
  const readingMinutes = readingMinutesFromText(contentText)
  const now = new Date().toISOString()

  const db = getNotesDb()
  const result = db
    .prepare(
      `UPDATE notes
       SET title = ?, mood = ?, content_html = ?, content_text = ?, reading_minutes = ?, updated_at = ?
       WHERE id = ?`,
    )
    .run(title, mood, safeHtml, contentText, readingMinutes, now, id)

  if (result.changes === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  return { ok: true }
})
