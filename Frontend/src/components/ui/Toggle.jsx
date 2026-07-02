export function Toggle({ checked, onChange, label }) {
  return (
    <label
      className="flex items-center justify-between gap-4 cursor-pointer select-none py-2"
      onClick={() => onChange(!checked)}
    >
      <span className="text-sm text-text">{label}</span>
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-border'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </label>
  )
}
