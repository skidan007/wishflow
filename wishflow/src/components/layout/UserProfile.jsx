import { Settings } from 'lucide-react'

export default function UserProfile() {
  return (
    <div className="flex items-center gap-3 border-t border-white/10 px-4 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-sm font-semibold text-emerald-100">
        HR
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">HR Admin</p>
        <p className="truncate text-xs text-emerald-100/60">Administrator</p>
      </div>
      <button
        type="button"
        aria-label="Account settings"
        className="rounded-md p-1.5 text-emerald-100/60 hover:bg-white/5 hover:text-white"
      >
        <Settings size={16} />
      </button>
    </div>
  )
}
