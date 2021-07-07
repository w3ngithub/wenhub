import axios from 'axios'
import * as requestFromServer from './projectCrud'
import { projectSlice } from './projectSlice'

const { projectFetching, projectFetchSuccess, projectFetchError } =
  projectSlice.actions

export const fetchProjects = (pgNo, pgSize) => (dispatch) => {
  dispatch(projectFetching())
  return requestFromServer
    .getProjects(pgNo, pgSize)
    .then((res) => {
      dispatch(
        projectFetchSuccess({
          data: res.data,
          totalData: res.headers['x-wp-total'],
        }),
      )
    })
    .catch((err) => {
      dispatch(projectFetchError({ error: 'Sending Error' }))
      console.log(err)
    })
}

export const fetchFilteredProject =
  (
    search_project,
    project_type,
    project_status,
    client,
    developer,
    designer,
    page,
    perPage,
  ) =>
  async (dispatch) => {
    dispatch(projectFetching())
    var params = new URLSearchParams()
    search_project?.length > 0 &&
      params.append('search_project', search_project)
    project_type && params.append('project_type', project_type)
    project_status && params.append('project_status', project_status)
    client && params.append('client', client)
    developer && params.append('developer', developer)
    designer && params.append('designer', designer)
    params.append('page', page)
    params.append('perPage', perPage)
    const request = { params }

    try {
      const res = await axios.get('/api/project', request)
      dispatch(
        projectFetchSuccess({
          data: res.data.data,
          totalData: res.data.totalData,
        }),
      )
    } catch (err) {
      dispatch(projectFetchError({ error: 'Sending Error' }))
      console.log(err)
    }
  }
