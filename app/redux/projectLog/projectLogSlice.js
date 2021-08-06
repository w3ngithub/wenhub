import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialProjectLogState = {
  loading: false,
  error: null,
  projectDetailForTimeLog: {},
  projectLogs: [],
  logTypes: [],
  projectsOfUser: [],
  totalLogsOfProject: 0,
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
      state.error = action.payload
    },
    projectLogFetched: (state, { payload }) => {
      const [projectLogs, logTypes] = payload.data
      state.loading = false
      state.projectLogs = projectLogs
      state.logTypes = logTypes
      state.totalLogsOfProject = payload.total
    },
    projectsOfUserFetched: (state, { payload }) => {
      state.loading = false
      state.projectsOfUser = payload
    },
    logTypesFetched: (state, { payload }) => {
      state.loading = false
      state.logTypes = payload
    },
    projectDetailForTimeLogFetched: (state, { payload }) => {
      state.loading = false
      state.projectDetailForTimeLog = payload
    },
    filteredProjectLogFetched: (state, { payload }) => {
      state.loading = false
      state.projectLogs = payload.data
      state.totalLogsOfProject = payload.total
    },
    LogTypeFilteredProjectLogFetched: (state, { payload }) => {
      state.loading = false
      state.projectLogs = payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.projectLog,
    }),
  },
})
