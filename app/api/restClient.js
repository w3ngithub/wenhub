import axios from 'axios'

axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.timeout = 120000

export const getHttpHeaders = (isAuthenticated = false) => {
  // Add your custom logic here, for example add a Token to the Headers
  if (isAuthenticated) {
    return {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('userDetail'))?.token
        }`,
      },
    }
  }

  return {
    auth: {
      username: 'wen',
      password: '20W3n@pal20#',
    },
  }
}

const get = (path, isAuthenticated) =>
  axios.get(path, getHttpHeaders(isAuthenticated))

const del = (path) => axios.delete(path, getHttpHeaders())

const post = (path, data, isAuthenticated) =>
  axios.post(path, data, getHttpHeaders(isAuthenticated))

const put = (path, data, isAuthenticated) =>
  axios.put(path, data, getHttpHeaders(isAuthenticated))

const patch = (path, data, isAuthenticated) =>
  axios.patch(path, data, getHttpHeaders(isAuthenticated))

const all = (path) => axios.all(path, getHttpHeaders())

export default {
  get,
  del,
  post,
  put,
  patch,
  all,
}
