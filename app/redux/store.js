import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { reducer } from './rootReducer'

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
    middleware: getDefaultMiddleware({ serializableCheck: false }),
  })

export const wrapper = createWrapper(makeStore)
