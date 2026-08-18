import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { organizations } from '../../data/organizations'

export default function OrgSwitcher() {
  const [selectedId, setSelectedId] = useState(organizations[0].id)

  return (
    <div className="relative px-4 pb-2">
      <label className="sr-only" htmlFor="org-switcher">
        Organization
      </label>
      <div className="relative">
        <select
          id="org-switcher"
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
          className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 py-2 pl-3 pr-9 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        >
          {organizations.map((org) => (
            <option key={org.id} value={org.id} className="text-gray-900">
              {org.name}
            </option>
          ))}
        </select>
        <ChevronsUpDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-100/60"
        />
      </div>
    </div>
  )
}
