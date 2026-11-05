import Header from '../components/Header.jsx'

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

    </div>
  )
}