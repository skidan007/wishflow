import {
  LayoutDashboard,
  Users,
  Cake,
  Calendar,
  Sparkles,
  LayoutTemplate,
  Bell,
  Settings,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../../data/navigation'

const icons = {
  LayoutDashboard,
  Users,
  Cake,
  Calendar,
  Sparkles,
  LayoutTemplate,
  Bell,
  Settings,
}

export default function SidebarNav() {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="space-y-1">
        {navigation.map((item) => {
          const Icon = icons[item.icon]
          return (
            <li key={item.id}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-emerald-100/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={18} strokeWidth={2} />
                {item.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
