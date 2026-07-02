import { Activity, ListChecks, Wrench, Clock } from 'lucide-react'
import { TOOLS } from '../constants/toolsRegistry'
import { useHistoryStore } from '../store/useHistoryStore'
import { Card } from '../components/ui/Card'
import { ToolCard } from '../components/tools/ToolCard'

function isToday(timestamp) {
  const d = new Date(timestamp)
  const now = new Date()
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  )
}

const STAT_CARDS = [
  {
    key: 'today',
    label: 'Processed Today',
    icon: Activity,
    getValue: (entries) => entries.filter((e) => isToday(e.timestamp)).length,
  },
  {
    key: 'total',
    label: 'Total Operations',
    icon: ListChecks,
    getValue: (entries) => entries.length,
  },
  {
    key: 'tools',
    label: 'Tools Available',
    icon: Wrench,
    getValue: () => TOOLS.length,
  },
  {
    key: 'last',
    label: 'Last Activity',
    icon: Clock,
    getValue: (entries) => (entries[0] ? entries[0].toolName : '—'),
  },
]

export function Dashboard() {
  const entries = useHistoryStore((s) => s.entries)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text">Dashboard</h1>
        <p className="text-sm text-text-muted">Overview of your shipment data cleaning activity.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, getValue }) => (
          <Card key={key} className="p-4">
            <div className="flex items-center gap-2 text-text-muted text-xs mb-2">
              <Icon size={14} /> {label}
            </div>
            <p className="text-lg font-semibold text-text truncate">{getValue(entries)}</p>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-text mb-3">Shipment Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  )
}
