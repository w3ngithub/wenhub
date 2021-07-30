import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  filterType: {
    projectTypes: [],
    projectStatus: [],
    clients: [],
    developers: [],
    designers: [],
    projectTags: [],
  },
  categories: [],
  commonLoading: false,
  error: '',
  category: {},
}

export const commonSlice = createSlice({
  name: 'commonData',
  initialState,
  reducers: {
    filterOptionsFetching: (state) => {
      state.commonLoading = true
    },
    filterOptionsFetchingSuccess: (state, { payload }) => {
      state.commonLoading = false
      state.filterType = {
        projectTypes: payload.data[0],
        projectStatus: payload.data[1],
        clients: payload.data[2],
        developers: payload.data[3],
        designers: payload.data[4],
        projectTags: payload.data[5],
      }
    },
    filterOptionsFetchingError: (state, { payload }) => {
      state.commonLoading = false
      state.error = payload.error
    },
    categoriesFetching: (state) => {
      state.commonLoading = true
    },
    categoriesFetchingSuccess: (state, { payload }) => {
      state.commonLoading = false
      state.categories = payload.data
    },
    categoriesFetchingError: (state, { payload }) => {
      state.commonLoading = false
      state.error = payload.error
    },
    categoryFetching: (state) => {
      state.commonLoading = true
    },
    categoryFetchingSuccess: (state, { payload }) => {
      state.commonLoading = false
      state.category = payload.data
    },
    categoryFetchError: (state, { payload }) => {
      state.commonLoading = false
      state.error = payload.error
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.commonData,
    }),
  },
})
