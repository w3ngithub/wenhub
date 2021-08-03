import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialProjectLogState = {
  loading: false,
  error: null,
  logsOfUser: [],
}

export const logTimeSlice = createSlice({
  name: 'logTime',
  initialState: initialProjectLogState,
  reducers: {
    startLogTimeCall: (state) => {
      state.loading = true
    },
    LogTimeFetchError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logsOfUserFetched: (state, action) => {
      state.loading = false
      state.logsOfUser = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.logTime,
    }),
  },
})
