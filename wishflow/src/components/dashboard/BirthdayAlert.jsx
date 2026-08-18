import { PartyPopper } from 'lucide-react'

export default function BirthdayAlert({ count = 3 }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <PartyPopper size={18} />
        </span>
        <p className="text-sm text-amber-900">
          <span className="font-semibold">{count} birthdays</span> need your attention — generate
          celebration posters before it&apos;s too late.
        </p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100"
      >
        View all
      </button>
    </div>
  )
}
