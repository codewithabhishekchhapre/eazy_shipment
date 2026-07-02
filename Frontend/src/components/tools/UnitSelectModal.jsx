import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const COLUMNS = 2

export function UnitSelectModal({ open, title, value, units, onSelect, onCancel }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevOpen, setPrevOpen] = useState(open)
  const buttonRefs = useRef([])

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) setActiveIndex(0)
  }

  // Kept current via refs (rather than effect deps) so the keydown listener below
  // is attached once per open and never torn down/re-attached between keystrokes.
  const activeIndexRef = useRef(activeIndex)
  const unitsRef = useRef(units)
  const onSelectRef = useRef(onSelect)
  const onCancelRef = useRef(onCancel)

  useEffect(() => {
    activeIndexRef.current = activeIndex
    unitsRef.current = units
    onSelectRef.current = onSelect
    onCancelRef.current = onCancel
  }, [activeIndex, units, onSelect, onCancel])

  useEffect(() => {
    if (!open) return
    // Deferred: focusing synchronously here can still land before the keyup half
    // of the same Enter press that opened the modal, and a focused <button>'s
    // native keyup-activates-click behavior would instantly "click" it.
    const timerId = setTimeout(() => buttonRefs.current[activeIndex]?.focus(), 0)
    return () => clearTimeout(timerId)
  }, [activeIndex, open])

  useEffect(() => {
    if (!open) return

    function move(delta) {
      setActiveIndex((current) => {
        const col = current % COLUMNS
        const count = unitsRef.current.length

        if (delta === 'right') return col < COLUMNS - 1 && current + 1 < count ? current + 1 : current
        if (delta === 'left') return col > 0 ? current - 1 : current
        if (delta === 'down') return current + COLUMNS < count ? current + COLUMNS : current
        if (delta === 'up') return current - COLUMNS >= 0 ? current - COLUMNS : current
        return current
      })
    }

    function handleKeyDown(e) {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          move('right')
          break
        case 'ArrowLeft':
          e.preventDefault()
          move('left')
          break
        case 'ArrowDown':
          e.preventDefault()
          move('down')
          break
        case 'ArrowUp':
          e.preventDefault()
          move('up')
          break
        case 'Enter':
          e.preventDefault()
          onSelectRef.current(unitsRef.current[activeIndexRef.current].id)
          break
        case 'Escape':
          e.preventDefault()
          onCancelRef.current()
          break
        default:
          break
      }
    }

    // Deferred so the same Enter keydown that opened this modal (still bubbling
    // when this effect runs) isn't also caught here and instantly re-selects.
    const timerId = setTimeout(() => window.addEventListener('keydown', handleKeyDown), 0)
    return () => {
      clearTimeout(timerId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="w-full max-w-sm rounded-xl border border-border bg-surface p-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-text mb-1">{title}</h3>
            <p className="text-xs text-text-muted mb-4">
              Value entered: <span className="font-mono text-text">{value}</span> — pick its unit
              <span className="block mt-0.5 text-text-muted/70">Use arrow keys + Enter, or click</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {units.map((unit, index) => (
                <button
                  key={unit.id}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onClick={() => onSelect(unit.id)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors cursor-pointer outline-none ${
                    index === activeIndex
                      ? 'border-primary text-primary ring-2 ring-primary bg-card'
                      : 'border-border bg-card text-text hover:border-primary hover:text-primary'
                  }`}
                >
                  {unit.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
