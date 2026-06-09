import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PersonOffIcon from '@mui/icons-material/PersonOff'
import PersonIcon from '@mui/icons-material/Person'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { activateUser, deactivateUser, updateUser, selectUsers } from '../../../store/slices/data_users'

const ROLES = ['Owner', 'Agency', 'Customer', 'Admin']

const ROLE_COLOR = {
  Admin: 'error',
  Agency: 'primary',
  Owner: 'success',
  Customer: 'default',
}

export default function UsersAdminSection() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  const [filterRole, setFilterRole] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({})

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const roleMatch = filterRole === 'All' || u.role === filterRole
      const statusMatch = filterStatus === 'All' || u.status === filterStatus
      return roleMatch && statusMatch
    })
  }, [users, filterRole, filterStatus])

  const openEdit = (user) => {
    setEditingUser(user)
    setEditForm({ username: user.username, email: user.email, phone: user.phone, role: user.role })
  }

  const closeEdit = () => {
    setEditingUser(null)
    setEditForm({})
  }

  const handleSaveEdit = () => {
    dispatch(updateUser({ userId: editingUser.userId, updates: editForm }))
    closeEdit()
  }

  const totalActive = users.filter((u) => u.status === 'active').length
  const totalInactive = users.filter((u) => u.status === 'inactive').length

  return (
    <Box>
      {/* Summary stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700}>{users.length}</Typography>
            <Typography variant="body2" color="text.secondary">Total Users</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="success.main">{totalActive}</Typography>
            <Typography variant="body2" color="text.secondary">Active</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="error.main">{totalInactive}</Typography>
            <Typography variant="body2" color="text.secondary">Inactive</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Filter by Role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="All">All Roles</MenuItem>
          {ROLES.map((r) => (
            <MenuItem key={r} value={r}>{r}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {filteredUsers.length === 0 ? (
        <Typography color="text.secondary">No users match the selected filters.</Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.action.hover }}>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.userId} hover>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small" color={ROLE_COLOR[user.role] ?? 'default'} />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      color={user.status === 'active' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit user">
                      <IconButton size="small" onClick={() => openEdit(user)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {user.status === 'active' ? (
                      <Tooltip title="Deactivate account">
                        <IconButton size="small" color="error" onClick={() => dispatch(deactivateUser(user.userId))}>
                          <PersonOffIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Activate account">
                        <IconButton size="small" color="success" onClick={() => dispatch(activateUser(user.userId))}>
                          <PersonIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit User Dialog */}
      <Dialog open={Boolean(editingUser)} onClose={closeEdit} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Edit User
          <IconButton size="small" onClick={closeEdit}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                value={editForm.username ?? ''}
                onChange={(e) => setEditForm((f) => ({ ...f, username: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={editForm.email ?? ''}
                onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={editForm.phone ?? ''}
                onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Role"
                value={editForm.role ?? ''}
                onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
              >
                {ROLES.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
