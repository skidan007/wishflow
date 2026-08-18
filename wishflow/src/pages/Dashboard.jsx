import BirthdayAlert from '../components/dashboard/BirthdayAlert'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import SummaryCards from '../components/dashboard/SummaryCards'
import UpcomingBirthdays from '../components/dashboard/UpcomingBirthdays'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <BirthdayAlert count={3} />
      <SummaryCards />
      <UpcomingBirthdays />
    </div>
  )
}
