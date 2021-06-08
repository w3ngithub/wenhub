import * as requestFromServer from './testCrud'
import { testsSlice, callTypes } from './testSlice'

const { actions } = testsSlice

export const fetchTests = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .findTests(queryParams)
    .then((response) => {
      const { totalCount, entities } = response.data
      dispatch(actions.testsFetched({ totalCount, entities }))
    })
    .catch((err) => {
      const error = err
      error.clientMessage = "Can't find tests"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const fetchTest = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.testFetched({ testForEdit: undefined }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getTestById(id)
    .then((response) => {
      const test = response.data
      dispatch(actions.testFetched({ testForEdit: test }))
    })
    .catch((err) => {
      const error = err
      error.clientMessage = "Can't find test"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const deleteTest = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .deleteTest(id)
    .then(() => {
      dispatch(actions.testDeleted({ id }))
    })
    .catch((err) => {
      const error = err
      error.clientMessage = "Can't delete test"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const createTest = (testForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .createTest(testForCreation)
    .then((response) => {
      const { test } = response.data
      dispatch(actions.testCreated({ test }))
    })
    .catch((err) => {
      const error = err
      error.clientMessage = "Can't create test"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const updateTest = (test) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateTest(test)
    .then(() => {
      dispatch(actions.testUpdated({ test }))
    })
    .catch((err) => {
      const error = err
      error.clientMessage = "Can't update test"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const updateTestsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateStatusForTests(ids, status)
    .then(() => {
      dispatch(actions.testsStatusUpdated({ ids, status }))
    })
    .catch((err) => {
      const error = err
      error.clientMessage = "Can't update tests status"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const deleteTests = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .deleteTests(ids)
    .then(() => {
      dispatch(actions.testsDeleted({ ids }))
    })
    .catch((err) => {
      const error = err
      error.clientMessage = "Can't delete tests"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
