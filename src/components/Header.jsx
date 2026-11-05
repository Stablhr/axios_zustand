import { QuestionIcon } from './icons.jsx'

export default function Header({ title, date, onGuideClick }) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-3xl leading-tight font-medium uppercase break-words text-espresso tracking-[0.1em] short-screen:text-2xl sm:text-4xl sm:tracking-[0.16em]">
          {title}
        </h1>
        {date ? <p className="mt-1 text-sm text-mocha">{date}</p> : null}
      </div>
      {onGuideClick ? (
        <button
          type="button"
          onClick={onGuideClick}
          aria-label="Open user guide"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sand text-latte-dark transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          <QuestionIcon className="h-6 w-6" />
        </button>
      ) : null}
    </header>
  )
}
