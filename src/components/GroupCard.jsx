import { Link } from 'react-router-dom'
import { TrashIcon } from './icons.jsx'

export default function GroupCard({ group, taskCount, doneCount, onDelete, onClear }) {
  return (
    <li className="rounded-3xl bg-sand/60 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="min-w-0 break-words text-base font-semibold leading-snug text-espresso sm:text-lg">
            {group.name}
          </h2>
          <p className="mt-1 whitespace-nowrap text-xs text-mocha sm:text-sm">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'} · {doneCount} done
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onClear}
            disabled={taskCount === 0}
            className="rounded-2xl bg-sand px-2 py-1.5 text-[11px] font-medium text-mocha transition-colors duration-150 hover:text-rose disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none sm:px-3 sm:py-2 sm:text-xs"
          >
            Clear all
          </button>
          <Link
            to={`/categories/${group.id}`}
            className="rounded-2xl bg-latte px-2.5 py-1.5 text-xs font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none sm:px-4 sm:py-2 sm:text-sm"
          >
            Open
          </Link>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete category: ${group.name}`}
            className="grid h-8 w-8 place-items-center rounded-full text-mocha transition-colors duration-150 hover:bg-rose/10 hover:text-rose focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none sm:h-10 sm:w-10"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  )
}