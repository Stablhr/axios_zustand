import { NavLink } from 'react-router-dom'
import { CoffeeIcon, ListIcon, PersonIcon, UsersIcon } from './icons.jsx'

// `end` on Home so it is only active on exactly "/".
const LINKS = [
  { to: '/', label: 'Home', Icon: CoffeeIcon, end: true },
  { to: '/categories', label: 'Categories', Icon: ListIcon },
  { to: '/users', label: 'Users', Icon: UsersIcon },
  { to: '/developers', label: 'Developers', Icon: PersonIcon },
]

export default function Navbar() {
  return (
    <nav aria-label="Main navigation" className="rounded-3xl bg-sand p-0.5 shadow-card sm:p-1.5">
      <ul className="grid w-full grid-cols-4 gap-0 sm:gap-1">
        {LINKS.map(({ to, label, Icon, end }) => (
          <li key={to} className="min-w-0">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-11 min-w-0 w-full items-center justify-center gap-0.5 rounded-2xl px-0 text-[11px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-latte/60 focus-visible:outline-none sm:gap-1.5 sm:px-1 sm:text-sm ${
                  isActive
                    ? 'bg-cream text-latte-dark shadow-btn'
                    : 'text-mocha hover:text-espresso'
                }`
              }
            >
              <Icon className="h-3 w-3 shrink-0 sm:h-5 sm:w-5" />
              <span className="truncate">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}