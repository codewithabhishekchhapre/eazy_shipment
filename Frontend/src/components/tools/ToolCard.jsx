import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { Card } from '../ui/Card'

export function ToolCard({ tool }) {
  const Icon = Icons[tool.icon] || Icons.Wrench
  return (
    <Link to={tool.custom ? tool.path : `/tools/${tool.id}`}>
      <Card className="p-4 h-full hover:border-primary transition-colors">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon size={18} />
          </span>
          <h3 className="font-medium text-text">{tool.name}</h3>
        </div>
        <p className="text-sm text-text-muted mb-3">{tool.description}</p>
        {tool.example && (
          <p className="text-xs font-mono text-text-muted">
            {tool.example.input} <span className="text-primary">&rarr;</span> {tool.example.output}
          </p>
        )}
      </Card>
    </Link>
  )
}
