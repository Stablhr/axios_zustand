import { useState } from 'react'

function initials(user) {
  const first = user?.firstName?.[0] || ''
  const last = user?.lastName?.[0] || ''
  return `${first}${last}`.toUpperCase() || '?'
}

export default function UserCard({ user, compact = false, showEmail = false }) {
  const [imageFailed, setImageFailed] = useState(false)
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim()

  return (
    <article
      className={`flex items-center gap-3 rounded-3xl bg-sand/60 ${
        compact ? 'px-3 py-2' : 'p-4 sm:p-5'
      }`}
    >
      {imageFailed || !user?.image ? (
        <span
          className={`grid shrink-0 place-items-center rounded-full bg-sand text-mocha font-semibold ${
            compact ? 'h-10 w-10 text-sm' : 'h-12 w-12 text-base'
          }`}
          aria-hidden="true"
        >
          {initials(user)}
        </span>
      ) : (
        <img
          src={user.image}
          alt={fullName}
          onError={() => setImageFailed(true)}
          className={`shrink-0 rounded-full object-cover ${
            compact ? 'h-10 w-10' : 'h-12 w-12'
          }`}
        />
      )}

      <div className="min-w-0">
        <div className={`truncate font-semibold text-espresso ${compact ? 'text-sm' : 'text-base'}`}>
          {fullName || 'Unknown user'}
        </div>
        {user?.username ? (
          <div className="truncate text-xs text-mocha">@{user.username}</div>
        ) : null}
        {(showEmail || !compact) && user?.email ? (
          <div className="truncate text-sm text-mocha">{user.email}</div>
        ) : null}
        {!compact && user?.phone ? (
          <div className="truncate text-xs text-mocha">{user.phone}</div>
        ) : null}
        {!compact && user?.company?.name ? (
          <div className="truncate text-xs text-mocha">{user.company.name}</div>
        ) : null}
      </div>
    </article>
  )
}