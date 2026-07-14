import { DashboardSidebar } from '../../components/dashboard/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr]">
      <DashboardSidebar />
      {children}
    </div>
  );
}
