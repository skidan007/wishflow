import { Bell, Plus, Search } from 'lucide-react'

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export default function DashboardHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="page-title text-2xl text-[#1d2a25]">Dashboard</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search employees..."
            className="w-56 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg border border-gray-200 bg-white p-2.5 text-gray-500 hover:text-[#123524]"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-[#123524] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d2a1b]"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>
    </header>
  )
}
