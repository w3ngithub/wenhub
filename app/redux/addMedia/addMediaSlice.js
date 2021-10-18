import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  files: [],
  remoteMedialFiles: [],
  remoteSelectedFiles: [],
  loading: false,
  selectedFilesFromMedia: [],
  remoteSelectedFilesfromMedia: [],
  activeMediaTab: '2',
  error: '',
  selectedfilesfromUplaod: [],
  quillRefSource: '',
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
      state.remoteSelectedFilesfromMedia = [
        ...state.remoteSelectedFilesfromMedia,
        payload,
      ]
    },
    DeleteRemoteMediaFile: (state, { payload }) => {
      state.remoteMedialFiles = state.remoteMedialFiles.filter(
        (file) => !payload.includes(file.id),
      )
      state.remoteSelectedFiles = state.remoteSelectedFiles.filter(
        (file) => !payload.includes(file.id),
      )
    },
    removeRemoteSelectedFiles: (state) => {
      state.remoteSelectedFiles = []
    },
    resetselectedFilesFromMedia: (state) => {
      state.remoteSelectedFilesfromMedia = []
    },
    activeMediaTabFetch: (state, { payload }) => {
      state.activeMediaTab = payload
    },
    selectedfilesfromUplaodFetch: (state, { payload }) => {
      state.selectedfilesfromUplaod = [
        ...state.selectedfilesfromUplaod,
        payload,
      ]
    },
    resetselectedfilesfromUplaodFetch: (state) => {
      state.selectedfilesfromUplaod = []
    },
    setQuillRef: (state, { payload }) => {
      state.quillRefSource = payload
    },
    resetQuillRef: (state) => {
      state.quillRefSource = ''
    },
  },
})
