import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  files: [],
  remoteMedialFiles: [],
  remoteSelectedFiles: [],
  loading: false,
  selectedFilesFromMedia: [],
  error: '',
}

export const addMediaSlice = createSlice({
  name: 'addMedia',
  initialState,
  reducers: {
    addFiles: (state, action) => {
      state.files = action.payload
    },
    removeFile: (state, action) => {
      state.files = state.files.filter(
        (file) => file.name !== action.payload.name,
      )
    },
    emptyFiles: (state) => {
      state.files = []
      state.remoteSelectedFiles = []
    },
    gettingRemoteMediaFiles: (state) => {
      state.loading = true
    },
    getRemoteMediaFiles: (state, action) => {
      state.loading = false
      state.error = ''
      state.remoteMedialFiles = action.payload
    },
    remoteMediaFilesError: (state) => {
      state.loading = false
      state.error = 'Could not fetch Media Files'
    },
    addremoteSelectedFile: (state, action) => {
      state.loading = false
      state.remoteSelectedFiles = action.payload
    },
    addselectedFilesFromMedia: (state, { payload }) => {
      state.selectedFilesFromMedia = [...state.selectedFilesFromMedia, payload]
    },
  },
})
