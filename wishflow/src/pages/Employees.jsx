import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { employees } from '../data/employees'
import EmployeeFilters from '../components/employees/EmployeeFilters'
import EmployeeTable from '../components/employees/EmployeeTable'

const departments = [...new Set(employees.map((employee) => employee.department))].sort()

export default function Employees() {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('all')

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase()
    return employees.filter((employee) => {
      const matchesQuery =
        !query ||
        employee.name.toLowerCase().includes(query) ||
        employee.jobTitle.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      const matchesDepartment = department === 'all' || employee.department === department
      return matchesQuery && matchesDepartment
    })
  }, [search, department])

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title text-2xl text-[#1d2a25]">Employees</h1>
          <p className="text-sm text-gray-500">Manage your team's profiles and birthday details.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-[#123524] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d2a1b]"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <EmployeeFilters
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          departments={departments}
        />
        <p className="text-sm text-gray-500">
          {filteredEmployees.length} of {employees.length} employees
        </p>
      </div>

      <EmployeeTable employees={filteredEmployees} />
    </div>
  )
}
