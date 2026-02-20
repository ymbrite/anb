import { getNotesDb } from '../../utils/notes-db'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  }

  const db = getNotesDb()
  const note = db
    .prepare(
      `SELECT id, title, mood, content_html as contentHtml, reading_minutes as readingMinutes, created_at as createdAt, updated_at as updatedAt
       FROM notes
       WHERE id = ?`,
    )
    .get(id)

  if (!note) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  return note
})

