import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../view/Home/containers/Home'
import NewListing from '../../view/NewListing/NewListing'
import OwnerDashboard from '../../view/Owner/containers/OwnerDashboard'
import AgencyDashboard from '../../view/Agency/containers/AgencyDashboard'
import AdminDashboard from '../../view/Admin/containers/AdminDashboard'
import Profile from '../../view/Profile/components/Profile'
import Login from '../../view/Auth/Login'
import Signup from '../../view/Auth/Signup'

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-listing" element={<NewListing />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      <Route path="/agency-dashboard" element={<AgencyDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default ApplicationRoutes
