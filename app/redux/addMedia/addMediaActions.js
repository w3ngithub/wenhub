import { addMediaSlice } from './addMediaSlice'
import * as requestFromServer from './addMediaCrud'

const {
  addFiles,
  removeFile,
  emptyFiles,
  getRemoteMediaFiles,
  gettingRemoteMediaFiles,
  remoteMediaFilesError,
  addremoteSelectedFile,
  addselectedFilesFromMedia,
  DeleteRemoteMediaFile,
  removeRemoteSelectedFiles,
  resetselectedFilesFromMedia,
} = addMediaSlice.actions

export const addMediaFiles = (files) => (dispatch) => dispatch(addFiles(files))

export const removeMediaFile = (file) => (dispatch) =>
  dispatch(removeFile(file))

export const emptyMediaFiles = () => (dispatch) => dispatch(emptyFiles())

export const getAllMediaFiles = () => (dispatch) => {
  dispatch(gettingRemoteMediaFiles())
  requestFromServer
    .fetchMediaFiles()
    .then((res) => dispatch(getRemoteMediaFiles(res.data)))
    .catch(() => dispatch(remoteMediaFilesError()))
}

export const remoteMediaFilesSelected = (files) => (dispatch) =>
  dispatch(addremoteSelectedFile(files))

export const addingselectedFilesFromMedia = (payload) => (dispatch) => {
  dispatch(addselectedFilesFromMedia(payload))
}

export const deleteMediaFiles = (payload) => (dispatch) => {
  dispatch(DeleteRemoteMediaFile(payload))
}

export const clearRemoteSelectedFiles = () => (dispatch) => {
  dispatch(removeRemoteSelectedFiles())
}

export const resetSelectedFilesFromMedia = () => (dispatch) => {
  dispatch(resetselectedFilesFromMedia())
}
