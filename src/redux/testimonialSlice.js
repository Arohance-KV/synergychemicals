// src/store/testimonialSlice.js or src/redux/testimonialSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base URL - Use Vite's import.meta.env
const BASE_URL = import.meta.env.VITE_API_URL;

// Initial state
const initialState = {
  testimonials: [],           // All testimonials
  selectedTestimonial: null,  // Single testimonial by ID
  loading: false,
  error: null,
};

// Thunk 1: Fetch all testimonials
export const fetchAllTestimonials = createAsyncThunk(
  'testimonial/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/testimonial`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      return data.data; // Assuming API returns { data: [...], success: true }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk 2: Fetch single testimonial by ID
export const fetchTestimonialById = createAsyncThunk(
  'testimonial/fetchById',
  async (testimonialId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/testimonial/${testimonialId}`);
      if (!response.ok) throw new Error('Failed to fetch testimonial');
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Testimonial slice
const testimonialSlice = createSlice({
  name: 'testimonial',
  initialState,
  reducers: {
    clearSelectedTestimonial(state) {
      state.selectedTestimonial = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all testimonials
      .addCase(fetchAllTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchAllTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch testimonial by ID
      .addCase(fetchTestimonialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonialById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTestimonial = action.payload;
      })
      .addCase(fetchTestimonialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearSelectedTestimonial, clearError } = testimonialSlice.actions;

// Export selectors
export const selectAllTestimonials = (state) => state.testimonial.testimonials;
export const selectSelectedTestimonial = (state) => state.testimonial.selectedTestimonial;
export const selectTestimonialLoading = (state) => state.testimonial.loading;
export const selectTestimonialError = (state) => state.testimonial.error;

// Export reducer
export default testimonialSlice.reducer;
