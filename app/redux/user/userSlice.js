import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  userDetail: {},
  userLoading: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    loginStart: (state) => {
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
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.userData,
    }),
  },
})
