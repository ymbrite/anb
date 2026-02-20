import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

let db: Database.Database | null = null

function ensureDir(path: string) {
  mkdirSync(path, { recursive: true })
}

export function getNotesDb() {
  if (db) return db

  const file = resolve(process.cwd(), '.data', 'notes.sqlite')
  ensureDir(dirname(file))

  db = new Database(file)
  db.pragma('journal_mode = WAL')

  db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      mood TEXT,
      content_html TEXT NOT NULL,
      content_text TEXT NOT NULL,
      reading_minutes INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at);
    CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at);
  `)

  const row = db.prepare('SELECT COUNT(*) as count FROM notes').get() as { count: number }
  if (row.count === 0) {
    const now = new Date().toISOString()

    const insert = db.prepare(`
      INSERT INTO notes (title, mood, content_html, content_text, reading_minutes, created_at, updated_at)
      VALUES (@title, @mood, @content_html, @content_text, @reading_minutes, @created_at, @updated_at)
    `)

    const samples = [
      {
        title: '第一篇随笔：开始记录',
        mood: '平静',
        content_html:
          '<p>这是随笔模块自动生成的示例内容。</p><p>你可以在这里记录每天的想法、灵感或者心情。</p>',
        content_text: '这是随笔模块自动生成的示例内容。你可以在这里记录每天的想法、灵感或者心情。',
        reading_minutes: 1,
        created_at: now,
        updated_at: now,
      },
      {
        title: '第二篇随笔：技术与生活',
        mood: '开心',
        content_html:
          '<p>技术文章适合放在「技术」模块，零碎的想法就交给随笔模块吧。</p>',
        content_text: '技术文章适合放在「技术」模块，零碎的想法就交给随笔模块吧。',
        reading_minutes: 1,
        created_at: now,
        updated_at: now,
      },
    ]

    const insertMany = db.transaction((rows: typeof samples) => {
      for (const s of rows) insert.run(s)
    })

    insertMany(samples)
  }

  return db
}
