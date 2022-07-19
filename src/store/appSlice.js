import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    volume: 0.75
  },
  reducers: {
    setGlobalVolume: (state, action) => {
      state.volume = action.payload;
    }
  },
});

export const { setGlobalVolume } = appSlice.actions;

export default appSlice.reducer;
