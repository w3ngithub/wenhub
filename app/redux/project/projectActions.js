import axios from 'axios'
import * as requestFromServer from './projectCrud'
import { projectSlice } from './projectSlice'

const { projectFetching, projectFetchSuccess, projectFetchError } =
  projectSlice.actions

export const fetchProjects = (userType, userId) => (dispatch) => {
  dispatch(projectFetching())
  return new Promise((resolve) => {
    requestFromServer
      .getProjects(userType, userId)
      .then((res) => {
        dispatch(
          projectFetchSuccess({
            data: res.data,
            totalData: res.headers['x-wp-total'],
          }),
        )
        resolve(res.data)
      })
      .catch((err) => {
        dispatch(projectFetchError({ error: 'Sending Error' }))
        console.log(err)
      })
  })
}

export const fetchFilteredProject =
  (
    searchProject,
    projectType,
    projectStatus,
    client,
    developer,
    designer,
    page,
    perPage,
    userType,
    userId,
  ) =>
  async (dispatch) => {
    dispatch(projectFetching())
    const params = new URLSearchParams()
    if (searchProject?.length > 0)
      params.append('search_project', searchProject)
    if (projectType) params.append('project_type', projectType)
    if (projectStatus) params.append('project_status', projectStatus)
    if (client) params.append('client', client)
    if (developer) params.append('developer', developer)
    if (designer) params.append('designer', designer)
    params.append('page', page)
    params.append('perPage', perPage)
    if (userType) params.append('userType', userType)
    if (userId) params.append('userId', userId)
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
