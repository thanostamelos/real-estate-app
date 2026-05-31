import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ListingAdminSection from '../../Dashboard/components/ListingAdminSection'
import AgencyAnalyticsPanel from '../components/AgencyAnalyticsPanel'

export default function AgencyDashboard() {
  const theme = useTheme()
  const [showAnalytics, setShowAnalytics] = useState(false)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Agency Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            See your agency metrics and manage agency listings.
          </Typography>
        </Box>
        <Button
          variant={showAnalytics ? 'outlined' : 'contained'}
          onClick={() => setShowAnalytics((prev) => !prev)}
        >
          {showAnalytics ? 'Hide Analytics' : 'View Analytics'}
        </Button>
      </Box>

      {showAnalytics && <AgencyAnalyticsPanel />}

      <ListingAdminSection
        role="Agency"
        title="Agency Dashboard"
        subtitle="Manage agency listings in one place, update details, or remove listings easily."
      />
    </Box>
  )
}
