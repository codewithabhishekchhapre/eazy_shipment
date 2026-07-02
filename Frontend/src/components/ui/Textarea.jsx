export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full min-h-[220px] resize-y rounded-lg border border-border bg-card text-text p-3 text-sm outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  )
}
