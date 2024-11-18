import { configureStore } from '@reduxjs/toolkit';
import marvelReducer from './marvelSlice';

export const store = configureStore({
  reducer: {
    marvel: marvelReducer,
  },
});
