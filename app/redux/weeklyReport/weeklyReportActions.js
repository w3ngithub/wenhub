import { openNotification } from 'utils/notification'
import * as requestServer from './weeklyReportCrud'
import { weeklyReportSlice } from './weeklyReportSlice'

const { weeklyReportFetch, reportLoading, errorReportFetching } =
  weeklyReportSlice.actions

export const fectchWeeklyReport = (payload) => (dispatch) => {
  dispatch(reportLoading())
  return requestServer
    .fectchWeeklyReport(payload)
    .then((res) => {
      dispatch(weeklyReportFetch(res.data))
    })
    .catch((err) => {
      dispatch(errorReportFetching())
      openNotification({
        type: 'error',
        message:
          err.response?.data?.message ||
          err.response?.message ||
          'could not fetch weekly reports',
      })
    })
}
