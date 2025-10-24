import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get base URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create Contact Async Thunk
export const createContact = createAsyncThunk(
  'contact/createContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || 'Something went wrong',
      });
    }
  }
);

// Initial State
const initialState = {
  loading: false,
  success: false,
  error: null,
  contactData: null,
};

// Contact Slice
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.contactData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Contact Cases
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contactData = action.payload.data;
        state.error = null;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || 'Failed to submit contact form';
      });
  },
});

export const { clearError, clearSuccess } = contactSlice.actions;
export default contactSlice.reducer;
