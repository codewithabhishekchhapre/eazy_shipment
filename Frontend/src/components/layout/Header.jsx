import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { Package, Moon, Sun, History, Settings, Search, Menu } from 'lucide-react'
import { useThemeStore } from '../../store/useThemeStore'
import { TOOLS, FAVORITE_TOOLS, getToolPath } from '../../constants/toolsRegistry'
import { IconButton } from '../ui/IconButton'

export function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useThemeStore()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = query.trim()
    ? TOOLS.filter((tool) => tool.name.toLowerCase().includes(query.trim().toLowerCase()))
    : []

  function goToTool(tool) {
    setQuery('')
    navigate(getToolPath(tool))
  }

  return (
    <header className="sticky top-0 z-40 grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border bg-surface px-4 py-3">
      <div className="flex items-center gap-2 min-w-0">
        <IconButton label="Toggle menu" className="lg:hidden" onClick={onMenuClick}>
          <Menu size={20} />
        </IconButton>
        <div className="flex items-center gap-2 font-semibold text-text shrink-0">
          <Package size={22} className="text-primary" />
          <span className="hidden sm:inline">Eazy Shipment</span>
        </div>
      </div>

      <div className="relative w-full max-w-md mx-auto">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-text outline-none focus:ring-2 focus:ring-primary"
        />
        {results.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg overflow-hidden">
            {results.map((tool) => (
              <li key={tool.id}>
                <button
                  onClick={() => goToTool(tool)}
                  className="w-full text-left px-3 py-2 text-sm text-text hover:bg-card cursor-pointer"
                >
                  {tool.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-1 justify-end">
        <div className="hidden sm:flex items-center gap-1 mr-1 pr-2 border-r border-border">
          {FAVORITE_TOOLS.map((tool) => {
            const Icon = Icons[tool.icon] || Icons.Wrench
            return (
              <button
                key={tool.id}
                type="button"
                title={tool.name}
                onClick={() => navigate(getToolPath(tool))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-warning/30 bg-warning/10 px-2.5 py-1.5 text-xs font-medium text-text hover:bg-warning/20 transition-colors cursor-pointer"
              >
                <Icon size={14} className="text-warning" />
                <span className="hidden lg:inline">{tool.name}</span>
              </button>
            )
          })}
        </div>
        <IconButton label="Toggle theme" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </IconButton>
        <IconButton label="History" onClick={() => navigate('/history')}>
          <History size={18} />
        </IconButton>
        <IconButton label="Settings" onClick={() => navigate('/settings')}>
          <Settings size={18} />
        </IconButton>
      </div>
    </header>
  )
}
