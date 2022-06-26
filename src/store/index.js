import { configureStore } from '@reduxjs/toolkit';
import { displayApi } from '../services/api';
import displayTitle from '../features/DisplayTitle/displayTitleSlice';

export const store = configureStore({
  reducer: {
    [displayApi.reducerPath]: displayApi.reducer,
    displayTitle,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(displayApi.middleware),
});
