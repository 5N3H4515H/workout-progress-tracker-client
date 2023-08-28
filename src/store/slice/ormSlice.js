import { createSlice } from '@reduxjs/toolkit'

const initialState =  { orm: null };

export const ormSlice = createSlice({
  name: 'orm',
  initialState,
  reducers: {
    setORMData: (state, action) => {
      state.orm = action.payload;
    },
  },
})


export const {setORMData} = ormSlice.actions

export default ormSlice.reducer