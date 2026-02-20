import { getNotesDb } from '../../utils/notes-db'
import { readingMinutesFromText, sanitizeHtml, stripHtmlToText } from '../../utils/reading-time'

export default defineEventHandler(async (event) => {
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
      `INSERT INTO notes (title, mood, content_html, content_text, reading_minutes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(title, mood, safeHtml, contentText, readingMinutes, now, now)

  return { id: result.lastInsertRowid }
})
