import axios from 'axios'
import { projectLogSlice } from './projectLogSlice'
import * as requestFromServer from './projectLogCrud'
const { actions } = projectLogSlice

export const fetchProjectLogs = (projectId) => (dispatch) => {
  dispatch(actions.startProjectLogCall())
  return requestFromServer
    .fetchProjectLogs(projectId)
    .then(
      axios.spread((...response) => {
        dispatch(
          actions.projectLogFetched({ data: response.map((x) => x.data) }),
        )
      }),
    )
    .catch(() => {
      dispatch(
        actions.projectLogFetchError({
          error: 'Could not fetch project log data',
        }),
      )
    })
}
