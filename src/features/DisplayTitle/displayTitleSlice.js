import { createSlice } from '@reduxjs/toolkit';
import { DISPLAY_DEFAULT_TITLE } from '../../shared/consts';

export const displayTitleSlice = createSlice({
  name: 'displayTitle',
  initialState: {
    title: DISPLAY_DEFAULT_TITLE
  },
  reducers: {
    setDisplayTitle(state, action) {
      state.title = action.payload;
    }
  },
});

export const { setDisplayTitle } = displayTitleSlice.actions;

export default displayTitleSlice.reducer;
