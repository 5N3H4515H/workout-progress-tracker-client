import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import loadSlice from './slice/loadSlice'
import ormSlice from './slice/ormSlice'
import progressSlice from './slice/progressSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    load: loadSlice,
    orm: ormSlice,
    progress: progressSlice
  },
})