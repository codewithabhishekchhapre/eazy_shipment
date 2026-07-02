import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { LayoutDashboard, History, Settings, Wrench, Star } from 'lucide-react'
import { TOOLS, FAVORITE_TOOLS, getToolPath } from '../../constants/toolsRegistry'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
    isActive ? 'bg-primary text-white' : 'text-text-muted hover:bg-card hover:text-text'
  }`

const favoriteLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
    isActive
      ? 'bg-primary text-white border-primary'
      : 'bg-warning/10 border-warning/30 text-text hover:bg-warning/20'
  }`

const CATEGORY_ORDER = [...new Set(TOOLS.map((tool) => tool.category))]

export function Sidebar({ open, onNavigate }) {
  return (
    <aside
      className={`fixed lg:sticky top-0 lg:top-[57px] left-0 z-30 h-svh lg:h-[calc(100svh-57px)] w-64 shrink-0 overflow-y-auto border-r border-border bg-surface p-3 transition-transform lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <nav className="flex flex-col gap-1">
        <NavLink to="/" end className={linkClass} onClick={onNavigate}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-text-muted flex items-center gap-2">
          <Star size={12} /> Favorites
        </p>
        {FAVORITE_TOOLS.map((tool) => {
          const Icon = Icons[tool.icon] || Icons.Wrench
          return (
            <NavLink key={tool.id} to={getToolPath(tool)} className={favoriteLinkClass} onClick={onNavigate}>
              <Icon size={18} />
              {tool.name}
              <Star size={14} className="ml-auto text-warning fill-warning" />
            </NavLink>
          )
        })}

        {CATEGORY_ORDER.map((category) => (
          <div key={category}>
            <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-text-muted flex items-center gap-2">
              <Wrench size={12} /> {category}
            </p>
            {TOOLS.filter((tool) => tool.category === category).map((tool) => {
              const Icon = Icons[tool.icon] || Icons.Wrench
              return (
                <NavLink key={tool.id} to={getToolPath(tool)} className={linkClass} onClick={onNavigate}>
                  <Icon size={18} />
                  {tool.name}
                </NavLink>
              )
            })}
          </div>
        ))}

        <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Manage
        </p>
        <NavLink to="/history" className={linkClass} onClick={onNavigate}>
          <History size={18} />
          History
        </NavLink>
        <NavLink to="/settings" className={linkClass} onClick={onNavigate}>
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}
