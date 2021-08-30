import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  weeklyReports: [],
  loading: false,
  error: '',
}

export const weeklyReportSlice = createSlice({
  name: 'weeklyReport',
  initialState,
  reducers: {
    reportLoading: (state) => {
      state.loading = true
    },
    weeklyReportFetch: (state, { payload }) => {
      state.loading = false
      state.weeklyReports = payload
    },
    errorReportFetching: (state) => {
      state.loading = false
      state.error = 'Could not fetch reports'
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.weeklyReport,
    }),
  },
})
