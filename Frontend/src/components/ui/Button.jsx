const VARIANTS = {
  primary: 'bg-primary hover:bg-primary-hover text-white',
  secondary: 'bg-card hover:brightness-95 dark:hover:brightness-110 text-text border border-border',
  success: 'bg-success hover:brightness-95 text-white',
  ghost: 'bg-transparent hover:bg-card text-text',
}

export function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
