import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="birthdays" element={<ComingSoon title="Birthdays" />} />
          <Route path="calendar" element={<ComingSoon title="Calendar" />} />
          <Route path="ai-generator" element={<ComingSoon title="AI Generator" />} />
          <Route path="templates" element={<ComingSoon title="Templates" />} />
          <Route path="notifications" element={<ComingSoon title="Notifications" />} />
          <Route path="settings" element={<ComingSoon title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
