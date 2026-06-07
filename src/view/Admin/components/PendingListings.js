import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import {
  approveListing,
  rejectListing,
  selectPendingListings,
} from '../../../store/slices/data_listings'

export default function PendingListings() {
  const dispatch = useDispatch()
  const pendingListings = useSelector(selectPendingListings)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Pending Property Ads
      </Typography>

      {pendingListings.length === 0 ? (
        <Typography color="text.secondary">
          No pending property ads found.
        </Typography>
      ) : (
        pendingListings.map((listing) => (
          <Card key={listing.listingId} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                {listing.property?.title || 'Untitled Listing'}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Price: €{listing.property?.price?.toLocaleString()}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Owner Type: {listing.owner?.role}
              </Typography>

              <Typography variant="body2" color="warning.main">
                Status: {listing.status}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                onClick={() => dispatch(approveListing(listing.listingId))}
              >
                Approve
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(rejectListing(listing.listingId))}
              >
                Reject
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  )
}