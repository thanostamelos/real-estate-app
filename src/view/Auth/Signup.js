import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import MainCard from '../../utils/general/MainCard'
import { loginUser } from '../../store/slices/data_auth'
import { openSnackbar } from '../../store/slices/data_snackbar'

const ROLES = [
  { value: 'Customer', label: 'Customer — Looking for a property' },
  { value: 'Owner', label: 'Owner — I own properties' },
  { value: 'Agency', label: 'Agency — Real Estate Agency' },
]

export default function Signup() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    role: 'Customer',
    agencyName: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const setField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.username.trim()) errs.username = 'Please enter a username.'
    else if (form.username.length < 3) errs.username = 'Username must be at least 3 characters.'

    if (!form.email.trim()) errs.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format.'

    if (!form.phone.trim()) errs.phone = 'Please enter your phone number.'

    if (form.role === 'Agency' && !form.agencyName.trim())
      errs.agencyName = 'Please enter your agency name.'

    if (!form.password) errs.password = 'Please enter a password.'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'

    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password.'
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.'

    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    dispatch(loginUser({ username: form.username, email: form.email, role: form.role }))
    dispatch(openSnackbar({ message: `Account created! Welcome, ${form.username}!`, type: 'success' }))
    navigate('/')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        py: 4,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 520 }}>
        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Join our Real Estate platform
          </Typography>
        </Box>

        <MainCard>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2.5}>
              {/* Role selector */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="I am a..."
                  value={form.role}
                  onChange={setField('role')}
                >
                  {ROLES.map((r) => (
                    <MenuItem key={r.value} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Agency name — shown only for Agency role */}
              {form.role === 'Agency' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Agency Name"
                    value={form.agencyName}
                    onChange={setField('agencyName')}
                    error={!!errors.agencyName}
                    helperText={errors.agencyName}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={form.username}
                  onChange={setField('username')}
                  error={!!errors.username}
                  helperText={errors.username}
                  autoComplete="username"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={form.phone}
                  onChange={setField('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  placeholder="69xxxxxxxx"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={setField('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={setField('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((s) => !s)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={setField('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ py: 1.4, fontWeight: 700 }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ my: 2.5 }}>
            <Typography variant="caption" color="text.secondary">
              Already have an account?
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/login"
            sx={{ py: 1.2 }}
          >
            Sign In
          </Button>
        </MainCard>
      </Box>
    </Box>
  )
}
