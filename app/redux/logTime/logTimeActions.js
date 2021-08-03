import { logTimeSlice } from './logTime.Slice'
import * as requestFromServer from './logTimeCrud'
const { actions } = logTimeSlice

export const FetchLogTImeOfUser = () => (dispatch) => {
  dispatch(actions.startLogTimeCall())
  const userName = JSON.parse(localStorage.getItem('userDetail')).user_nicename
  requestFromServer
    .getLogTimeOfUser(userName)
    .then((res) => {
      dispatch(actions.logsOfUserFetched(res.data))
    })
    .catch((err) => {
      dispatch(actions.LogTimeFetchError(err.response.data.message))
    })
}
