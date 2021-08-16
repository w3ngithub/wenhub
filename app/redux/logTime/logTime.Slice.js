import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialProjectLogState = {
  loading: false,
  error: null,
  logsOfUser: [],
  userTimeSpentThisWeek: '',
  userTimeSpentToday: '',
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
    fetchWeeklyTimeSpentOfUser: (state, action) => {
      state.loading = false
      state.userTimeSpentThisWeek = action.payload
    },
    fetchUserTimeSpentToday: (state, action) => {
      state.loading = false
      state.userTimeSpentToday = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.logTime,
    }),
  },
})
