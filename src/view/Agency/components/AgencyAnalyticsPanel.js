import React, { useMemo } from 'react'
import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { selectListings } from '../../../store/slices/data_listings'

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function AgencyAnalyticsPanel() {
  const theme = useTheme()
  const listings = useSelector(selectListings)

  const agencyListings = useMemo(
    () => listings.filter((listing) => listing.owner?.role === 'Agency'),
    [listings],
  )

  const totalProperties = agencyListings.length
  const totalViews = agencyListings.reduce(
    (sum, listing) => sum + (listing.views || 0),
    0,
  )
  const averagePrice = agencyListings.length
    ? Math.round(
        agencyListings.reduce(
          (sum, listing) => sum + (listing.property?.price || 0),
          0,
        ) / agencyListings.length,
      )
    : 0

  const dummyMonthlyLeads = [24, 31, 28, 35, 30, 42]
  const maxLeadValue = Math.max(...dummyMonthlyLeads, 1)

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, mb: 3, border: `1px solid ${theme.palette.divider}` }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Agency Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View property performance and dummy insights for your agency.
          </Typography>
        </Box>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Box
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Total Agency Listings
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {totalProperties}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Total Views
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {totalViews}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Avg. Listing Price
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            €{averagePrice.toLocaleString()}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Monthly Interest (dummy data)
      </Typography>

      <Stack spacing={1}>
        {dummyMonthlyLeads.map((leads, index) => (
          <Box
            key={monthLabels[index]}
            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            <Typography
              sx={{ width: 40 }}
              variant="body2"
              color="text.secondary"
            >
              {monthLabels[index]}
            </Typography>
            <Box
              sx={{
                flex: 1,
                height: 12,
                bgcolor: theme.palette.divider,
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${Math.round((leads / maxLeadValue) * 100)}%`,
                  bgcolor: 'primary.main',
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ width: 40, textAlign: 'right' }}>
              {leads}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}
