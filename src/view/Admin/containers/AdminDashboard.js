import React, { useState } from 'react'
import { Box, Button, Typography, Card, CardContent, CardActions, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PendingListings from '../components/PendingListings'
import UsersAdminSection from '../components/UsersAdminSection'

export default function AdminDashboard() {
  const theme = useTheme()
  const [showPendingAds, setShowPendingAds] = useState(false)
  const [showUserManagement, setShowUserManagement] = useState(false)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        p: 3,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Admin Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage platform users and review pending property advertisements.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              Approve Property Ads
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Review pending property advertisements before they become visible.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant={showPendingAds ? 'outlined' : 'contained'}
              onClick={() => setShowPendingAds((prev) => !prev)}
            >
              {showPendingAds ? 'Hide Pending Ads' : 'View Pending Ads'}
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              User Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              View, edit and activate or deactivate registered user accounts.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant={showUserManagement ? 'outlined' : 'contained'}
              onClick={() => setShowUserManagement((prev) => !prev)}
            >
              {showUserManagement ? 'Hide Users' : 'Manage Users'}
            </Button>
          </CardActions>
        </Card>
      </Box>

      {showPendingAds && (
        <>
          <Divider sx={{ mb: 3 }} />
          <PendingListings />
        </>
      )}

      {showUserManagement && (
        <>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>
              User Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage all registered users. Activate or deactivate accounts as needed.
            </Typography>
          </Box>
          <UsersAdminSection />
        </>
      )}
    </Box>
  )
}