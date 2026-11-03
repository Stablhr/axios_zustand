export default function Loader({ text = 'Loading…' }) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-3xl bg-sand/60 px-4 py-3 text-sm text-mocha"
    >
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-sand-dark border-t-latte"
        aria-hidden="true"
      />
      <span>{text}</span>
    </div>
  )
}