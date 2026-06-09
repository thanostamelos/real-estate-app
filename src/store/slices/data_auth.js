import { createSlice } from '@reduxjs/toolkit'

const data_auth = createSlice({
  name: 'data_auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loginUser(state, action) {
      state.isAuthenticated = true
      state.user = action.payload
    },
    logoutUser(state) {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export default data_auth.reducer
export const { loginUser, logoutUser } = data_auth.actions
export const selectIsAuthenticated = (state) => state.data_auth.isAuthenticated
export const selectCurrentUser = (state) => state.data_auth.user
