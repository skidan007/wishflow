export default function SummaryCard({ icon: Icon, label, value, accentClassName }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentClassName}`}>
        <Icon size={20} />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-[#1d2a25]">{value}</p>
        <p className="truncate text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
}
