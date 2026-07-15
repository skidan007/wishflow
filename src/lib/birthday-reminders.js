const REMINDER_RULES = [
  { type: 'week_before', daysBefore: 7, label: '1 week before' },
  { type: 'day_before', daysBefore: 1, label: '1 day before' },
  { type: 'birthday_morning', daysBefore: 0, label: 'Birthday morning' },
];

function daysInMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function birthdayDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, Math.min(day, daysInMonth(year, month))));
}

export function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export function formatBirthday(month, day) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' })
    .format(birthdayDate(2026, month, day));
}

export function getBirthdaysForMonth(employees, year, month) {
  return employees
    .filter((employee) => Number(employee.birthday_month) === month)
    .map((employee) => ({ ...employee, date: birthdayDate(year, month, Number(employee.birthday_day)) }))
    .filter((employee) => employee.date.getUTCMonth() === month - 1)
    .sort((a, b) => a.date - b.date || `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`));
}

export function getUpcomingBirthdays(employees, from = new Date(), daysAhead = 30) {
  const start = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + daysAhead);

  return employees
    .map((employee) => {
      const month = Number(employee.birthday_month);
      const day = Number(employee.birthday_day);
      const birthday = birthdayDate(start.getUTCFullYear(), month, day);
      const nextBirthday = birthday < start ? birthdayDate(start.getUTCFullYear() + 1, month, day) : birthday;
      if (nextBirthday < start || nextBirthday > end) return null;
      return {
        ...employee,
        nextBirthday,
        nextBirthdayLabel: formatBirthday(month, day),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.nextBirthday - b.nextBirthday)
    .slice(0, 6);
}

export function buildReminderPlan(employees, from = new Date(), daysAhead = 90) {
  const start = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + daysAhead);
  const reminders = [];

  for (const employee of employees) {
    for (let year = start.getUTCFullYear(); year <= end.getUTCFullYear() + 1; year += 1) {
      const birthday = birthdayDate(year, Number(employee.birthday_month), Number(employee.birthday_day));
      if (birthday < start || birthday > end) continue;
      for (const rule of REMINDER_RULES) {
        const reminderDay = new Date(birthday);
        reminderDay.setUTCDate(reminderDay.getUTCDate() - rule.daysBefore);
        if (reminderDay < start || reminderDay > end) continue;
        // 09:00 Africa/Lagos (UTC+1) stored as a stable UTC instant.
        reminderDay.setUTCHours(8, 0, 0, 0);
        reminders.push({
          employeeId: employee.id,
          employeeName: `${employee.first_name} ${employee.last_name}`,
          reminder_type: rule.type,
          label: rule.label,
          scheduled_for: reminderDay.toISOString(),
        });
      }
    }
  }

  return reminders.sort((a, b) => new Date(a.scheduled_for) - new Date(b.scheduled_for));
}

export const reminderLabel = (type) => REMINDER_RULES.find((rule) => rule.type === type)?.label || 'Birthday reminder';
