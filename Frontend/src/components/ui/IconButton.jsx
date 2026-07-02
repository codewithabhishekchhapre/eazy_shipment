export function IconButton({ className = '', children, label, ...props }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:bg-card hover:text-text transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
