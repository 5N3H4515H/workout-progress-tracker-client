import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import ormSlice from './slice/ormSlice'
import progressSlice from './slice/progressSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    orm: ormSlice,
    progress: progressSlice
  },
})