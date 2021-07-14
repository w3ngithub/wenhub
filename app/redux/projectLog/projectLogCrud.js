import api from 'api/restClient'
import { API_URL } from 'constants/constants'

export const fetchProjectLogs = (projectId) =>
  api.all([
    api.get(
      `${API_URL}/timelogs?filter[meta_key]=project_id&filter[meta_value]=${projectId}&per_page=100&_fields=id,title,link,content,log_type,meta`,
    ),
    api.get(
      `${API_URL}/log_type?per_page=100&_fields=id,count,name,chart_color,link`,
    ),
  ])
