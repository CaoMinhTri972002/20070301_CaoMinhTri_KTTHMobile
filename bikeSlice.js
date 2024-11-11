import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk action để lấy dữ liệu từ API
export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const response = await fetch('https://65042ff8c8869921ae24a8f8.mockapi.io/demo1/api/v1/XeDap');
  const data = await response.json();
  return data;
});

// Thunk action để thêm xe đạp mới vào MockAPI
export const addBike = createAsyncThunk('bikes/addBike', async (newBike) => {
  const response = await fetch('https://65042ff8c8869921ae24a8f8.mockapi.io/demo1/api/v1/XeDap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBike),
  });
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
      // Thêm xe đạp thành công
      .addCase(addBike.fulfilled, (state, action) => {
        state.list.push(action.payload);  // Thêm xe đạp vào danh sách
      })
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
