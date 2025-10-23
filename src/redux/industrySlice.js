// src/store/industrySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base URL - Use Vite's import.meta.env
const BASE_URL = 'https://synergy-chemicals-server.onrender.com';

// Initial state
const initialState = {
  industries: [],           // All industries
  selectedIndustry: null,   // Single industry by ID
  searchResults: [],        // Search results
  loading: false,
  searchLoading: false,
  error: null,
  searchError: null,
};

// Thunk 1: Fetch all industries
export const fetchAllIndustries = createAsyncThunk(
  'industry/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/industry`);
      if (!response.ok) throw new Error('Failed to fetch industries');
      const data = await response.json();
      return data.data; // Assuming API returns { data: [...], success: true }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk 2: Search industries with query parameters
export const searchIndustries = createAsyncThunk(
  'industry/search',
  async (searchQuery, { rejectWithValue }) => {
    try {
      // Build query string
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append('q', searchQuery); // Adjust based on your API
      }
      
      const response = await fetch(`${BASE_URL}/industry/search?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to search industries');
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk 3: Fetch single industry by ID
export const fetchIndustryById = createAsyncThunk(
  'industry/fetchById',
  async (industryId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/industry/${industryId}`);
      if (!response.ok) throw new Error('Failed to fetch industry');
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Industry slice
const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {
    clearSelectedIndustry(state) {
      state.selectedIndustry = null;
    },
    clearSearchResults(state) {
      state.searchResults = [];
      state.searchError = null;
    },
    clearError(state) {
      state.error = null;
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all industries
      .addCase(fetchAllIndustries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllIndustries.fulfilled, (state, action) => {
        state.loading = false;
        state.industries = action.payload;
      })
      .addCase(fetchAllIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Search industries
      .addCase(searchIndustries.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchIndustries.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchIndustries.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      })
      
      // Fetch industry by ID
      .addCase(fetchIndustryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedIndustry = action.payload;
      })
      .addCase(fetchIndustryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearSelectedIndustry, clearSearchResults, clearError } = industrySlice.actions;

// Export selectors
export const selectAllIndustries = (state) => state.industry.industries;
export const selectSelectedIndustry = (state) => state.industry.selectedIndustry;
export const selectSearchResults = (state) => state.industry.searchResults;
export const selectIndustryLoading = (state) => state.industry.loading;
export const selectSearchLoading = (state) => state.industry.searchLoading;
export const selectIndustryError = (state) => state.industry.error;
export const selectSearchError = (state) => state.industry.searchError;

// Export reducer
export default industrySlice.reducer;
