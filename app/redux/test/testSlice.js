import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialTestsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  testForEdit: undefined,
  lastError: null,
}

export const callTypes = {
  list: 'list',
  action: 'action',
}

export const testsSlice = createSlice({
  name: 'tests',
  initialState: initialTestsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    // getTestById
    testFetched: (state, action) => {
      state.actionsLoading = false
      state.testForEdit = action.payload.testForEdit
      state.error = null
    },
    // findTests
    testsFetched: (state, action) => {
      const { totalCount, entities } = action.payload
      state.listLoading = false
      state.error = null
      state.entities = entities
      state.totalCount = totalCount
    },
    // createTest
    testCreated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      state.entities.push(action.payload.test)
    },
    // updateTest
    testUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.test.id) {
          return action.payload.test
        }
        return entity
      })
    },
    // deleteTest
    testDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id,
      )
    },
    // deleteTests
    testsDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id),
      )
    },
    // testsUpdateState
    testsStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      const { ids, status } = action.payload
      state.entities = state.entities.map((entity) => {
        const ent = entity
        if (ids.findIndex((id) => id === entity.id) > -1) {
          ent.status = status
        }
        return ent
      })
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.tests,
    }),
  },
})
