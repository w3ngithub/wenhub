import axios from 'axios'
import { API_URL } from 'constants/constants'

const axiosRequest = axios.create({
  baseURL: API_URL,
  timeout: 30000,
})

axios.interceptors.request.use(
  async (config) => {
    const { headers } = config
    const userDetail = localStorage.getItem('userDetail')
    const urls = config.url.split('/')
    const endpoint = urls[urls.length - 1]
    if (userDetail !== null && endpoint !== 'token') {
      headers.Authorization = `Bearer ${userDetail.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem('userDetail')
      window.location = 'wp-login'
    }
    return Promise.reject(err)
  },
)

export default axiosRequest
