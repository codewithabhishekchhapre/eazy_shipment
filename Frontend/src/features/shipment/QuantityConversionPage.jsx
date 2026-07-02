import { useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { UnitSelectModal } from '../../components/tools/UnitSelectModal'
import { LENGTH_UNITS, getUnit, calculateAreaSqMeters } from '../../utils/unitConversion'
import { useClipboard } from '../clipboard/useClipboard'
import { useHistoryStore } from '../../store/useHistoryStore'

const EMPTY_MODAL = { open: false, field: null, value: null }

export function QuantityConversionPage() {
  const [length, setLength] = useState('')
  const [lengthUnit, setLengthUnit] = useState(null)
  const [width, setWidth] = useState('')
  const [widthUnit, setWidthUnit] = useState(null)
  const [quantity, setQuantity] = useState('')
  const [output, setOutput] = useState('')
  const [modal, setModal] = useState(EMPTY_MODAL)

  const widthInputRef = useRef(null)
  const quantityInputRef = useRef(null)
  const lengthInputRef = useRef(null)

  const { copyText } = useClipboard()
  const addHistory = useHistoryStore((s) => s.add)

  function handleLengthKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = parseFloat(length)
    if (!value || value <= 0) {
      toast.error('Enter a valid length')
      return
    }
    setModal({ open: true, field: 'length', value })
  }

  function handleWidthKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = parseFloat(width)
    if (!value || value <= 0) {
      toast.error('Enter a valid width')
      return
    }
    setModal({ open: true, field: 'width', value })
  }

  function handleUnitSelect(unitId) {
    if (modal.field === 'length') {
      setLengthUnit(unitId)
      setModal(EMPTY_MODAL)
      setTimeout(() => widthInputRef.current?.focus(), 0)
    } else if (modal.field === 'width') {
      setWidthUnit(unitId)
      setModal(EMPTY_MODAL)
      setTimeout(() => quantityInputRef.current?.focus(), 0)
    }
  }

  async function handleQuantityKeyDown(e) {
    if (e.key !== 'Enter') return
    const qty = parseFloat(quantity)
    if (!qty || qty <= 0) {
      toast.error('Enter a valid quantity')
      return
    }

    const area = calculateAreaSqMeters({
      length: parseFloat(length),
      lengthUnit,
      width: parseFloat(width),
      widthUnit,
      quantity: qty,
    })
    const formatted = `${area.toFixed(2)} m²`
    setOutput(formatted)

    const summary = `${length} ${getUnit(lengthUnit).symbol} × ${width} ${getUnit(widthUnit).symbol} × ${qty} pcs`
    addHistory({ toolId: 'quantity-conversion', toolName: 'Quantity Conversion', input: summary, output: formatted })

    await copyText(formatted)
  }

  function handleReset() {
    setLength('')
    setLengthUnit(null)
    setWidth('')
    setWidthUnit(null)
    setQuantity('')
    setOutput('')
    setModal(EMPTY_MODAL)
    setTimeout(() => lengthInputRef.current?.focus(), 0)
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl w-full mx-auto">
      <div className="text-center sm:text-left">
        <h1 className="text-xl font-semibold text-text">Quantity Conversion</h1>
        <p className="text-sm text-text-muted">
          Enter length, width and quantity to get the total area in square meters. Press Enter after each value.
        </p>
      </div>

      <Card className="p-6 flex flex-col gap-4">
        <Field
          label="Length"
          inputRef={lengthInputRef}
          value={length}
          onChange={setLength}
          onKeyDown={handleLengthKeyDown}
          unit={lengthUnit && getUnit(lengthUnit).symbol}
          autoFocus
        />
        <Field
          label="Width"
          inputRef={widthInputRef}
          value={width}
          onChange={setWidth}
          onKeyDown={handleWidthKeyDown}
          unit={widthUnit && getUnit(widthUnit).symbol}
          disabled={!lengthUnit}
        />
        <Field
          label="Quantity (number of items)"
          inputRef={quantityInputRef}
          value={quantity}
          onChange={setQuantity}
          onKeyDown={handleQuantityKeyDown}
          disabled={!widthUnit}
        />

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-text-muted">Total Area</p>
            <p className="text-2xl font-semibold text-text">{output || '—'}</p>
          </div>
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw size={16} /> Reset
          </Button>
        </div>
      </Card>

      <UnitSelectModal
        open={modal.open}
        title={modal.field === 'length' ? 'Select unit for Length' : 'Select unit for Width'}
        value={modal.value}
        units={LENGTH_UNITS}
        onSelect={handleUnitSelect}
        onCancel={() => setModal(EMPTY_MODAL)}
      />
    </div>
  )
}

function Field({ label, inputRef, value, onChange, onKeyDown, unit, disabled, autoFocus }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-text">{label}</span>
      <div className="relative">
        <input
          ref={inputRef}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder="Type a number, then press Enter"
          className="w-full rounded-lg border border-border bg-card py-2 pl-3 pr-14 text-sm text-text outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-primary">
            {unit}
          </span>
        )}
      </div>
    </label>
  )
}
