import api from 'api/restClient'
import { API_URL } from 'constants/constants'

export const fetchMediaFiles = () => api.get(`${API_URL}/media?per_page=100`)
