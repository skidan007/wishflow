const statusStyles = {
  today: 'bg-emerald-100 text-emerald-700',
  tomorrow: 'bg-sky-100 text-sky-700',
  upcoming: 'bg-gray-100 text-gray-600',
}

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function BirthdayListItem({ name, role, department, status, statusLabel }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#123524]/10 text-sm font-semibold text-[#123524]">
          {getInitials(name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#1d2a25]">{name}</p>
          <p className="truncate text-xs text-gray-500">
            {role} · {department}
          </p>
        </div>
      </div>
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status] ?? statusStyles.upcoming}`}
      >
        {statusLabel}
      </span>
    </li>
  )
}
