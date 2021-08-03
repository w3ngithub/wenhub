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
          actions.projectLogFetched({
            data: response.map((x) => x.data),
            total: response[0].headers['x-wp-total'],
          }),
        )
      }),
    )
    .catch(() => {
      dispatch(actions.projectLogFetchError('Could not fetch project log data'))
    })
}

export const fetchLogTypes = () => (dispatch) => {
  dispatch(actions.startProjectLogCall())
  requestFromServer
    .fetchLogTypes()
    .then((res) => {
      dispatch(actions.logTypesFetched(res.data))
    })
    .catch((err) => {
      dispatch(actions.projectLogFetchError(err.response.data.message))
    })
}

export const fetchProjectsOfUser = () => async (dispatch) => {
  const userId = JSON.parse(localStorage.getItem('userDetail'))?.user_id
  // const userId = 21
  dispatch(actions.startProjectLogCall())
  try {
    const developerProject =
      await requestFromServer.fetchProjectsODeveloperUser(userId)
    if (developerProject?.data?.length > 0) {
      dispatch(actions.projectsOfUserFetched(developerProject.data))
    } else {
      const designerProject =
        await requestFromServer.fetchProjectsOfDesignerUser(userId)
      dispatch(actions.projectsOfUserFetched(designerProject.data))
    }
  } catch (error) {
    dispatch(actions.projectLogFetchError(error.response.data.message))
  }
}

export const fetchProjectDetailForTimeLog = (projectId) => async (dispatch) => {
  dispatch(actions.startProjectLogCall())
  try {
    const response = await requestFromServer.fetchProjectDetailForTimeLog(
      projectId,
    )
    dispatch(actions.projectDetailForTimeLogFetched(response.data))
  } catch (error) {
    dispatch(actions.projectLogFetchError(error.response.data.message))
  }
}

export const fetchFilteredProjectLogs =
  (projectId, page = 1, perPage = 10) =>
  async (dispatch) => {
    dispatch(actions.startProjectLogCall())
    try {
      const response = await requestFromServer.fetchFilteredProjectLogs(
        projectId,
        page,
        perPage,
      )
      dispatch(
        actions.filteredProjectLogFetched({
          data: response.data,
          total: response.headers['x-wp-total'],
        }),
      )
    } catch (error) {
      dispatch(actions.projectLogFetchError(error.response.data.message))
    }
  }
