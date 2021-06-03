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
      state.userInfo = payload
      state.user = payload.username
    },

    loginSuccess: (state, { payload }: PayloadAction<any>) => {
      state.user = payload
      state.loggedIn = true
      state.userInfo = {}
    },

    loginFailure: (state) => {
        state.loggedIn = false
        state.user = {}
        state.userInfo = {}
    },

    authenticateRequest: (state, { payload }: PayloadAction<any>) => {
      state.userInfo = payload
    },

    authenticateSuccess: (state,  { payload }: PayloadAction<any>) => {
        state.user = payload
        state.authenticatedIn = true
        state.loggedIn = true
        state.userInfo = {}
    },

    authenticateFailure: (state) => {
        state.authenticatedIn = false
        state.loggedIn = false
    },

    logout: (state) => {
        state.authenticatedIn = false
        state.loggedIn = false
        state.user = {}
        state.userInfo = {}
    },

    changeName: (state, { payload }: PayloadAction<any>) => {
      state.user = payload
      state.loggedIn = true
    }
  },
})

export const { loginRequest, loginSuccess, loginFailure, logout, authenticateRequest, authenticateSuccess, authenticateFailure, changeName} = authSlice.actions

export default authSlice.reducer
