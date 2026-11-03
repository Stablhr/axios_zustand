import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTaskStore } from '../store/useTaskStore.js'
import { fetchUserById } from '../api/users.js'
import { useFetch } from '../hooks/useFetch.js'
import Header from '../components/Header.jsx'
import ProgressStrip from '../components/ProgressStrip.jsx'
import TaskInput from '../components/TaskInput.jsx'
import TaskList from '../components/TaskList.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import UserCard from '../components/UserCard.jsx'

export default function GroupTasks({ openGuide }) {
  const { groupId, categoryId } = useParams()
  const resolvedGroupId = groupId || categoryId

  const groups = useTaskStore((s) => s.groups)
  const allTasks = useTaskStore((s) => s.tasks)
  const addTask = useTaskStore((s) => s.addTask)
  const toggleTask = useTaskStore((s) => s.toggleTask)
  const deleteTask = useTaskStore((s) => s.deleteTask)
  const clearGroupTasks = useTaskStore((s) => s.clearGroupTasks)

  const group = groups.find((g) => g.id === resolvedGroupId)

  const groupTasks = useMemo(
    () => allTasks.filter((task) => task.groupId === resolvedGroupId),
    [allTasks, resolvedGroupId],
  )
  const ordered = useMemo(
    () => [...groupTasks].sort((a, b) => Number(a.done) - Number(b.done)),
    [groupTasks],
  )
  const total = groupTasks.length
  const done = groupTasks.filter((task) => task.done).length

  const [input, setInput] = useState('')

  const { data: user, loading, error, refetch } = useFetch(
    () => fetchUserById(1),
    [],
  )

  if (!group) {
    return (
      <div className="flex flex-col gap-5 px-0 py-2">
        <Header title="Category not found" onGuideClick={openGuide} />
        <section className="rounded-3xl bg-sand/60 p-5 text-center">
          <p className="text-mocha">
            We couldn't find a category with that name. It may have been removed.
          </p>
          <Link
            to="/categories"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none"
          >
            ← Back to Categories
          </Link>
        </section>
      </div>
    )
  }

  function handleAdd() {
    const result = addTask(resolvedGroupId, input)
    if (result.ok) setInput('')
  }

  function handleClear() {
    if (total === 0) return
    if (window.confirm(`Clear all tasks in "${group.name}"?`)) {
      clearGroupTasks(resolvedGroupId)
    }
  }

  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title={group.name} date={`${done} of ${total} done`} onGuideClick={openGuide} />

      <div className="flex flex-wrap items-center gap-2">
        {loading ? (
          <Loader text="Loading user information…" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : user ? (
          <UserCard user={user} compact />
        ) : null}
      </div>

      <Link
        to="/categories"
        className="self-start text-sm text-mocha transition-colors duration-150 hover:text-espresso focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
      >
        ← Back to Categories
      </Link>

      <ProgressStrip total={total} done={done} />

      <TaskInput value={input} onChange={setInput} onAdd={handleAdd} />

      {total === 0 ? <EmptyState /> : (
        <TaskList tasks={ordered} onToggle={toggleTask} onDelete={deleteTask} />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm text-mocha">
          {done} of {total} done
        </span>
        <button
          type="button"
          onClick={handleClear}
          disabled={total === 0}
          className="min-h-11 text-sm text-mocha transition-colors duration-150 hover:text-rose disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-mocha focus-visible:ring-2 focus-visible:ring-rose/50 focus-visible:outline-none"
        >
          Clear all tasks in this category
        </button>
      </div>
    </div>
  )
}