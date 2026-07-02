export function trimText(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim()
}
