'use client';

import { useMemo, useState, useTransition } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { refreshBirthdayReminders } from '@/app/dashboard/calendar/actions';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const colors = ['bg-violet-100 text-violet-700', 'bg-rose-100 text-rose-700', 'bg-sky-100 text-sky-700', 'bg-amber-100 text-amber-700'];

export function BirthdayCalendar({ birthdays, initialYear, initialMonth }) {
  const [view, setView] = useState({ year: initialYear, month: initialMonth });
  const [notice, setNotice] = useState('');
  const [pending, startTransition] = useTransition();
  const days = useMemo(() => {
    const first = new Date(Date.UTC(view.year, view.month - 1, 1));
    const count = new Date(Date.UTC(view.year, view.month, 0)).getUTCDate();
    return Array.from({ length: first.getUTCDay() + count }, (_, index) => index < first.getUTCDay() ? null : index - first.getUTCDay() + 1);
  }, [view]);
  const title = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(view.year, view.month - 1, 1)));
  const previous = () => setView(({ year, month }) => month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 });
  const next = () => setView(({ year, month }) => month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 });
  const sync = () => startTransition(async () => {
    const result = await refreshBirthdayReminders();
    setNotice(result.error || (result.count ? `${result.count} reminders added to the queue.` : 'Your reminder queue is already up to date.'));
  });

  return <>
    <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2"><button onClick={previous} aria-label="Previous month" className="rounded-lg p-2 hover:bg-slate-100"><ChevronLeft size={19}/></button><h2 className="min-w-44 text-center text-lg font-bold">{title}</h2><button onClick={next} aria-label="Next month" className="rounded-lg p-2 hover:bg-slate-100"><ChevronRight size={19}/></button></div>
      <button onClick={sync} disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6B5CE7] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><RefreshCw size={16} className={pending ? 'animate-spin' : ''}/>{pending ? 'Refreshing...' : 'Refresh reminders'}</button>
    </div>
    {notice && <p className="mx-5 mt-4 rounded-xl bg-lavender px-4 py-3 text-sm text-[#5143bd]">{notice}</p>}
    <div className="grid grid-cols-7 border-l border-t">
      {weekdays.map((day) => <div key={day} className="border-b border-r bg-slate-50 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">{day}</div>)}
      {days.map((day, index) => {
        const people = day ? birthdays.filter((person) => person.day === day && person.month === view.month) : [];
        return <div key={index} className="min-h-24 border-b border-r p-2 sm:min-h-32"><span className={day ? 'grid h-6 w-6 place-items-center rounded-full text-sm font-medium' : ''}>{day}</span>{people.map((person, personIndex) => <div key={person.id} title={`${person.name} — ${person.department || 'Birthday'}`} className={`mt-1.5 truncate rounded-md px-1.5 py-1 text-xs font-semibold ${colors[personIndex % colors.length]}`}><span className="hidden sm:inline">🎂 </span>{person.name}</div>)}</div>;
      })}
    </div>
  </>;
}
