import { Cake, CalendarDays, Image, Users } from 'lucide-react'
import { dashboardStats } from '../../data/dashboardStats'
import SummaryCard from './SummaryCard'

const cardStyles = {
  'total-employees': { icon: Users, accentClassName: 'bg-emerald-50 text-emerald-600' },
  'upcoming-birthdays': { icon: Cake, accentClassName: 'bg-sky-50 text-sky-600' },
  'birthdays-this-month': { icon: CalendarDays, accentClassName: 'bg-violet-50 text-violet-600' },
  'posters-generated': { icon: Image, accentClassName: 'bg-amber-50 text-amber-600' },
}

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat) => (
        <SummaryCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          icon={cardStyles[stat.id].icon}
          accentClassName={cardStyles[stat.id].accentClassName}
        />
      ))}
    </div>
  )
}
