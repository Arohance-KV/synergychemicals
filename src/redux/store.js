// src/store/store.js or src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import otpReducer from './otpSlice';
import industryReducer from './industrySlice';
import testimonialReducer from './testimonialSlice'; // Add this

export const store = configureStore({
  reducer: {
    product: productReducer,
    otp: otpReducer,
    industry: industryReducer,
    testimonial: testimonialReducer, // Add this
  },
});