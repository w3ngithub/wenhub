import axios from 'axios'
import parser from 'html-react-parser'
import { openNotification } from 'utils/notification'
import * as requestServer from './userCrud'
import { userSlice } from './userSlice'

const {
  setUserLoading,
  loginSuccess,
  loginFailure,
  setUserDetail,
  tokenCheckStart,
  tokenCheckFinish,
  fetchUsersSuccess,
} = userSlice.actions

export const loginUser = (data) => (dispatch) => {
  dispatch(setUserLoading())
  return new Promise((resolve) => {
    requestServer
      .getUserToken(data)
      .then((res) => {
        localStorage.setItem('userDetail', JSON.stringify(res.data))
        dispatch(loginSuccess({ data: res.data }))
        resolve(res.data)
      })
      .catch((err) => {
        dispatch(loginFailure({ data: err.response.data.message }))
        console.log(err.response.data.message)
        openNotification({
          type: 'error',
          message: parser(err.response?.data?.message),
        })
      })
  })
}

export const setDetailUser = (data) => (dispatch) =>
  dispatch(setUserDetail({ data }))

export const checkToken = (token) => (dispatch) => {
  dispatch(tokenCheckStart())
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://wendevs.com/wenhub-rt/wp-json/jwt-auth/v1/token/validate',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        dispatch(tokenCheckFinish())
        resolve(res)
      })
      .catch((err) => {
        if (err.response?.data?.data?.status === 403) {
          dispatch(tokenCheckFinish())
          reject(err)
        }
      })
  })
}

export const fetchUsers = (token) => (dispatch) => {
  dispatch(setUserLoading())
  axios
    .get('https://wendevs.com/wenhub-rt/wp-json/wp/v2/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log(res.data)
      dispatch(fetchUsersSuccess({ data: res.data }))
    })
    .catch((err) => console.log(err.response))
}
