import { Search } from 'lucide-react'

export default function EmployeeFilters({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  departments,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name, title, or department..."
          className="w-72 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      <select
        value={department}
        onChange={(event) => onDepartmentChange(event.target.value)}
        className="rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
      >
        <option value="all">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  )
}
