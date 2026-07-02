export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`bg-surface border border-border rounded-xl shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
