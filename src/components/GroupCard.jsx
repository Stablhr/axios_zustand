import { Link } from 'react-router-dom'
import { TrashIcon } from './icons.jsx'

export default function GroupCard({ group, taskCount, doneCount, onDelete, onClear }) {
  return (
    <li className="rounded-3xl bg-sand/60 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h2 className="min-w-0 break-words text-lg font-semibold text-espresso">
            {group.name}
          </h2>
          <p className="mt-1 text-sm text-mocha">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'} · {doneCount} done
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onClear}
            disabled={taskCount === 0}
            className="rounded-2xl bg-sand px-3 py-2 text-xs font-medium text-mocha transition-colors duration-150 hover:text-rose disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
          >
            Clear all
          </button>
          <Link
            to={`/categories/${group.id}`}
            className="rounded-2xl bg-latte px-4 py-2 text-sm font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none"
          >
            Open
          </Link>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete category: ${group.name}`}
            className="grid h-10 w-10 place-items-center rounded-full text-mocha transition-colors duration-150 hover:bg-rose/10 hover:text-rose focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  )
}