import { BellRing, CalendarDays, Clock3 } from 'lucide-react';
import { BirthdayCalendar } from '@/components/calendar/birthday-calendar';
import { formatBirthday, getBirthdaysForMonth, reminderLabel } from '@/lib/birthday-reminders';
import { createClient } from '@/lib/supabase/server';

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from('users').select('organization_id').eq('id', user.id).single() : { data: null };
  const { data: employees } = profile ? await supabase.from('employees').select('id, first_name, last_name, department, birthday_month, birthday_day').eq('organization_id', profile.organization_id).eq('active', true) : { data: [] };
  const { data: reminders } = profile ? await supabase.from('birthday_reminders').select('id, reminder_type, scheduled_for, status, employees(first_name, last_name)').eq('organization_id', profile.organization_id).gte('scheduled_for', new Date().toISOString()).order('scheduled_for').limit(5) : { data: [] };
  const now = new Date();
  const birthdayEntries = (employees || []).map((employee) => ({ id: employee.id, name: `${employee.first_name} ${employee.last_name}`, department: employee.department, month: Number(employee.birthday_month), day: Number(employee.birthday_day) }));
  const thisMonth = getBirthdaysForMonth(employees || [], now.getUTCFullYear(), now.getUTCMonth() + 1);

  return <main className="min-h-screen p-5 md:p-8"><header className="mx-auto max-w-7xl"><p className="text-sm font-medium text-[#6B5CE7]">Celebration planner</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Birthday calendar</h1><p className="mt-1 text-slate-500">See every celebration at a glance and keep reminders ready.</p></header>
    <section className="mx-auto mt-8 grid max-w-7xl gap-6 xl:grid-cols-[1.7fr_0.8fr]"><div className="overflow-hidden rounded-2xl border bg-white shadow-card"><BirthdayCalendar birthdays={birthdayEntries} initialYear={now.getUTCFullYear()} initialMonth={now.getUTCMonth() + 1}/></div>
      <aside className="space-y-6"><div className="rounded-2xl bg-ink p-6 text-white shadow-card"><BellRing size={21} className="text-violet-200"/><h2 className="mt-5 text-xl font-bold">Reminder engine</h2><p className="mt-2 text-sm leading-6 text-slate-300">WishFlow prepares reminders for one week before, one day before, and 9:00 AM on every birthday.</p><p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-sm text-violet-100">Refresh the queue after adding or importing people.</p></div>
        <div className="rounded-2xl border bg-white p-5 shadow-card"><div className="flex items-center gap-2"><CalendarDays size={18} className="text-[#6B5CE7]"/><h2 className="font-bold">This month</h2></div><div className="mt-4 space-y-3">{thisMonth.length ? thisMonth.map((employee) => <div key={employee.id} className="flex items-center justify-between gap-3 text-sm"><div><p className="font-semibold">{employee.first_name} {employee.last_name}</p><p className="text-slate-500">{employee.department || 'Team member'}</p></div><span className="whitespace-nowrap rounded-lg bg-lavender px-2 py-1 text-xs font-semibold text-[#5143bd]">{formatBirthday(employee.birthday_month, employee.birthday_day)}</span></div>) : <p className="text-sm text-slate-500">No birthdays this month.</p>}</div></div>
        <div className="rounded-2xl border bg-white p-5 shadow-card"><div className="flex items-center gap-2"><Clock3 size={18} className="text-[#6B5CE7]"/><h2 className="font-bold">Upcoming queue</h2></div><div className="mt-4 space-y-3">{(reminders || []).length ? reminders.map((reminder) => <div key={reminder.id} className="text-sm"><p className="font-semibold">{reminder.employees?.first_name} {reminder.employees?.last_name}</p><p className="text-slate-500">{reminderLabel(reminder.reminder_type)} · {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(reminder.scheduled_for))}</p></div>) : <p className="text-sm text-slate-500">No queued reminders yet.</p>}</div></div>
      </aside></section></main>;
}
