// src/redux/otpSlice.js (UPDATED: Add modal state)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  submitData: null,
  verifySuccess: null,
  isModalOpen: false,  // NEW: Modal open state
  loading: false,
  error: null,
};

const BASE_URL = 'https://synergy-chemicals-server.onrender.com';

// Thunk to send the OTP (submit lead)
export const submitLead = createAsyncThunk(
  'otp/submitLead',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/lead/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to submit lead');
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to verify OTP
export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/lead/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to verify OTP');
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    clearOtpState(state) {
      state.submitData = null;
      state.verifySuccess = null;
      state.error = null;
      state.loading = false;
    },
    setModalOpen(state, action) {  // NEW: Toggle modal
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit lead
      .addCase(submitLead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitData = null;
        state.verifySuccess = null;
      })
      .addCase(submitLead.fulfilled, (state, action) => {
        state.loading = false;
        state.submitData = action.payload;
      })
      .addCase(submitLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verifySuccess = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verifySuccess = Boolean(action.payload);
        console.log('Verify OTP fulfilled - raw payload:', action.payload, '-> coerced to:', state.verifySuccess);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log('Verify OTP rejected - error:', action.payload);
      });
  },
});

export const { clearOtpState, setModalOpen } = otpSlice.actions;  // Export new action

export const selectOtpSubmitData = (state) => state.otp.submitData;
export const selectOtpVerifySuccess = (state) => state.otp.verifySuccess;
export const selectOtpLoading = (state) => state.otp.loading;
export const selectOtpError = (state) => state.otp.error;
export const selectIsModalOpen = (state) => state.otp.isModalOpen;  // NEW: Selector for modal

export default otpSlice.reducer;