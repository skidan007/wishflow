import { upcomingBirthdays } from '../../data/upcomingBirthdays'
import BirthdayListItem from './BirthdayListItem'

export default function UpcomingBirthdays() {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="section-heading mb-2 flex items-center justify-between">
        <h2 className="text-lg text-[#1d2a25]">Upcoming Birthdays</h2>
      </div>
      <ul className="divide-y divide-gray-100">
        {upcomingBirthdays.map((employee) => (
          <BirthdayListItem key={employee.id} {...employee} />
        ))}
      </ul>
    </section>
  )
}
