import { describe, expect, it } from 'vitest'
import { readingMinutesFromText, sanitizeHtml, stripHtmlToText } from '../app/server/utils/reading-time'

describe('reading-time', () => {
  it('returns at least 1 minute', () => {
    expect(readingMinutesFromText('')).toBe(1)
    expect(readingMinutesFromText('   ')).toBe(1)
  })

  it('estimates minutes by length', () => {
    expect(readingMinutesFromText('a'.repeat(1))).toBe(1)
    expect(readingMinutesFromText('a'.repeat(400))).toBe(1)
    expect(readingMinutesFromText('a'.repeat(401))).toBe(2)
    expect(readingMinutesFromText('a'.repeat(800))).toBe(2)
  })

  it('strips html to text', () => {
    expect(stripHtmlToText('<p>Hello</p>')).toContain('Hello')
    expect(stripHtmlToText('<div>Foo<br/>Bar</div>')).toContain('Foo')
  })

  it('sanitizes script/style and inline handlers', () => {
    const html = `<p onclick="alert(1)">Hi</p><script>alert(1)</script><style>body{}</style>`
    const safe = sanitizeHtml(html)
    expect(safe).not.toContain('script')
    expect(safe).not.toContain('style')
    expect(safe).not.toContain('onclick')
  })
})

