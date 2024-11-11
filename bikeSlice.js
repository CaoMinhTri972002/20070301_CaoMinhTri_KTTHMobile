import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk action để lấy dữ liệu từ API
export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const response = await fetch('https://65042ff8c8869921ae24a8f8.mockapi.io/demo1/api/v1/XeDap');
  const data = await response.json();
  return data;
});

const bikeSlice = createSlice({
  name: 'bikes',
  initialState: {
    list: [],
    status: 'idle', // trạng thái tải dữ liệu ('idle', 'loading', 'succeeded', 'failed')
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bikeSlice.reducer;
