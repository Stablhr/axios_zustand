import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTaskStore } from '../store/useTaskStore.js'
import Header from '../components/Header.jsx'
import GroupCard from '../components/GroupCard.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Groups({ openGuide }) {
  const groups = useTaskStore((s) => s.groups)
  const tasks = useTaskStore((s) => s.tasks)
  const addGroup = useTaskStore((s) => s.addGroup)
  const deleteGroup = useTaskStore((s) => s.deleteGroup)
  const clearGroupTasks = useTaskStore((s) => s.clearGroupTasks)

  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const counts = useMemo(() => {
    const map = {}
    for (const task of tasks) {
      if (!map[task.groupId]) map[task.groupId] = { total: 0, done: 0 }
      map[task.groupId].total += 1
      if (task.done) map[task.groupId].done += 1
    }
    return map
  }, [tasks])

  function handleCreate(event) {
    event.preventDefault()
    const result = addGroup(name)
    if (!result.ok) {
      setError(result.error)
    } else {
      setName('')
      setError('')
    }
  }

  function handleDeleteGroup(group) {
    const taskCount = counts[group.id]?.total || 0
    const message =
      taskCount > 0
        ? `Delete category "${group.name}" and its ${taskCount} task(s)? This cannot be undone.`
        : `Delete category "${group.name}"? This cannot be undone.`
    if (window.confirm(message)) {
      deleteGroup(group.id)
    }
  }

  function handleClearGroup(group) {
    const taskCount = counts[group.id]?.total || 0
    if (taskCount === 0) return
    if (window.confirm(`Clear all ${taskCount} task(s) in "${group.name}"?`)) {
      clearGroupTasks(group.id)
    }
  }

  function countFor(groupId) {
    return counts[groupId] || { total: 0, done: 0 }
  }

  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title="Categories" onGuideClick={openGuide} />

      <form onSubmit={handleCreate} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="new-group" className="sr-only">
          New group name
        </label>
        <input
          id="new-group"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (error) setError('')
          }}
          placeholder="New category name…"
          autoComplete="off"
          className="min-w-0 flex-1 rounded-2xl bg-sand px-4 py-3 text-base text-espresso placeholder:text-mocha focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        />
        <button
          type="submit"
          className="w-full shrink-0 rounded-2xl bg-latte px-5 py-3 font-medium text-white shadow-btn transition-[background-color,transform] duration-150 ease-out hover:bg-latte-dark active:scale-95 focus-visible:ring-2 focus-visible:ring-latte-dark/60 focus-visible:outline-none sm:w-auto"
        >
          Create Category
        </button>
      </form>
      {error ? (
        <p className="text-sm text-rose" role="alert">
          {error}
        </p>
      ) : null}

      {groups.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="flex flex-col gap-3">
          {groups.map((group) => {
            const { total, done } = countFor(group.id)
            return (
              <GroupCard
                key={group.id}
                group={group}
                taskCount={total}
                doneCount={done}
                onDelete={() => handleDeleteGroup(group)}
                onClear={() => handleClearGroup(group)}
              />
            )
          })}
        </ul>
      )}

      <Link
        to="/"
        className="self-start text-sm text-mocha transition-colors duration-150 hover:text-espresso focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
      >
        ← Back to dashboard
      </Link>
    </div>
  )
}