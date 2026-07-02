import { useEffect } from 'react'

export function useKeyboardShortcut(key, { ctrl = false, shift = false }, handler, deps = []) {
  useEffect(() => {
    function onKeyDown(event) {
      const matchesKey = event.key.toLowerCase() === key.toLowerCase()
      const matchesCtrl = ctrl ? event.ctrlKey || event.metaKey : true
      const matchesShift = shift ? event.shiftKey : !event.shiftKey || !shift
      if (matchesKey && matchesCtrl && matchesShift) {
        handler(event)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
