import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import MainCard from '../../utils/general/MainCard'
import { loginUser } from '../../store/slices/data_auth'
import { openSnackbar } from '../../store/slices/data_snackbar'

const MOCK_USERS = [
  { email: 'admin@realestate.gr', password: 'admin123', username: 'admin', role: 'Admin' },
  { email: 'owner@realestate.gr', password: 'owner123', username: 'john_owner', role: 'Owner' },
  { email: 'agency@realestate.gr', password: 'agency123', username: 'maria_agency', role: 'Agency' },
  { email: 'customer@realestate.gr', password: 'customer123', username: 'nikos_customer', role: 'Customer' },
]

export default function Login() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const setField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format.'
    if (!form.password) errs.password = 'Please enter your password.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const match = MOCK_USERS.find(
      (u) => u.email === form.email && u.password === form.password
    )

    if (!match) {
      setErrors({ password: 'Invalid email or password.' })
      return
    }

    dispatch(loginUser({ username: match.username, email: match.email, role: match.role }))
    dispatch(openSnackbar({ message: `Welcome back, ${match.username}!`, type: 'success' }))
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
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 460 }}>
        {/* Logo / Title */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={700} color="primary">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Sign in to your Real Estate account
          </Typography>
        </Box>

        <MainCard>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2.5}>
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
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={setField('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  autoComplete="current-password"
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

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ py: 1.4, fontWeight: 700 }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ my: 2.5 }}>
            <Typography variant="caption" color="text.secondary">
              Don't have an account?
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/signup"
            sx={{ py: 1.2 }}
          >
            Create Account
          </Button>
        </MainCard>

        {/* Demo credentials hint */}
        <Box
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: 2,
            bgcolor: theme.palette.action.hover,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" color="text.secondary" display="block" fontWeight={600} sx={{ mb: 0.5 }}>
            Demo Credentials
          </Typography>
          {MOCK_USERS.map((u) => (
            <Typography key={u.role} variant="caption" color="text.secondary" display="block">
              <strong>{u.role}:</strong> {u.email} / {u.password}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
