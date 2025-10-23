import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import otpReducer from './otpSlice';
import industryReducer from './industrySlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    otp: otpReducer,
    industry: industryReducer,
  },
});