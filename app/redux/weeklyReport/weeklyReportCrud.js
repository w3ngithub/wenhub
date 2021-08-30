import api from 'api/restClient'
import { API_URL } from 'constants/constants'

export const fectchWeeklyReport = (payload) =>
  api.post(`${API_URL}/projects/weekly_report`, payload, true)
