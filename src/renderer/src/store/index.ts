import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './navigationSlice'
import nodeReducer from './nodeSlice'

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    node: nodeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
