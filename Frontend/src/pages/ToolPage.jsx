import { useParams, Navigate } from 'react-router-dom'
import { getToolById } from '../constants/toolsRegistry'
import { ToolWorkspace } from '../components/tools/ToolWorkspace'

export function ToolPage() {
  const { toolId } = useParams()
  const tool = getToolById(toolId)

  if (!tool) return <Navigate to="/" replace />

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-semibold text-text">{tool.name}</h1>
        <p className="text-sm text-text-muted">{tool.description}</p>
      </div>
      <ToolWorkspace tool={tool} key={tool.id} />
    </div>
  )
}
