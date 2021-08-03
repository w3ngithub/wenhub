import { API_URL } from 'constants/constants'
import restClient from 'api/restClient'

export const getLogTimeOfUser = (userName) =>
  restClient.get(
    `${API_URL}/timelogs?search=${userName}&per_page=100&_fields=id,title,link,content,log_type,meta`,
  )
