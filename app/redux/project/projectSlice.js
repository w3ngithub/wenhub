import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  projects: [],
  loading: false,
  error: '',
  totalData: 0,
}

export const projectSlice = createSlice({
  name: 'projectData',
  initialState,

  reducers: {
    projectFetching: (state) => {
      state.loading = true
    },

    projectFetchSuccess: (state, { payload }) => {
      state.loading = false
      state.projects = payload.data
      state.totalData = payload.totalData
    },

    projectFetchError: (state, { payload }) => {
      state.loading = false
      state.error = payload.error
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.projectData,
    }),
  },
})
