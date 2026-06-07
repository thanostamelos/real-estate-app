import React, { useState } from 'react'
import { Box, Button, Typography, Card, CardContent, CardActions } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PendingListings from '../components/PendingListings'

export default function AdminDashboard() {
  const theme = useTheme()
  const [showPendingAds, setShowPendingAds] = useState(false)

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

      <Card sx={{ width: 300, mb: 3 }}>
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

      {showPendingAds && <PendingListings />}
    </Box>
  )
}