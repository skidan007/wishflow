import { Gift } from 'lucide-react'
import OrgSwitcher from './OrgSwitcher'
import SidebarNav from './SidebarNav'
import UserProfile from './UserProfile'

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-[#123524]">
      <div className="brand flex items-center gap-2 px-4 pb-4 pt-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
          <Gift size={18} />
        </span>
        <span className="text-base font-bold tracking-tight text-white">WishFlow</span>
      </div>

      <OrgSwitcher />
      <SidebarNav />
      <UserProfile />
    </aside>
  )
}
