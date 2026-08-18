import { formatBirthday, getBirthdayStatus } from '../../utils/date'
import EmployeeActionsMenu from './EmployeeActionsMenu'

const birthdayStyles = {
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

export default function EmployeeRow({ employee }) {
  const { name, jobTitle, department, dob, isActive } = employee
  const { status, label } = getBirthdayStatus(dob)

  return (
    <tr
      // The employee details page isn't built yet, so this click is a no-op placeholder.
      onClick={() => {}}
      className="cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50"
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#123524]/10 text-sm font-semibold text-[#123524]">
            {getInitials(name)}
          </span>
          <span className="truncate text-sm font-semibold text-[#1d2a25]">{name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{jobTitle}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{department}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatBirthday(dob)}</td>
      <td className="px-4 py-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${birthdayStyles[status]}`}>{label}</span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isActive ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <EmployeeActionsMenu />
      </td>
    </tr>
  )
}
