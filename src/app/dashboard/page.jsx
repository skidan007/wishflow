import Link from 'next/link';
import { Bell, CalendarDays, ChevronRight, Heart, MoreHorizontal, Plus, Sparkles, Users } from 'lucide-react';
import { MetricCard } from '../../components/dashboard/metric-card';
import { createClient } from '@/lib/supabase/server';
import { formatBirthday, getUpcomingBirthdays, reminderLabel } from '@/lib/birthday-reminders';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from('users').select('organization_id').eq('id', user.id).single() : { data: null };
  const { data: employees } = profile ? await supabase.from('employees').select('id, first_name, last_name, department, birthday_month, birthday_day').eq('organization_id', profile.organization_id).eq('active', true) : { data: [] };
  const { data: reminders } = profile ? await supabase.from('birthday_reminders').select('id, reminder_type, scheduled_for, status, employees(first_name, last_name)').eq('organization_id', profile.organization_id).gte('scheduled_for', new Date().toISOString()).order('scheduled_for').limit(5) : { data: [] };

  const upcomingBirthdays = getUpcomingBirthdays(employees || [], new Date(), 30);
  const todayBirthdays = upcomingBirthdays.filter((person) => person.nextBirthday.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)).length;
  const pendingReminders = (reminders || []).filter((reminder) => reminder.status !== 'sent').length;
  const colors = ['bg-rose-100 text-rose-700', 'bg-amber-100 text-amber-700', 'bg-sky-100 text-sky-700'];

  return (
    <main className="min-h-screen p-5 md:p-8">
      <header className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#6B5CE7]">{new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Good morning, {user?.user_metadata?.full_name || 'there'} <span aria-hidden="true">✦</span>
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
        <MetricCard title="Total employees" value={String(employees?.length || 0)} note="Active roster" icon={Users} tone="bg-violet-100 text-[#6B5CE7]" />
        <MetricCard title="Today's birthdays" value={String(todayBirthdays)} note="Time to celebrate" icon={Heart} tone="bg-rose-100 text-rose-500" />
        <MetricCard title="Upcoming birthdays" value={String(upcomingBirthdays.length)} note="Next 30 days" icon={CalendarDays} tone="bg-sky-100 text-sky-500" />
        <MetricCard title="Pending reminders" value={String(pendingReminders)} note="In the queue" icon={Sparkles} tone="bg-amber-100 text-amber-600" />
        <MetricCard title="Reminder rules" value="3" note="Week before, day before, morning" icon={Sparkles} tone="bg-emerald-100 text-emerald-600" />
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl gap-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="rounded-2xl border bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Celebrations coming up</h2>
              <p className="mt-1 text-sm text-slate-500">Make every person feel seen.</p>
            </div>
            <Link href="/dashboard/calendar" className="text-sm font-semibold text-[#6B5CE7]">View calendar</Link>
          </div>
          <div className="mt-6 divide-y">
            {upcomingBirthdays.length ? upcomingBirthdays.map((person, index) => (
              <div className="flex items-center gap-4 py-4 first:pt-0" key={person.id}>
                <div className={`grid h-11 w-11 place-items-center rounded-full font-semibold ${colors[index % colors.length]}`}>
                  {`${person.first_name} ${person.last_name}`.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{person.first_name} {person.last_name}</p>
                  <p className="text-sm text-slate-500">{person.department || 'Team member'}</p>
                </div>
                <span className="hidden rounded-lg bg-slate-50 px-2.5 py-1 text-sm font-medium text-slate-600 sm:block">
                  {formatBirthday(person.birthday_month, person.birthday_day)}
                </span>
                <button className={index === 0 ? 'rounded-xl bg-[#6B5CE7] px-3 py-2 text-sm font-semibold text-white' : 'rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold'}>
                  {index === 0 ? 'Create wish' : 'Preview'}
                </button>
              </div>
            )) : <p className="py-4 text-sm text-slate-500">No upcoming birthdays in the next 30 days.</p>}
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
          <Link href="/dashboard/calendar" className="text-sm font-semibold text-[#6B5CE7]">Manage reminders</Link>
        </div>
        <div className="mt-5 space-y-3 rounded-xl bg-[#F8F8FC] p-4 text-sm text-slate-600">
          {reminders?.length ? reminders.map((reminder) => (
            <div key={reminder.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3">
              <div>
                <p className="font-semibold text-slate-800">{reminder.employees?.first_name} {reminder.employees?.last_name}</p>
                <p className="mt-0.5 text-slate-500">{reminderLabel(reminder.reminder_type)} · {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(reminder.scheduled_for))}</p>
              </div>
              <span className="rounded-full bg-lavender px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#6B5CE7]">{reminder.status}</span>
            </div>
          )) : <p>No reminders need attention right now. Your next birthday reminder will be sent on the next scheduled date.</p>}
        </div>
      </section>
    </main>
  );
}
