import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  blogs: [],
  blogDetail: {},
  loading: false,
  totalData: 10,
  error: '',
}

export const blogSlice = createSlice({
  name: 'blogData',
  initialState,
  reducers: {
    blogsFetching: (state) => {
      state.loading = true
    },
    blogsFetchSuccess: (state, { payload }) => {
      state.loading = false
      state.blogs = payload.data
      state.totalData = payload.totalData
    },
    blogsFetchError: (state, { payload }) => {
      state.loading = false
      state.error = payload.error
    },

    blogDetailFetching: (state) => {
      state.loading = true
    },
    blogDetailFetchSuccess: (state, { payload }) => {
      state.loading = true
      state.blogDetail = payload.data
    },
    blogDetailFetchError: (state, { payload }) => {
      state.loading = false
      state.error = payload.error
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.blogData,
    }),
  },
})
