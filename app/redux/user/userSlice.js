import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  userDetail: {},
  userLoading: false,
  users: [],
  error: '',
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserLoading: (state) => {
      state.userLoading = true
    },
    loginSuccess: (state, { payload }) => {
      state.userLoading = false
      state.userDetail = payload.data
    },
    loginFailure: (state, { payload }) => {
      state.userLoading = false
      state.error = payload.data
    },
    setUserDetail: (state, { payload }) => {
      state.userDetail = payload.data
    },
    tokenCheckStart: (state) => {
      state.userLoading = true
    },
    tokenCheckFinish: (state) => {
      state.userLoading = false
    },
    fetchUsersSuccess: (state, { payload }) => {
      state.userLoading = false
      state.users = payload.data
    },
    fetchUsersFailure: (state, { payload }) => {
      state.userLoading = false
      state.error = payload.error
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.userData,
    }),
  },
})
