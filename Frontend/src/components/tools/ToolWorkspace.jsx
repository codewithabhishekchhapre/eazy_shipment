import { useState } from 'react'
import { Clipboard, Eraser, Undo2, Copy, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'
import { StatsBar } from './StatsBar'
import { useClipboard } from '../../features/clipboard/useClipboard'
import { useHistoryStore } from '../../store/useHistoryStore'
import { useSettingsStore } from '../../store/useSettingsStore'
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut'

export function ToolWorkspace({ tool }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [previousInput, setPreviousInput] = useState(null)
  const { copyText, pasteText } = useClipboard()
  const addHistory = useHistoryStore((s) => s.add)
  const { autoCopy } = useSettingsStore()

  async function handlePaste() {
    const text = await pasteText()
    if (text) setInput(text)
  }

  function handleClear() {
    setPreviousInput(input)
    setInput('')
    setOutput('')
  }

  function handleUndo() {
    if (previousInput !== null) {
      setInput(previousInput)
      setPreviousInput(null)
    }
  }

  async function runOperation(operation) {
    if (!input) {
      toast.error('Nothing to process — paste some text first')
      return
    }
    const result = operation.fn(input)
    setPreviousInput(input)
    setOutput(result)
    addHistory({ toolId: tool.id, toolName: tool.name, input, output: result })
    if (autoCopy) {
      await copyText(result)
    } else {
      toast.success(`${operation.label} applied`)
    }
  }

  function handleDownload() {
    if (!output) return
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${tool.id}-output.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  useKeyboardShortcut('r', { ctrl: true, shift: true }, (e) => {
    e.preventDefault()
    handleClear()
  }, [input])

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text">Input</h2>
          <div className="flex gap-1">
            <Button variant="ghost" className="px-2" onClick={handlePaste}>
              <Clipboard size={16} /> Paste
            </Button>
            <Button variant="ghost" className="px-2" onClick={handleClear}>
              <Eraser size={16} /> Clear
            </Button>
            <Button variant="ghost" className="px-2" onClick={handleUndo} disabled={previousInput === null}>
              <Undo2 size={16} /> Undo
            </Button>
          </div>
        </div>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste or type shipment text here..." />
        <StatsBar text={input} />

        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          {tool.operations.map((op) => (
            <Button key={op.id} onClick={() => runOperation(op)}>
              {op.label}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text">Output</h2>
          <div className="flex gap-1">
            <Button variant="ghost" className="px-2" onClick={() => copyText(output)} disabled={!output}>
              <Copy size={16} /> Copy
            </Button>
            <Button variant="ghost" className="px-2" onClick={handleDownload} disabled={!output}>
              <Download size={16} /> Download
            </Button>
          </div>
        </div>
        <Textarea value={output} readOnly placeholder="Processed result will appear here..." />
        <StatsBar text={output} />
      </Card>
    </div>
  )
}
