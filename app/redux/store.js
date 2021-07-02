import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { reducer } from './rootReducer'

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  })

export const wrapper = createWrapper(makeStore)
