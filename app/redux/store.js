import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  wrapMakeStore,
  nextReduxCookieMiddleware,
} from 'next-redux-cookie-wrapper'
import { createWrapper } from 'next-redux-wrapper'
import { reducer } from './rootReducer'
import { userSlice } from './user/userSlice'
const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer,
    devTools: true,
    middleware: getDefaultMiddleware().prepend(
      nextReduxCookieMiddleware({
        secure: true,
        subtrees: [userSlice.name],
      }),
    ),
  }),
)
export const wrapper = createWrapper(makeStore)
