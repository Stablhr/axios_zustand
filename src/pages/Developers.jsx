import { Link } from 'react-router-dom'
import { fetchUsers } from '../api/users.js'
import { useFetch } from '../hooks/useFetch.js'
import Header from '../components/Header.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import UserCard from '../components/UserCard.jsx'

const developers = [
  { name: 'LAPAZ, JASMINE', role: 'Student Developer' },
  { name: 'SAMSON, ARIES B', role: 'Student Developer' },
  { name: 'TALLA, JOHN HAROLD', role: 'Student Developer' },
  { name: 'VINOYA, JURICHIN', role: 'Student Developer' },
]

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function Developers({ openGuide }) {
  const { data: users, loading, error, refetch } = useFetch(() => fetchUsers(12), [])

  return (
    <div className="flex flex-col gap-5 px-0 py-2">
      <Header title="Developers" onGuideClick={openGuide} />

      <h2 className="text-center text-xl font-semibold text-espresso">
        Meet the Developers
      </h2>

      <ul className="flex flex-col gap-3">
        {developers.map((dev) => (
          <li
            key={dev.name}
            className="flex items-center gap-4 rounded-3xl bg-sand/60 p-4 sm:p-5"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-latte text-base font-semibold text-white">
              {initials(dev.name)}
            </span>
            <div className="min-w-0">
              <div className="truncate font-semibold text-espresso">{dev.name}</div>
              <div className="text-sm text-mocha">{dev.role}</div>
            </div>
          </li>
        ))}
      </ul>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-espresso">Sample users from DummyJSON</h2>
        {loading ? (
          <Loader text="Loading user information…" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <div className="flex flex-col gap-3">
            {(users || []).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </section>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Link
          to="/"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          Back to dashboard
        </Link>
        <Link
          to="/categories"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          Categories
        </Link>
        <Link
          to="/users"
          className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-sand px-5 py-3 font-medium text-espresso transition-colors duration-150 hover:bg-sand-dark focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none"
        >
          Users
        </Link>
      </div>
    </div>
  )
}