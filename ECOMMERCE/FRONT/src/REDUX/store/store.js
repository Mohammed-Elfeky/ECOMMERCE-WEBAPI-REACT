import { configureStore } from '@reduxjs/toolkit';
import  catReducer  from '../CAT/slice';

export const store = configureStore({
  reducer: {
    catState: catReducer,
  },
});
