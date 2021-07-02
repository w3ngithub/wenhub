import * as requestFromServer from './projectCrud'
import { projectSlice } from './projectSlice'

const { projectFetching, projectFetchSuccess, projectFetchError } =
  projectSlice.actions

export const fetchProjects = () => (dispatch) => {
  dispatch(projectFetching())
  return requestFromServer
    .getProjects()
    .then((res) => {
      console.log(res)
      dispatch(projectFetchSuccess({ data: res.data }))
    })
    .catch((err) => {
      dispatch(projectFetchError({ error: 'Sending Error' }))
      console.log(err)
    })
}
