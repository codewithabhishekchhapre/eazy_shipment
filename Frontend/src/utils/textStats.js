export function getTextStats(text) {
  const trimmed = text.trim()
  const characters = text.length
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length
  const lines = text === '' ? 0 : text.split('\n').length
  return { characters, words, lines }
}
