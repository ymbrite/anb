import { getNotesDb } from '../../utils/notes-db'

export default defineEventHandler((event) => {
  const db = getNotesDb()
  const q = (getQuery(event).q as string | undefined)?.trim()

  if (q) {
    return db
      .prepare(
        `SELECT id, title, mood, reading_minutes as readingMinutes, created_at as createdAt, updated_at as updatedAt
         FROM notes
         WHERE title LIKE ? OR content_text LIKE ?
         ORDER BY updated_at DESC`,
      )
      .all(`%${q}%`, `%${q}%`)
  }

  return db
    .prepare(
      `SELECT id, title, mood, reading_minutes as readingMinutes, created_at as createdAt, updated_at as updatedAt
       FROM notes
       ORDER BY updated_at DESC`,
    )
    .all()
})

