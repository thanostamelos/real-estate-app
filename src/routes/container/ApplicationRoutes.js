import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../view/Home/containers/Home'
import NewListing from '../../view/NewListing/NewListing'
import OwnerDashboard from '../../view/Owner/containers/OwnerDashboard'
import AgencyDashboard from '../../view/Agency/containers/AgencyDashboard'
import Profile from '../../view/Profile/components/Profile'

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-listing" element={<NewListing />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      <Route path="/agency-dashboard" element={<AgencyDashboard />} />
      <Route path="/login" />
      <Route path="/signup" />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default ApplicationRoutes
