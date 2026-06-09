import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../view/Home/containers/Home'
import NewListing from '../../view/NewListing/NewListing'
import OwnerDashboard from '../../view/Owner/containers/OwnerDashboard'
import AgencyDashboard from '../../view/Agency/containers/AgencyDashboard'
import AdminDashboard from '../../view/Admin/containers/AdminDashboard'
import Profile from '../../view/Profile/components/Profile'
import Login from '../../view/Auth/Login'
import Signup from '../../view/Auth/Signup'
import RequireAuth from '../components/RequireAuth'
import RequireRole from '../components/RequireRole'
import RequireGuest from '../components/RequireGuest'

const ApplicationRoutes = () => {
  return (
    <Routes>
      {/* Publicly available, but normally Home is where listings are */}
      <Route path="/" element={<Home />} />
      
      {/* Auth required for profile */}
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

      {/* Role specific routes */}
      <Route path="/new-listing" element={<RequireRole roles={['Owner', 'Agency']}><NewListing /></RequireRole>} />
      <Route path="/owner-dashboard" element={<RequireRole roles={['Owner']}><OwnerDashboard /></RequireRole>} />
      <Route path="/agency-dashboard" element={<RequireRole roles={['Agency']}><AgencyDashboard /></RequireRole>} />
      <Route path="/admin-dashboard" element={<RequireRole roles={['Admin']}><AdminDashboard /></RequireRole>} />

      {/* Guest only routes */}
      <Route path="/login" element={<RequireGuest><Login /></RequireGuest>} />
      <Route path="/signup" element={<RequireGuest><Signup /></RequireGuest>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default ApplicationRoutes
