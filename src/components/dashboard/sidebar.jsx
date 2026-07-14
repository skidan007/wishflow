import Link from 'next/link';
import { CalendarDays, LayoutDashboard, Settings, Users } from 'lucide-react';

const links = [
  ['Dashboard', '/dashboard', LayoutDashboard],
  ['Employees', '/dashboard/employees', Users],
  ['Calendar', '/dashboard/calendar', CalendarDays],
  ['Settings', '/dashboard/settings', Settings],
];

export function DashboardSidebar() {
  return (
    <aside className="hidden min-h-screen border-r bg-white p-5 lg:block">
      <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white">W</span>
        WishFlow
      </Link>
      <nav className="mt-10 space-y-1">
        {links.map(([label, href, Icon]) => (
          <Link
            href={href}
            key={label}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-lavender hover:text-[#6B5CE7]"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-20 rounded-2xl bg-lavender p-4">
        <p className="text-sm font-bold">Need a hand?</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">See how WishFlow makes each occasion count.</p>
        <button className="mt-3 text-xs font-bold text-[#6B5CE7]">Visit help center</button>
      </div>
    </aside>
  );
}
