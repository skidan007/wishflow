'use server';

import { revalidatePath } from 'next/cache';
import { buildReminderPlan } from '@/lib/birthday-reminders';
import { createClient } from '@/lib/supabase/server';

async function organizationContext() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  const { data: profile } = await supabase.from('users').select('organization_id').eq('id', user.id).single();
  if (!profile) throw new Error('Organization not found');
  return { supabase, organizationId: profile.organization_id };
}

export async function refreshBirthdayReminders() {
  const { supabase, organizationId } = await organizationContext();
  const { data: employees, error: employeeError } = await supabase
    .from('employees')
    .select('id, first_name, last_name, birthday_month, birthday_day')
    .eq('organization_id', organizationId)
    .eq('active', true);
  if (employeeError) return { error: employeeError.message };

  const plan = buildReminderPlan(employees || []);
  if (!plan.length) return { success: true, count: 0 };
  const first = plan[0].scheduled_for;
  const last = plan.at(-1).scheduled_for;
  const { data: existing, error: existingError } = await supabase
    .from('birthday_reminders')
    .select('employee_id, reminder_type, scheduled_for')
    .eq('organization_id', organizationId)
    .gte('scheduled_for', first)
    .lte('scheduled_for', last);
  if (existingError) return { error: existingError.message };

  const known = new Set((existing || []).map((row) => `${row.employee_id}:${row.reminder_type}:${row.scheduled_for}`));
  const rows = plan
    .filter((reminder) => !known.has(`${reminder.employeeId}:${reminder.reminder_type}:${reminder.scheduled_for}`))
    .map(({ employeeId, reminder_type, scheduled_for }) => ({
      organization_id: organizationId,
      employee_id: employeeId,
      reminder_type,
      scheduled_for,
    }));
  if (rows.length) {
    const { error } = await supabase.from('birthday_reminders').insert(rows);
    if (error) return { error: error.message };
  }
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/calendar');
  return { success: true, count: rows.length };
}
