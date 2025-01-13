import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userStore';
import productReducer from './productStore';

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;