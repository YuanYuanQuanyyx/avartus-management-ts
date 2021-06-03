import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState } from '../store/state/users'

export const initState: AuthState = {
    loggedIn: false,
    authenticatedIn: false,
    user: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {

    loginRequest: (state, { payload }: PayloadAction<any>) => {
      state.user = payload
    },

    loginSuccess: (state, { payload }: PayloadAction<any>) => {
      state.user = payload
      state.loggedIn = true
    },

    loginFailure: (state) => {
        state.loggedIn = false
        state.user = {}
    },

    authenticateSuccess: (state,  { payload }: PayloadAction<any>) => {
        state.user = payload
        state.authenticatedIn = true
        state.loggedIn = true
    },

    authenticateFailure: (state) => {
        state.authenticatedIn = false
        state.loggedIn = false
        state.user = {}
    },

    logout: (state) => {
        state.authenticatedIn = false
        state.loggedIn = false
        state.user = {}
    },

    changeName: (state, { payload }: PayloadAction<any>) => {
      state.user = payload
      state.loggedIn = true
    }
  },
})

export const { loginRequest, loginSuccess, loginFailure, logout, authenticateSuccess, authenticateFailure, changeName} = authSlice.actions

export default authSlice.reducer
