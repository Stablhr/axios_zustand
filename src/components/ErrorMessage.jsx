export default function ErrorMessage({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="rounded-3xl bg-rose/10 px-4 py-3 text-sm text-rose"
    >
      <p>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 min-h-11 rounded-2xl bg-rose px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-rose/90 focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}