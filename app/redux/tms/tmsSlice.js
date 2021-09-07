import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  firstPunchIn: false,
  firstPunchOut: false,
  punchIn: false,
  punchOut: false,
}

export const tmsSlice = createSlice({
  name: 'tms',
  initialState,
  reducers: {
    getFirstPunchIn: (state) => {
      state.firstPunchIn = true
      state.punchIn = true
    },
    getFirstPunchOut: (state) => {
      state.firstPunchOut = true
      state.punchOut = true
      state.punchIn = false
    },
    getPunchIn: (state) => {
      state.punchIn = true
      state.punchOut = false
    },
    getPunchOut: (state) => {
      state.punchIn = false
      state.punchOut = true
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => ({
      ...state,
    }),
  },
})
