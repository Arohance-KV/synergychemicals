import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import otpReducer from './otpSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    otp: otpReducer,
  },
});