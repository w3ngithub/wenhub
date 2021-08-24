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
  leaveFields: {
    leave_status: [],
    leave_type: [],
  },
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
    developerDesignerFetchSucess: (state, { payload }) => {
      state.commonLoading = false
      state.filterType = {
        ...state.filterType,
        developers: payload.data[0],
        designers: payload.data[1],
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
    leaveFieldsFetching: (state) => {
      state.commonLoading = true
    },
    leaveFieldsSuccess: (state, { payload }) => {
      state.commonLoading = false
      state.leaveFields = {
        leave_status: payload.data[1],
        leave_type: payload.data[0],
      }
    },
    leaveFieldsFailure: (state, { payload }) => {
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
