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
    .catch((err) => {
      dispatch(actions.LogTimeFetchError(err.response.data.message))
    })
}

export const fetchWeeklyTimeSpentOfUser = (userId) => async (dispatch) => {
  dispatch(actions.startLogTimeCall())
  try {
    const response = await requestFromServer.getUserTimeSpentThisWeek(userId)
    dispatch(actions.fetchWeeklyTimeSpentOfUser(response.data))
  } catch (error) {
    dispatch(actions.LogTimeFetchError(error.response.data.message))
  }
}

export const fetchUserTimeSpentToday = (userId) => async (dispatch) => {
  dispatch(actions.startLogTimeCall())
  try {
    const response = await requestFromServer.getUserTimeSpentToday(userId)
    dispatch(actions.fetchUserTimeSpentToday(response.data))
  } catch (error) {
    dispatch(actions.LogTimeFetchError(error.response.data.message))
  }
}
