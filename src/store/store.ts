import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import postsReducer from './postsSlice'
import usersSlice from './usersSlice'
import postSlice from './postSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice,
    post: postSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()