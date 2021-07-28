import * as requestFromServer from './projectCrud'
import { projectSlice } from './projectSlice'

const {
  projectFetching,
  projectFetchSuccess,
  projectFetchError,
  projectInitial,
} = projectSlice.actions

export const resetProject = () => (dispatch) =>
  dispatch(projectInitial({ data: [] }))

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
    try {
      const res = await requestFromServer.filterProjects(
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
      )
      dispatch(
        projectFetchSuccess({
          data: res.data,
          totalData: res.headers['x-wp-total'],
        }),
      )
    } catch (err) {
      dispatch(projectFetchError({ error: 'Sending Error' }))
      console.log(err)
    }
  }
