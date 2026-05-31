import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Chip,
  Divider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import {
  selectListings,
  deleteListing,
  updateListing,
} from '../../../store/slices/data_listings'

const PROPERTY_TYPES = ['Apartment', 'House', 'Studio', 'Loft', 'Penthouse']
const STATUS_OPTIONS = [
  { value: 'rent', label: 'For Rent' },
  { value: 'sale', label: 'For Sale' },
]

const EMPTY_FORM = {
  title: '',
  type: 'Apartment',
  status: 'rent',
  price: '',
  location: '',
  address: '',
  area: '',
  rooms: '',
  description: '',
  ownerName: '',
  ownerEmail: '',
  ownerPhone: '',
  ownerRole: 'Owner',
}

const ListingAdminSection = ({ role, title, subtitle }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const listings = useSelector(selectListings)
  const filteredListings = useMemo(
    () => listings.filter((listing) => listing.owner?.role === role),
    [listings, role],
  )
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState('')
  const [imageObjectUrl, setImageObjectUrl] = useState(null)
  const [imageError, setImageError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (imageObjectUrl) {
        URL.revokeObjectURL(imageObjectUrl)
      }
    }
  }, [imageObjectUrl])

  const openEditor = (listing) => {
    setEditing(listing)
    setForm({
      title: listing.property.title || '',
      type: listing.property.type || 'Apartment',
      status: listing.property.status || 'rent',
      price: listing.property.price || '',
      location: listing.property.location || '',
      address: listing.property.address || '',
      area: listing.property.area || '',
      rooms: listing.property.rooms || '',
      description: listing.property.description || '',
      ownerName: listing.owner.username || '',
      ownerEmail: listing.owner.email || '',
      ownerPhone: listing.owner.phone || '',
      ownerRole: listing.owner.role || role,
    })
    setImagePreview(listing.property.images?.[0] || '')
    setImageError('')
    setErrors({})
  }

  const closeEditor = () => {
    if (imageObjectUrl) {
      URL.revokeObjectURL(imageObjectUrl)
    }
    setEditing(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setImagePreview('')
    setImageObjectUrl(null)
    setImageError('')
  }

  const setField = (field) => (event) => {
    const value = event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImagePick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setImageError('Please choose a valid image file.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image must be smaller than 5MB.')
      return
    }

    setImageError('')
    if (imageObjectUrl) {
      URL.revokeObjectURL(imageObjectUrl)
    }

    const objectUrl = URL.createObjectURL(file)
    setImagePreview(objectUrl)
    setImageObjectUrl(objectUrl)
  }

  const handleRemoveImage = () => {
    if (imageObjectUrl) {
      URL.revokeObjectURL(imageObjectUrl)
    }
    setImagePreview('')
    setImageObjectUrl(null)
    setImageError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Please enter a title.'
    if (!form.location.trim()) nextErrors.location = 'Please enter a location.'
    if (!form.price || Number.isNaN(Number(form.price)))
      nextErrors.price = 'Please enter a valid price.'
    if (!form.area || Number.isNaN(Number(form.area)))
      nextErrors.area = 'Please enter a valid area.'
    if (!form.rooms || Number.isNaN(Number(form.rooms)))
      nextErrors.rooms = 'Please enter a valid room count.'
    if (!form.ownerName.trim())
      nextErrors.ownerName = 'Please enter owner name.'
    if (!form.ownerEmail.trim())
      nextErrors.ownerEmail = 'Please enter owner email.'
    if (!form.ownerPhone.trim())
      nextErrors.ownerPhone = 'Please enter owner phone.'
    return nextErrors
  }

  const handleSave = () => {
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    dispatch(
      updateListing({
        listingId: editing.listingId,
        updates: {
          property: {
            title: form.title,
            type: form.type,
            status: form.status,
            price: Number(form.price),
            location: form.location,
            address: form.address,
            area: Number(form.area),
            rooms: Number(form.rooms),
            description: form.description,
            images: imagePreview ? [imagePreview] : [],
          },
          owner: {
            username: form.ownerName,
            email: form.ownerEmail,
            phone: form.ownerPhone,
            role: form.ownerRole,
          },
        },
      }),
    )
    closeEditor()
  }

  const handleDelete = (listingId) => {
    if (!window.confirm('Delete this listing? This action cannot be undone.')) {
      return
    }
    dispatch(deleteListing(listingId))
  }

  const handleCreateNew = () => {
    navigate('/new-listing')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateNew}
            >
              Add Property
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {filteredListings.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No properties found for the {role.toLowerCase()} role.
            </Typography>
            <Typography color="text.secondary">
              Create a new listing or switch to another dashboard to manage more
              properties.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredListings.map((listing) => {
              const property = listing.property || {}
              const owner = listing.owner || {}
              const image = property.images?.[0] || '/apartments/apart1.jpg'

              return (
                <Grid item xs={12} md={6} key={listing.listingId}>
                  <Card
                    elevation={1}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={image}
                      alt={property.title}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" fontWeight={700}>
                          {property.title}
                        </Typography>
                        <Chip
                          label={property.status === 'rent' ? 'Rent' : 'Sale'}
                          color="primary"
                          size="small"
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                        noWrap
                      >
                        {property.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Price:</strong> €
                        {property.price.toLocaleString()}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Location:</strong> {property.location}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Area:</strong> {property.area} m² •{' '}
                        {property.rooms} room{property.rooms !== 1 ? 's' : ''}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Owner:</strong> {owner.username} ({owner.role})
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}
                    >
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => openEditor(listing)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(listing.listingId)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        )}
      </Box>

      <Dialog
        open={Boolean(editing)}
        onClose={closeEditor}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Edit Listing
          <IconButton size="small" onClick={closeEditor}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                value={form.title}
                onChange={setField('title')}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={form.location}
                onChange={setField('location')}
                error={!!errors.location}
                helperText={errors.location}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price (€)"
                type="number"
                value={form.price}
                onChange={setField('price')}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                value={form.address}
                onChange={setField('address')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Area (m²)"
                type="number"
                value={form.area}
                onChange={setField('area')}
                error={!!errors.area}
                helperText={errors.area}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Rooms"
                type="number"
                value={form.rooms}
                onChange={setField('rooms')}
                error={!!errors.rooms}
                helperText={errors.rooms}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Type"
                value={form.type}
                onChange={setField('type')}
              >
                {PROPERTY_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={form.status}
                onChange={setField('status')}
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner name"
                value={form.ownerName}
                onChange={setField('ownerName')}
                error={!!errors.ownerName}
                helperText={errors.ownerName}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}
                >
                  Property image
                </Typography>
                <Button variant="outlined" onClick={handleImagePick}>
                  {imagePreview ? 'Change image' : 'Upload image'}
                </Button>
                {imagePreview ? (
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Listing preview"
                      sx={{
                        width: '100%',
                        maxHeight: 320,
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <Button
                      size="small"
                      color="error"
                      onClick={handleRemoveImage}
                      sx={{ mt: 1 }}
                    >
                      Remove image
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Upload or change the listing image for the owner/agency
                    listing.
                  </Typography>
                )}
                {imageError && (
                  <Typography variant="caption" color="error.main">
                    {imageError}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner email"
                value={form.ownerEmail}
                onChange={setField('ownerEmail')}
                error={!!errors.ownerEmail}
                helperText={errors.ownerEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner phone"
                value={form.ownerPhone}
                onChange={setField('ownerPhone')}
                error={!!errors.ownerPhone}
                helperText={errors.ownerPhone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={form.description}
                onChange={setField('description')}
              />
            </Grid>
          </Grid>

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}
          >
            <Button variant="outlined" onClick={closeEditor}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save changes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ListingAdminSection
