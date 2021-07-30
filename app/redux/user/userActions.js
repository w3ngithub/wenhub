import axios from 'axios'
import * as requestServer from './userCrud'
import { userSlice } from './userSlice'

const {
  loginStart,
  loginSuccess,
  loginFailure,
  setUserDetail,
  tokenCheckStart,
  tokenCheckFinish,
} = userSlice.actions

export const loginUser = (data) => (dispatch) => {
  dispatch(loginStart())
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
        if (err.response.data.data.status === 403) {
          dispatch(tokenCheckFinish())
          reject(err)
        }
      })
  })
}
