import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { addListing } from '../../store/slices/data_listings'
import { useNavigate } from 'react-router-dom'
import AddHomeIcon from '@mui/icons-material/AddHome'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const PROPERTY_TYPES = ['Apartment', 'House', 'Studio', 'Loft', 'Penthouse']

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
  ownerPhone: '',
  ownerEmail: '',
  ownerRole: 'Owner',
}

export default function NewListing() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [imageError, setImageError] = useState('')
  const fileInputRef = useRef(null)

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

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
    setImageFile(file)
    const objectUrl = URL.createObjectURL(file)
    setImagePreview(objectUrl)
  }

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setImageFile(null)
    setImagePreview('')
    setImageError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Required'
    if (!form.price || isNaN(Number(form.price)))
      e.price = 'Valid number required'
    if (!form.location.trim()) e.location = 'Required'
    if (!form.area || isNaN(Number(form.area))) e.area = 'Valid number required'
    if (!form.rooms || isNaN(Number(form.rooms)))
      e.rooms = 'Valid number required'
    if (!form.ownerName.trim()) e.ownerName = 'Required'
    if (!form.ownerPhone.trim()) e.ownerPhone = 'Required'
    if (!form.ownerEmail.trim()) e.ownerEmail = 'Required'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }

    dispatch(
      addListing({
        property: {
          title: form.title,
          description: form.description,
          price: Number(form.price),
          address: form.address,
          type: form.type,
          location: form.location,
          status: form.status,
          area: Number(form.area),
          rooms: Number(form.rooms),
          images: imagePreview ? [imagePreview] : ['/apartments/apart1.jpg'],
        },
        owner: {
          username: form.ownerName,
          phone: form.ownerPhone,
          email: form.ownerEmail,
          role: form.ownerRole,
        },
      }),
    )

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 72, color: 'success.main', mb: 2 }}
          />
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            Listing Published!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your listing has been added. It will disappear after a page refresh.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ mr: 1 }}
          >
            View Listings
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setForm(EMPTY_FORM)
              setSubmitted(false)
            }}
          >
            Add Another
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        py: 5,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 720,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <AddHomeIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700}>
            New Property Listing
          </Typography>
        </Box>

        {/* Property details */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1.5, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Property Details
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Title"
            fullWidth
            required
            value={form.title}
            onChange={set('title')}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ gridColumn: '1 / -1' }}
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={form.type} label="Type" onChange={set('type')}>
              {PROPERTY_TYPES.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={form.status} label="Status" onChange={set('status')}>
              <MenuItem value="rent">For Rent</MenuItem>
              <MenuItem value="sale">For Sale</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label={
              form.status === 'rent' ? 'Monthly Rent (€)' : 'Sale Price (€)'
            }
            fullWidth
            required
            type="number"
            value={form.price}
            onChange={set('price')}
            error={!!errors.price}
            helperText={errors.price}
          />

          <TextField
            label="Location (e.g. Kolonaki, Athens)"
            fullWidth
            required
            value={form.location}
            onChange={set('location')}
            error={!!errors.location}
            helperText={errors.location}
          />

          <TextField
            label="Address"
            fullWidth
            value={form.address}
            onChange={set('address')}
            sx={{ gridColumn: '1 / -1' }}
          />

          <TextField
            label="Area (m²)"
            fullWidth
            required
            type="number"
            value={form.area}
            onChange={set('area')}
            error={!!errors.area}
            helperText={errors.area}
          />

          <TextField
            label="Rooms"
            fullWidth
            required
            type="number"
            value={form.rooms}
            onChange={set('rooms')}
            error={!!errors.rooms}
            helperText={errors.rooms}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={set('description')}
            sx={{ gridColumn: '1 / -1' }}
          />

          <Box sx={{ gridColumn: '1 / -1' }}>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}
              >
                Property Image
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" onClick={handleImagePick}>
                  {imagePreview ? 'Change Image' : 'Upload Image'}
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
                      alt="Property preview"
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
                      Remove Image
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Upload a property photo to show in the listing preview.
                  </Typography>
                )}
                {imageError && (
                  <Typography variant="caption" color="error.main">
                    {imageError}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Owner details */}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ mb: 1.5, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Owner / Contact Details
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Full Name"
            fullWidth
            required
            value={form.ownerName}
            onChange={set('ownerName')}
            error={!!errors.ownerName}
            helperText={errors.ownerName}
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={form.ownerRole}
              label="Role"
              onChange={set('ownerRole')}
            >
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Agency">Agency</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Phone"
            fullWidth
            required
            value={form.ownerPhone}
            onChange={set('ownerPhone')}
            error={!!errors.ownerPhone}
            helperText={errors.ownerPhone}
          />

          <TextField
            label="Email"
            fullWidth
            required
            value={form.ownerEmail}
            onChange={set('ownerEmail')}
            error={!!errors.ownerEmail}
            helperText={errors.ownerEmail}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ flex: 1 }}
          >
            Publish Listing
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
