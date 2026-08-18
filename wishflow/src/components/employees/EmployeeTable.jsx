import EmployeeRow from './EmployeeRow'

export default function EmployeeTable({ employees }) {
  if (employees.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
        No employees match your search.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full min-w-180 border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-400">
            <th className="px-4 py-3">Employee</th>
            <th className="px-4 py-3">Job Title</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Date of Birth</th>
            <th className="px-4 py-3">Birthday</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <EmployeeRow key={employee.id} employee={employee} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
