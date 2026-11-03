import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../api/users.js'
import { useFetch } from '../hooks/useFetch.js'
import Header from '../components/Header.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import UserCard from '../components/UserCard.jsx'

export default function Users({ openGuide }) {
  const [search, setSearch] = useState('')
  const { data: users, loading, error, refetch } = useFetch(() => fetchUsers(12), [])

  const filtered = useMemo(() => {
    const list = users || []
    const query = search.trim().toLowerCase()
    if (!query) return list
    return list.filter((user) => {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase()
      return fullName.includes(query) || (user.username || '').toLowerCase().includes(query)
    })
  }, [users, search])

  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title="Users" date="User information from DummyJSON" onGuideClick={openGuide} />

      <section className="rounded-3xl bg-sand/60 p-5">
        <h2 className="text-xl font-semibold text-espresso">User information</h2>
        <p className="mt-2 text-sm leading-relaxed text-mocha">
          Browse sample users retrieved from the DummyJSON API.
        </p>
      </section>

      <label htmlFor="user-search" className="sr-only">
        Search users
      </label>
      <input
        id="user-search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or username…"
        autoComplete="off"
        className="rounded-2xl bg-sand px-4 py-3 text-base text-espresso placeholder:text-mocha focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
      />

      {loading ? (
        <Loader text="Loading user information…" />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-mocha">No users match your search.</p>
          ) : (
            filtered.map((user) => <UserCard key={user.id} user={user} />)
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          to="/"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          Back to dashboard
        </Link>
        <Link
          to="/groups"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          Categories
        </Link>
      </div>
    </div>
  )
}