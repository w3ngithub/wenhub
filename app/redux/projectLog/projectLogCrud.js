import api from 'api/restClient'
import { API_URL } from 'constants/constants'

export const fetchProjectLogs = (projectId) =>
  api.all([
    api.get(
      `${API_URL}/timelogs?filter[meta_key]=project_id&filter[meta_value]=${projectId}&page=1&per_page=10&_fields=id,title,link,content,log_type,meta`,
    ),
    api.get(
      `${API_URL}/log_type?per_page=100&_fields=id,count,name,chart_color,link`,
    ),
  ])

export const fetchAllProjectLogsFiltered = (projectId, logType) =>
  api.get(
    `${API_URL}/timelogs?filter[meta_key]=project_id&filter[meta_value]=${projectId}&per_page=100${
      logType !== '' ? `&log_type=${logType}` : ''
    }&_fields=id,title,link,content,log_type,meta`,
  )

export const fetchFilteredProjectLogs = (projectId, page, perPage) =>
  api.get(
    `${API_URL}/timelogs?filter[meta_key]=project_id&filter[meta_value]=${projectId}&page=${page}&per_page=${perPage}&_fields=id,title,link,content,log_type,meta`,
  )

export const fetchProjectsOfDesignerUser = (userId) =>
  api.get(
    `${API_URL}/projects?designer=${userId}&per_page=100&_fields=id,title`,
  )

export const fetchProjectsODeveloperUser = (userId) =>
  api.get(
    `${API_URL}/projects?developer=${userId}&per_page=100&_fields=id,title`,
  )

export const fetchLogTypes = () =>
  api.get(`${API_URL}/log_type?per_page=100&_fields=id,name`)

export const fetchProjectDetailForTimeLog = (projectId) =>
  api.get(`${API_URL}/projects/${projectId}`)

export const fetchWeeklyTimeSpent = (projectId) =>
  api.get(`${API_URL}/project/weekly_time_spent/${projectId}`)

export const fecthTotalTimeSpent = (projectId) =>
  api.get(`${API_URL}/project/time_spent/${projectId}`)
