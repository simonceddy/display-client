import { configureStore } from '@reduxjs/toolkit';
import { displayApi } from '../services/api';
import displayTitle from '../features/DisplayTitle/displayTitleSlice';
import app from './appSlice';

export const store = configureStore({
  reducer: {
    [displayApi.reducerPath]: displayApi.reducer,
    displayTitle,
    app,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(displayApi.middleware),
});
