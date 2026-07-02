import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { ToolPage } from './pages/ToolPage'
import { HistoryPage } from './pages/HistoryPage'
import { SettingsPage } from './pages/SettingsPage'
import { QuantityConversionPage } from './features/shipment/QuantityConversionPage'
import { useThemeStore } from './store/useThemeStore'
import { useSettingsStore } from './store/useSettingsStore'

const FONT_SIZE_PX = { small: '14px', medium: '16px', large: '18px' }

function App() {
  const theme = useThemeStore((s) => s.theme)
  const fontSize = useSettingsStore((s) => s.fontSize)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZE_PX[fontSize] || FONT_SIZE_PX.medium
  }, [fontSize])

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tools/quantity-conversion" element={<QuantityConversionPage />} />
          <Route path="/tools/:toolId" element={<ToolPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
