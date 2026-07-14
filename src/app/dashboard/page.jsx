import { Bell, CalendarDays, ChevronRight, Heart, MoreHorizontal, Plus, Sparkles, Users } from 'lucide-react';
import { MetricCard } from '../../components/dashboard/metric-card';

const birthdays = [
  { name: 'Amara Okafor', role: 'Product Designer', day: 'Today', color: 'bg-rose-100 text-rose-700' },
  { name: 'Tunde Adeyemi', role: 'Engineering Lead', day: 'Tomorrow', color: 'bg-amber-100 text-amber-700' },
  { name: 'Nneka Obi', role: 'People Operations', day: 'Jul 18', color: 'bg-sky-100 text-sky-700' },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen p-5 md:p-8">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#6B5CE7]">Tuesday, July 14</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Good morning, Sarah <span aria-hidden="true">✦</span>
          </h1>
          <p className="mt-1 text-slate-500">Here’s how your celebrations are looking.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-xl border bg-white p-3">
            <Bell size={19} />
            <i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral" />
          </button>
          <button className="hidden rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white sm:flex sm:items-center sm:gap-2">
            <Plus size={17} />Add employee
          </button>
        </div>
      </header>

      <section className="mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard title="Total employees" value="248" note="+12 this month" icon={Users} tone="bg-violet-100 text-[#6B5CE7]" />
        <MetricCard title="Today's birthdays" value="2" note="Time to celebrate" icon={Heart} tone="bg-rose-100 text-rose-500" />
        <MetricCard title="Upcoming birthdays" value="14" note="Next 30 days" icon={CalendarDays} tone="bg-sky-100 text-sky-500" />
        <MetricCard title="Pending posters" value="4" note="Needs your review" icon={Sparkles} tone="bg-amber-100 text-amber-600" />
        <MetricCard title="AI generations" value="38" note="of 100 this month" icon={Sparkles} tone="bg-emerald-100 text-emerald-600" />
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl gap-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="rounded-2xl border bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Celebrations coming up</h2>
              <p className="mt-1 text-sm text-slate-500">Make every person feel seen.</p>
            </div>
            <button className="text-sm font-semibold text-[#6B5CE7]">View calendar</button>
          </div>
          <div className="mt-6 divide-y">
            {birthdays.map((person, index) => (
              <div className="flex items-center gap-4 py-4 first:pt-0" key={person.name}>
                <div className={`grid h-11 w-11 place-items-center rounded-full font-semibold ${person.color}`}>
                  {person.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-sm text-slate-500">{person.role}</p>
                </div>
                <span className="hidden rounded-lg bg-slate-50 px-2.5 py-1 text-sm font-medium text-slate-600 sm:block">
                  {person.day}
                </span>
                <button className={index === 0 ? 'rounded-xl bg-[#6B5CE7] px-3 py-2 text-sm font-semibold text-white' : 'rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold'}>
                  {index === 0 ? 'Create wish' : 'Preview'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl bg-ink p-6 text-white shadow-card">
          <div className="flex items-center justify-between">
            <span className="rounded-xl bg-white/10 p-2">
              <Sparkles size={19} />
            </span>
            <button>
              <MoreHorizontal size={20} />
            </button>
          </div>
          <p className="mt-8 text-sm font-medium text-violet-200">AI celebration assistant</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight">A thoughtful wish is one click away.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">Generate an on-brand message and poster, then schedule it for the perfect moment.</p>
          <button className="mt-6 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-ink">
            Generate a birthday wish <ChevronRight size={16} />
          </button>
        </aside>
      </section>

      <section className="mx-auto mt-6 max-w-7xl rounded-2xl border bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold">Reminder queue</h2>
            <p className="mt-1 text-sm text-slate-500">Next reminders scheduled for your team.</p>
          </div>
          <button className="text-sm font-semibold text-[#6B5CE7]">Manage reminders</button>
        </div>
        <div className="mt-5 rounded-xl bg-[#F8F8FC] p-4 text-sm text-slate-600">
          No reminders need attention right now. Your next birthday reminder will be sent tomorrow at 9:00 AM.
        </div>
      </section>
    </main>
  );
}
