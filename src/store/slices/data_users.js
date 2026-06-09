import { createSlice } from '@reduxjs/toolkit'

const MOCK_USERS = [
  { userId: 1, username: 'john_owner', email: 'john@example.com', phone: '6912345678', role: 'Owner', status: 'active' },
  { userId: 2, username: 'maria_agency', email: 'maria@homefinder.gr', phone: '6923456789', role: 'Agency', status: 'active' },
  { userId: 3, username: 'nikos_customer', email: 'nikos@gmail.com', phone: '6934567890', role: 'Customer', status: 'active' },
  { userId: 4, username: 'elena_owner', email: 'elena@example.com', phone: '6945678901', role: 'Owner', status: 'inactive' },
  { userId: 5, username: 'kostas_agency', email: 'kostas@realty.gr', phone: '6956789012', role: 'Agency', status: 'active' },
  { userId: 6, username: 'sofia_customer', email: 'sofia@gmail.com', phone: '6967890123', role: 'Customer', status: 'active' },
  { userId: 7, username: 'giorgos_owner', email: 'giorgos@example.com', phone: '6978901234', role: 'Owner', status: 'active' },
  { userId: 8, username: 'anna_customer', email: 'anna@hotmail.com', phone: '6989012345', role: 'Customer', status: 'inactive' },
  { userId: 9, username: 'admin', email: 'admin@realestate.gr', phone: '6900000000', role: 'Admin', status: 'active' },
]

let nextUserId = MOCK_USERS.length + 1

const data_users = createSlice({
  name: 'data_users',
  initialState: {
    users: MOCK_USERS,
  },
  reducers: {
    activateUser(state, action) {
      const user = state.users.find((u) => u.userId === action.payload)
      if (user) user.status = 'active'
    },
    deactivateUser(state, action) {
      const user = state.users.find((u) => u.userId === action.payload)
      if (user) user.status = 'inactive'
    },
    updateUser(state, action) {
      const { userId, updates } = action.payload
      const user = state.users.find((u) => u.userId === userId)
      if (user) Object.assign(user, updates)
    },
    addUser(state, action) {
      state.users.push({ userId: nextUserId++, status: 'active', ...action.payload })
    },
  },
})

export default data_users.reducer
export const { activateUser, deactivateUser, updateUser, addUser } = data_users.actions
export const selectUsers = (state) => state.data_users.users
