import { logTimeSlice } from './logTime.Slice'
import * as requestFromServer from './logTimeCrud'
const { actions } = logTimeSlice

export const FetchLogTImeOfUser = (userId) => (dispatch) => {
  dispatch(actions.startLogTimeCall())
  requestFromServer
    .getLogTimeOfUser(userId)
    .then((res) => {
      dispatch(actions.logsOfUserFetched(res.data))
    })
    .catch((error) => {
      dispatch(
        actions.LogTimeFetchError(
          error.response?.data?.message || 'unable to fetch logs',
        ),
      )
    })
}

export const fetchWeeklyTimeSpentOfUser = (userId) => async (dispatch) => {
  dispatch(actions.startLogTimeCall())
  try {
    const response = await requestFromServer.getUserTimeSpentThisWeek(userId)
    dispatch(actions.fetchWeeklyTimeSpentOfUser(response.data))
  } catch (error) {
    dispatch(
      actions.LogTimeFetchError(
        error.response?.data?.message ||
          'unable to fetch weekly time spent of user',
      ),
    )
  }
}

export const fetchUserTimeSpentToday = (userId) => async (dispatch) => {
  dispatch(actions.startLogTimeCall())
  try {
    const response = await requestFromServer.getUserTimeSpentToday(userId)
    dispatch(actions.fetchUserTimeSpentToday(response.data))
  } catch (error) {
    dispatch(
      actions.LogTimeFetchError(
        error.response?.data?.message ||
          'unable to fetch user time spent today',
      ),
    )
  }
}
