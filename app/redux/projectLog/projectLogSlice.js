import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialProjectLogState = {
  loading: false,
  error: '',
  projectLogs: [],
  logTypes: [],
}

export const projectLogSlice = createSlice({
  name: 'projectLog',
  initialState: initialProjectLogState,
  reducers: {
    startProjectLogCall: (state) => {
      state.loading = true
    },
    projectLogFetchError: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    projectLogFetched: (state, { payload }) => {
      const [projectLogs, logTypes] = payload.data
      state.loading = false
      state.projectLogs = projectLogs
      state.logTypes = logTypes
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.projectLog,
    }),
  },
})
