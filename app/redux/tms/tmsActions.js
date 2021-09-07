import { tmsSlice } from './tmsSlice'

const { getFirstPunchIn, getFirstPunchOut, getPunchIn, getPunchOut } =
  tmsSlice.actions

export const setfirstPunchIn = () => (dispatch) => {
  dispatch(getFirstPunchIn())
}

export const setfirstPunchOut = () => (dispatch) => {
  dispatch(getFirstPunchOut())
}

export const setPunchIn = () => (dispatch) => {
  dispatch(getPunchIn())
}

export const setPunchOut = () => (dispatch) => {
  dispatch(getPunchOut())
}
