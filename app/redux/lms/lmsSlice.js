import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  lmsLoading: false,
  lmsLeaves: [],
  lmsPending: [],
  lmsCancelled: [],
  lmsApproved: [],
  totalLeaves: 0,
  totalPending: 0,
  totalApproved: 0,
  totalCancelled: 0,
  totalAllUSerLeavesRemaining: 0,
  faq: '',
  archiveTypes: [],
  archives: [],
  totalArchives: 0,
  userLeaveDaysRemaning: null,
  userLeaveDaysApplied: null,
  allUsersLeavesRemaining: [],
  error: '',
  allUsers: [],
  allUserTotal: 0,
  allLeavesCalendar: [],
  isLeaveFiltered: false,
  filteredLeaves: [],
  lmsAdminForm: {},
}

export const lmsSlice = createSlice({
  name: 'lmsData',
  initialState,
  reducers: {
    lmsLeaveLoading: (state) => {
      state.lmsLoading = true
    },
    lmsLeaveFetchSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.lmsLeaves = payload.data
      state.totalLeaves = payload.totalLeaves
    },
    lmsPendingFetchSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.lmsPending = payload.data
      state.totalPending = payload.totalPending
    },
    lmsApprovedFetchSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.lmsApproved = payload.data
      state.totalApproved = payload.totalApproved
    },
    lmsCancelledFetchSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.lmsCancelled = payload.data
      state.totalCancelled = payload.totalCancelled
    },

    lmsLeaveAddSuccess: (state, { payload: { data } }) => {
      state.lmsLoading = false
      state.lmsLeaves = [data, ...state.lmsLeaves]
      state.lmsPending = [data, ...state.lmsPending]
    },

    lmsFaqFetchSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.faq = payload.data
    },

    lmsArchiveTypesSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.archiveTypes = payload.data
    },

    lmsArchivesSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.archives = payload.data
      state.totalArchives = payload.totalArchives
    },

    lmsCancelSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.lmsLeaves = state.lmsLeaves.filter((x) => x.id !== payload.data.id)
      state.totalLeaves = +state.totalLeaves - 1
      state.lmsPending = state.lmsPending.filter(
        (x) => x.id !== payload.data.id,
      )
      state.totalPending = +state.totalPending - 1
      state.lmsApproved = state.lmsApproved.filter(
        (x) => x.id !== payload.data.id,
      )
      state.totalApproved = +state.totalApproved - 1
      state.lmsCancelled = [payload.data, ...state.lmsCancelled]
      state.totalCancelled = +state.totalCancelled + 1
    },
    lmsApproveSuccess: (state, { payload }) => {
      state.lmsLoading = false
      state.lmsPending = state.lmsPending.filter(
        (x) => x.id !== payload.data.id,
      )
      state.totalPending = +state.totalPending - 1
      state.lmsApproved = [payload.data, ...state.lmsApproved]
      state.totalApproved = +state.totalApproved + 1
    },

    lmsFailure: (state, { payload }) => {
      state.lmsLoading = false
      state.error = payload.error
    },
    userLeaveDaysFetchSucess: (state, { payload }) => {
      state.lmsLoading = false
      state.userLeaveDaysApplied = payload.userLeaveDaysApplied
      state.userLeaveDaysRemaning = payload.userLeaveDaysRemaning
    },
    allUsersLeavvesRemainingFetchSucess: (state, { payload }) => {
      state.lmsLoading = false
      state.allUsersLeavesRemaining = payload
    },
    allUsersFetchSucess: (state, { payload }) => {
      state.lmsLoading = false
      state.allUsers = payload.data
      state.allUsersTotal = payload.total
    },
    allLeavesCalendarFetchSucess: (state, { payload }) => {
      state.lmsLoading = false
      state.allLeavesCalendar = payload
    },
    filteredLeaveFetchSucess: (state, { payload }) => {
      state.lmsLoading = false
      state.isLeaveFiltered = true
      state.filteredLeaves = payload
    },
    getlmsAdminForm: (state, { payload }) => {
      state.lmsAdminForm = payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.lmsData,
    }),
  },
})
