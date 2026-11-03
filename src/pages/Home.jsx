import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useTaskStore } from '../store/useTaskStore.js'
import { fetchUserById } from '../api/users.js'
import { useFetch } from '../hooks/useFetch.js'
import Header from '../components/Header.jsx'
import ProgressStrip from '../components/ProgressStrip.jsx'
import StatCard from '../components/StatCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import UserCard from '../components/UserCard.jsx'

const dateLabel = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
})

export default function Home() {
  const tasks = useTaskStore((s) => s.tasks)
  const clearAllTasks = useTaskStore((s) => s.clearAllTasks)

  const total = useMemo(() => tasks.length, [tasks])
  const completed = useMemo(() => tasks.filter((t) => t.done).length, [tasks])
  const pending = total - completed
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  const { data: user, loading, error, refetch } = useFetch(
    () => fetchUserById(1),
    [],
  )

  function handleClearAll() {
    if (total === 0) return
    if (window.confirm('Clear all tasks? This cannot be undone.')) {
      clearAllTasks()
    }
  }

  const welcomeName = user?.firstName ? `, ${user.firstName}` : ''

  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title="Home" date={dateLabel} />

      <section className="rounded-3xl bg-sand/60 p-5">
        <h2 className="text-xl font-semibold text-espresso">
          Welcome back{welcomeName}! Here's your day at a glance.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-mocha">
          A calm, warm place to keep your tasks organized by group. Create groups,
          add tasks, and track your progress — all in one spot.
        </p>
      </section>

      <ProgressStrip total={total} done={completed} />

      <section className="grid grid-cols-3 gap-2 sm:gap-3">
        <StatCard label="Total" value={total} />
        <StatCard label="Completed" value={completed} accent />
        <StatCard label="Pending" value={pending} />
      </section>

      <section className="rounded-3xl bg-sand/60 p-4 text-center">
        <div className="text-sm text-mocha">Overall progress</div>
        <div className="mt-1 text-2xl font-semibold text-espresso">{percent}%</div>
      </section>

      <section className="flex flex-col gap-3">
        {loading ? (
          <Loader text="Loading user information…" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : user ? (
          <UserCard user={user} compact showEmail />
        ) : null}
      </section>

      <section className="flex flex-col gap-2 sm:flex-row">
        <Link
          to="/groups"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none"
        >
          Categories
        </Link>
        <Link
          to="/users"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          Users
        </Link>
        <Link
          to="/guide"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          User Guide
        </Link>
        <Link
          to="/developers"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          Developers
        </Link>
      </section>

      <button
        type="button"
        onClick={handleClearAll}
        disabled={total === 0}
        className="min-h-11 self-start text-sm text-mocha transition-colors duration-150 hover:text-rose disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
      >
        Clear all tasks
      </button>
    </div>
  )
}