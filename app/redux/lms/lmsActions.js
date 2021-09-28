import axios from 'axios'
import * as requestFromServer from './lmsCrud'
import { lmsSlice } from './lmsSlice'

const {
  lmsLeaveLoading,
  lmsLeaveFetchSuccess,
  lmsLeaveAddSuccess,
  lmsFaqFetchSuccess,
  lmsArchiveTypesSuccess,
  lmsArchivesSuccess,
  lmsPendingFetchSuccess,
  lmsApprovedFetchSuccess,
  lmsCancelledFetchSuccess,
  lmsCancelSuccess,
  lmsApproveSuccess,
  lmsFailure,
  userLeaveDaysFetchSucess,
  allUsersLeavvesRemainingFetchSucess,
  allUsersFetchSucess,
  allLeavesCalendarFetchSucess,
  filteredLeaveFetchSucess,
  getlmsAdminForm,
  resetIsLeaveFilterCondition,
} = lmsSlice.actions

export const fetchLmsLeave = (page, perPage, id) => async (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .getLmsLeave(page, perPage, id)
    .then((res) => {
      dispatch(
        lmsLeaveFetchSuccess({
          data: res.data,
          totalLeaves: +res.headers['x-wp-total'],
        }),
      )
    })
    .catch((err) => {
      dispatch(lmsFailure({ error: 'Sending Error' }))
      console.log(err.response)
    })
}

export const fetchLmsPending = (page, perPage) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .getLmsAdminLeave(page, perPage, 150)
    .then((res) =>
      dispatch(
        lmsPendingFetchSuccess({
          data: res.data,
          totalPending: +res.headers['x-wp-total'],
        }),
      ),
    )
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const fetchLmsApproved = (page, perPage) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .getLmsAdminLeave(page, perPage, 151)
    .then((res) =>
      dispatch(
        lmsApprovedFetchSuccess({
          data: res.data,
          totalApproved: +res.headers['x-wp-total'],
        }),
      ),
    )
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const fetchLmsCancelled = (page, perPage) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .getLmsAdminLeave(page, perPage, 152)
    .then((res) =>
      dispatch(
        lmsCancelledFetchSuccess({
          data: res.data,
          totalCancelled: +res.headers['x-wp-total'],
        }),
      ),
    )
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const putLmsLeave = (value) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .postLmsLeave(value)
    .then((res) => {
      const {
        // eslint-disable-next-line camelcase
        data: { id, meta, title, content, leave_status, leave_type, _embedded },
      } = res
      dispatch(
        lmsLeaveAddSuccess({
          data: {
            id,
            meta,
            title,
            content,
            leave_status,
            leave_type,
            _embedded,
          },
        }),
      )
    })
    .catch((err) => {
      dispatch(lmsFailure({ error: 'Sending Error' }))
      console.log(err.response)
    })
}

export const fetchLmsFaq = () => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .getLmsFaq()
    .then((res) => dispatch(lmsFaqFetchSuccess({ data: res.data })))
    .catch((err) => {
      dispatch(lmsFailure({ error: 'Sending Error' }))
      console.log(err.response)
    })
}

export const fetchLmsArchiveTypes = () => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .getLmsArchiveTypes()
    .then((res) =>
      dispatch(
        lmsArchiveTypesSuccess({
          data: res.data,
        }),
      ),
    )
    .catch((err) => {
      dispatch(lmsFailure({ error: 'Sending Error' }))
      console.log(err.response)
    })
}

export const fetchLmsArchives =
  (userId, page, pageNo, archiveNo) => (dispatch) => {
    dispatch(lmsLeaveLoading())
    return requestFromServer
      .getLmsArchives(userId, page, pageNo, archiveNo)
      .then((res) =>
        dispatch(
          lmsArchivesSuccess({
            data: res.data,
            totalArchives: +res.headers['x-wp-total'],
          }),
        ),
      )
      .catch((err) => {
        dispatch(lmsFailure({ error: 'Sending Error' }))
        console.log(err.response)
      })
  }

export const cancelLmsLeave = (leaveId, da) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .cancelApproveLeave(leaveId, da)
    .then((res) => {
      // eslint-disable-next-line camelcase
      const { id, meta, title, content, leave_status, leave_type, _embedded } =
        res.data
      dispatch(
        lmsCancelSuccess({
          data: {
            id,
            meta,
            title,
            content,
            leave_status,
            leave_type,
            _embedded,
          },
        }),
      )
    })
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const approveLmsLeave = (leaveId, data) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .cancelApproveLeave(leaveId, data)
    .then((res) => {
      // eslint-disable-next-line camelcase
      const { id, meta, title, content, leave_status, leave_type, _embedded } =
        res.data
      dispatch(
        lmsApproveSuccess({
          data: {
            id,
            meta,
            title,
            content,
            leave_status,
            leave_type,
            _embedded,
          },
        }),
      )
    })
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const userLeaveDaysFetch = (userId) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .userLeaveDaysFetch(userId)
    .then(
      axios.spread((...response) => {
        dispatch(
          userLeaveDaysFetchSucess({
            userLeaveDaysApplied: response[0].data,
            userLeaveDaysRemaning: response[1].data,
          }),
        )
      }),
    )
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const allUsersLeavvesRemainingFetch = (perPage, page) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .allUsersLeavesRemaining(perPage, page)
    .then((response) => {
      dispatch(allUsersLeavvesRemainingFetchSucess(response.data))
    })
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const allUserFetch = (perPage, page) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .allUserFetch(perPage, page)
    .then((response) => {
      dispatch(
        allUsersFetchSucess({
          data: response.data,
          total: response.headers['x-wp-total'],
        }),
      )
    })
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const allLeavesCalendarFetch = () => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .allLeavesCalendarFetch()
    .then((response) => {
      dispatch(allLeavesCalendarFetchSucess(response.data))
    })
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const filteredLeaveFetch = (payload) => (dispatch) => {
  dispatch(lmsLeaveLoading())
  return requestFromServer
    .filteredLeaveFetch(payload)
    .then((response) => {
      dispatch(filteredLeaveFetchSucess(response.data))
    })
    .catch((err) => {
      console.log(err.response)
      dispatch(lmsFailure({ error: 'Sending Error' }))
    })
}

export const lmsAdminFormAction = (payload) => (dispatch) => {
  dispatch(getlmsAdminForm(payload))
}

export const resetIsLeaveFilter = () => (dispatch) => {
  dispatch(resetIsLeaveFilterCondition())
}
