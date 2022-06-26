import { createSlice } from '@reduxjs/toolkit';

export const displayTitleSlice = createSlice({
  name: 'displayTitle',
  initialState: {
    title: ''
  },
  reducers: {
    setDisplayTitle(state, action) {
      state.title = action.payload;
    }
  },
});

export const { setDisplayTitle } = displayTitleSlice.actions;

export default displayTitleSlice.reducer;
