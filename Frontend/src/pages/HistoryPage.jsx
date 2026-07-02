import { Trash2, Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import { useHistoryStore } from '../store/useHistoryStore'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function HistoryPage() {
  const entries = useHistoryStore((s) => s.entries)
  const clear = useHistoryStore((s) => s.clear)

  async function copy(text) {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text">History</h1>
          <p className="text-sm text-text-muted">Your last {entries.length} operations, saved locally.</p>
        </div>
        <Button variant="secondary" onClick={clear} disabled={entries.length === 0}>
          <Trash2 size={16} /> Clear History
        </Button>
      </div>

      {entries.length === 0 ? (
        <Card className="p-8 text-center text-text-muted text-sm">No operations yet.</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text">{entry.toolName}</span>
                <span className="text-xs text-text-muted">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="rounded-lg bg-card p-2 truncate">{entry.input}</div>
                <div className="rounded-lg bg-card p-2 truncate flex items-center justify-between gap-2">
                  <span className="truncate">{entry.output}</span>
                  <button onClick={() => copy(entry.output)} className="shrink-0 text-text-muted hover:text-text cursor-pointer">
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
