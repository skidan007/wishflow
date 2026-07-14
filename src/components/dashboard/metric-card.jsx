export function MetricCard({ title, value, note, icon: Icon, tone }) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span className={`rounded-xl p-2.5 ${tone}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-5 text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-emerald-600">{note}</p>
    </article>
  );
}
