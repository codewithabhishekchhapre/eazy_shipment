import { getTextStats } from '../../utils/textStats'

export function StatsBar({ text }) {
  const { characters, words, lines } = getTextStats(text)
  return (
    <div className="flex gap-4 text-xs text-text-muted">
      <span>Lines: <strong className="text-text">{lines}</strong></span>
      <span>Words: <strong className="text-text">{words}</strong></span>
      <span>Characters: <strong className="text-text">{characters}</strong></span>
    </div>
  )
}
