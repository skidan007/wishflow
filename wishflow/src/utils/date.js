// Shared date helpers for displaying and estimating employee birthdays.
export function formatBirthday(dob) {
  const date = new Date(dob)
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

export function getBirthdayStatus(dob, today = new Date()) {
  const date = new Date(dob)
  const todayNorm = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const next = new Date(todayNorm.getFullYear(), date.getMonth(), date.getDate())
  if (next < todayNorm) next.setFullYear(next.getFullYear() + 1)

  const diffDays = Math.round((next - todayNorm) / 86400000)
  if (diffDays === 0) return { status: 'today', label: 'Birthday Today' }
  if (diffDays === 1) return { status: 'tomorrow', label: 'Birthday Tomorrow' }
  return { status: 'upcoming', label: `Birthday in ${diffDays} days` }
}
