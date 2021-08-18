import { API_URL } from 'constants/constants'
import restClient from 'api/restClient'

export const getLogTimeOfUser = (userId) =>
  restClient.get(
    `${API_URL}/timelogs?author=${userId}&per_page=100&_fields=id,title,link,content,log_type,author,meta,_links&_embed`,
  )

export const getUserTimeSpentThisWeek = (userId) =>
  restClient.get(`${API_URL}/user/weekly_time_spent/${userId}`)

export const getUserTimeSpentToday = (userId) =>
  restClient.get(`${API_URL}/user/time_spent/${userId}`)
