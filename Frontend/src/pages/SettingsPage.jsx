import { useThemeStore } from '../store/useThemeStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { TOOLS } from '../constants/toolsRegistry'
import { Card } from '../components/ui/Card'
import { Toggle } from '../components/ui/Toggle'

export function SettingsPage() {
  const { theme, toggleTheme } = useThemeStore()
  const { fontSize, autoCopy, autoPaste, defaultTool, setFontSize, toggleAutoCopy, toggleAutoPaste, setDefaultTool } =
    useSettingsStore()

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <div>
        <h1 className="text-xl font-semibold text-text">Settings</h1>
        <p className="text-sm text-text-muted">Preferences are saved automatically on this device.</p>
      </div>

      <Card className="p-4 divide-y divide-border">
        <Toggle label="Dark Mode" checked={theme === 'dark'} onChange={toggleTheme} />
        <Toggle label="Auto Copy after processing" checked={autoCopy} onChange={toggleAutoCopy} />
        <Toggle label="Auto Paste clipboard on open" checked={autoPaste} onChange={toggleAutoPaste} />
      </Card>

      <Card className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text">Font Size</span>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-text outline-none"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-text">Default Tool</span>
          <select
            value={defaultTool}
            onChange={(e) => setDefaultTool(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-text outline-none"
          >
            {TOOLS.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>
      </Card>
    </div>
  )
}
